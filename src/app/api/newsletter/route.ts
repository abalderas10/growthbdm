import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const schema = z.object({
  email: z.string().email(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = schema.parse(body);

    // Enviar email de confirmación
    await resend.emails.send({
      from: "Growth BDM <onboarding@resend.dev>",
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

    // Aquí podrías agregar el código para guardar el email en una base de datos

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error en el endpoint de newsletter:", error);
    return NextResponse.json(
      { error: "Error processing subscription" },
      { status: 400 }
    );
  }
}
