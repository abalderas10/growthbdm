import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { escapeHtml, getResendFrom, isResendSandboxSender } from "@/lib/email";

export const runtime = "nodejs";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
  company: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      return NextResponse.json(
        { error: "Email service is not configured" },
        { status: 500 }
      );
    }

    const resend = new Resend(resendApiKey);
    const body = await request.json();
    const { name, email, message, company } = schema.parse(body);

    // Todo lo que viene del usuario se escapa antes de interpolarse en el HTML.
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message);
    const safeCompany = company ? escapeHtml(company) : "";

    if (isResendSandboxSender()) {
      console.warn(
        "[contact] RESEND_FROM_EMAIL no configurado. Se usa el sandbox de Resend, " +
          "que solo entrega al email de la cuenta: los mensajes no llegarán a contacto@growthbdm.com."
      );
    }

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
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error en el endpoint de contacto:", error);
    return NextResponse.json(
      { error: "Error processing request" },
      { status: 400 }
    );
  }
}
