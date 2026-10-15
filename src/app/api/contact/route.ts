import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { db } from "@/lib/db";
import { escapeHtml, getResendFrom, isResendSandboxSender } from "@/lib/email";

export const runtime = "nodejs";

const schema = z.object({
  name: z.string().min(2, "El nombre es requerido").max(120),
  email: z.string().email("Email inválido"),
  message: z.string().min(10, "El mensaje es muy corto").max(5000),
  company: z.string().max(120).optional(),
});

/**
 * Recibe un mensaje del formulario de contacto.
 *
 * El lead se guarda SIEMPRE, y el email es best-effort: si Resend falla el
 * contacto no se pierde, solo deja de llegar la notificación. Al revés
 * (mandar el email y fallar el guardado) se perdían leads en silencio.
 */
export async function POST(request: Request) {
  let payload: z.infer<typeof schema>;

  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Datos inválidos" },
        { status: 400 }
      );
    }

    payload = parsed.data;
  } catch {
    return NextResponse.json({ error: "Cuerpo inválido" }, { status: 400 });
  }

  // 1. Guardar el lead.
  let contactId: string | null = null;
  try {
    const contact = await db.contact.create({
      data: {
        name: payload.name,
        email: payload.email,
        company: payload.company ?? null,
        message: payload.message,
      },
    });
    contactId = contact.id;
  } catch (error) {
    console.error("[contact] No se pudo guardar el lead:", error);
    return NextResponse.json(
      { error: "No pudimos registrar tu mensaje. Intenta de nuevo." },
      { status: 500 }
    );
  }

  // 2. Notificar por email (best-effort).
  try {
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      console.warn(
        "[contact] RESEND_API_KEY no configurada: el lead se guardó pero no se notificó."
      );
    } else {
      const resend = new Resend(resendApiKey);

      if (isResendSandboxSender()) {
        console.warn(
          "[contact] RESEND_FROM_EMAIL no configurado. Se usa el sandbox de Resend, " +
            "que solo entrega al email de la cuenta."
        );
      }

      // Todo lo que viene del usuario se escapa antes de interpolarse en el HTML.
      const safeName = escapeHtml(payload.name);
      const safeEmail = escapeHtml(payload.email);
      const safeMessage = escapeHtml(payload.message);
      const safeCompany = payload.company ? escapeHtml(payload.company) : "";

      await resend.emails.send({
        from: getResendFrom(),
        to: ["contacto@growthbdm.com"],
        subject: `Nuevo mensaje de contacto de ${safeName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #004b8d;">Nuevo mensaje de contacto</h2>
            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px;">
              <p><strong>Nombre:</strong> ${safeName}</p>
              <p><strong>Email:</strong> ${safeEmail}</p>
              ${safeCompany ? `<p><strong>Empresa:</strong> ${safeCompany}</p>` : ""}
              <p><strong>Mensaje:</strong></p>
              <p style="white-space: pre-wrap;">${safeMessage}</p>
            </div>
            <p style="color: #666; font-size: 12px;">ID del lead: ${contactId}</p>
          </div>
        `,
      });
    }
  } catch (error) {
    // El lead ya quedó guardado: avisamos igual, pero sin perderlo.
    console.error("[contact] Lead guardado, falló el envío del email:", error);
  }

  return NextResponse.json({ success: true });
}
