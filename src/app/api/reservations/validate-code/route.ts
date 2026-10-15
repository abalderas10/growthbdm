import { NextResponse } from "next/server";
import { z } from "zod";
import { validateInviteCode } from "@/lib/invite-codes";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const schema = z.object({
  code: z.string().min(1, "El código es requerido").max(64),
});

/**
 * Valida un código de invitación para el formulario de reservas.
 *
 * Solo devuelve si el código es válido o no, nunca por qué: el motivo
 * exacto (`EXPIRED`, `EXHAUSTED`...) le da a un atacante información sobre
 * los códigos que existen en la organización.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ isValid: false }, { status: 400 });
    }

    const result = await validateInviteCode(parsed.data.code);

    return NextResponse.json({ isValid: result.valid });
  } catch (error) {
    console.error("Error validando código de invitación:", error);
    return NextResponse.json(
      { isValid: false, error: "Error al validar el código" },
      { status: 500 }
    );
  }
}
