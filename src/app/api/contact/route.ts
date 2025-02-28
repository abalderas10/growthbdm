import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
  company: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, company } = schema.parse(body);

    await resend.emails.send({
      from: "Growth BDM <onboarding@resend.dev>",
      to: ["contacto@growthbdm.com"],
      subject: `Nuevo mensaje de contacto de ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #004b8d;">Nuevo mensaje de contacto</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px;">
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${company ? `<p><strong>Empresa:</strong> ${company}</p>` : ''}
            <p><strong>Mensaje:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
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
