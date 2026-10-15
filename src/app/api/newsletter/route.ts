import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { db } from "@/lib/db";
import { getResendFrom, isResendSandboxSender } from "@/lib/email";

export const runtime = "nodejs";

const schema = z.object({
  email: z.string().email("Email inválido"),
});

/**
 * Suscribe un email al newsletter.
 *
 * La dirección se guarda siempre, y el email de confirmación es
 * best-effort: si Resend falla la suscripción no se pierde.
 */
export async function POST(request: Request) {
  let email: string;

  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Datos inválidos" },
        { status: 400 }
      );
    }

    email = parsed.data.email.toLowerCase().trim();
  } catch {
    return NextResponse.json({ error: "Cuerpo inválido" }, { status: 400 });
  }

  // 1. Guardar (o reactivar) al suscriptor.
  try {
    await db.newsletterSubscriber.upsert({
      where: { email },
      create: { email, status: "ACTIVE" },
      update: {
        status: "ACTIVE",
        unsubscribedAt: null,
      },
    });
  } catch (error) {
    console.error("[newsletter] No se pudo guardar el suscriptor:", error);
    return NextResponse.json(
      { error: "No pudimos registrar tu suscripción. Intenta de nuevo." },
      { status: 500 }
    );
  }

  // 2. Email de bienvenida (best-effort).
  try {
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      console.warn(
        "[newsletter] RESEND_API_KEY no configurada: el suscriptor se guardó pero no se envió el email."
      );
    } else {
      const resend = new Resend(resendApiKey);

      if (isResendSandboxSender()) {
        console.warn(
          "[newsletter] RESEND_FROM_EMAIL no configurado. Se usa el sandbox de Resend, " +
            "que solo entrega al email de la cuenta."
        );
      }

      await resend.emails.send({
        from: getResendFrom(),
        to: [email],
        subject: "¡Bienvenido al Newsletter de Growth BDM!",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #004b8d;">¡Bienvenido a Growth BDM!</h2>
            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px;">
              <p>Gracias por suscribirte a nuestro newsletter. A partir de ahora recibirás:</p>
              <ul style="list-style-type: none; padding: 0;">
                <li style="margin: 10px 0;">✓ Actualizaciones sobre crecimiento empresarial</li>
                <li style="margin: 10px 0;">✓ Invitaciones a eventos exclusivos</li>
                <li style="margin: 10px 0;">✓ Tips y estrategias de expansión</li>
                <li style="margin: 10px 0;">✓ Noticias sobre el mercado mexicano</li>
              </ul>
              <p style="margin-top: 20px;">
                Si tienes alguna pregunta, no dudes en contactarnos en
                <a href="mailto:contacto@growthbdm.com" style="color: #004b8d;">contacto@growthbdm.com</a>
              </p>
            </div>
          </div>
        `,
      });
    }
  } catch (error) {
    console.error("[newsletter] Suscriptor guardado, falló el email:", error);
  }

  return NextResponse.json({ success: true });
}
