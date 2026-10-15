import { NextResponse } from "next/server";
import Stripe from "stripe";
import { z } from "zod";
import { db } from "@/lib/db";
import { validateInviteCode } from "@/lib/invite-codes";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const schema = z.object({
  name: z.string().min(2, "El nombre es requerido").max(120),
  email: z.string().email("Email inválido"),
  phone: z.string().min(10, "Teléfono inválido").max(20),
  company: z.string().max(120).optional(),
  inviteCode: z.string().max(64).optional(),
  eventName: z.string().max(120).optional(),
  eventDate: z.string().datetime().optional(),
});

function baseUrlFrom(request: Request): string {
  const configured = process.env.NEXT_PUBLIC_BASE_URL;
  if (configured) return configured.replace(/\/$/, "");

  const referer = request.headers.get("referer");
  if (referer) {
    try {
      return new URL(referer).origin;
    } catch {
      /* referencia malformada: caemos al default */
    }
  }
  return "http://localhost:3022";
}

/**
 * Crea una reserva de evento.
 *
 * El código de invitación se revalida acá aunque el cliente ya haya dicho que
 * es válido: `hasValidCode` viene del navegador y cualquiera puede llamar a
 * esta API a mano para obtener una reserva gratis saltándose el pago.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Datos inválidos" },
        { status: 400 }
      );
    }

    const { name, email, phone, company, inviteCode, eventName, eventDate } = parsed.data;

    const inviteResult = await validateInviteCode(inviteCode);
    const hasValidCode = inviteResult.valid;

    // 1. Guardamos la reserva primero, para tener un id aunque Stripe falle.
    const reservation = await db.reservation.create({
      data: {
        name,
        email,
        phone,
        company: company ?? null,
        inviteCode: hasValidCode ? inviteResult.code : null,
        hasValidCode,
        status: hasValidCode ? "FREE" : "PENDING",
        eventName: eventName ?? null,
        eventDate: eventDate ? new Date(eventDate) : null,
      },
    });

    // 2. Con código válido no hay pago: la reserva ya está confirmada.
    if (hasValidCode) {
      await db.inviteCode.update({
        where: { code: inviteResult.code },
        data: { usedCount: { increment: 1 } },
      });

      return NextResponse.json({
        sessionId: reservation.id,
        status: reservation.status,
      });
    }

    // 3. Sin código, va por Stripe.
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    const priceId = process.env.STRIPE_EVENT_PRICE_ID;

    if (!stripeSecretKey || !priceId) {
      // Revertimos a un estado que no parezca una reserva válida.
      await db.reservation.update({
        where: { id: reservation.id },
        data: { status: "CANCELLED" },
      });

      console.error(
        "[reservations] Faltan STRIPE_SECRET_KEY o STRIPE_EVENT_PRICE_ID; " +
          "la reserva " + reservation.id + " quedó cancelada."
      );

      return NextResponse.json(
        { error: "El sistema de pagos no está configurado" },
        { status: 503 }
      );
    }

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2025-02-24.acacia",
    });
    const baseUrl = baseUrlFrom(request);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: email,
      client_reference_id: reservation.id,
      metadata: { reservationId: reservation.id, email, name },
      success_url: `${baseUrl}/reservations/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/reservations/cancel`,
    });

    await db.reservation.update({
      where: { id: reservation.id },
      data: { stripeSessionId: session.id },
    });

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error("Error creando la reservación:", error);
    return NextResponse.json(
      { error: "Error al procesar la reservación" },
      { status: 500 }
    );
  }
}
