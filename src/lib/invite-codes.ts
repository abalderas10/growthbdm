import { db } from "@/lib/db";

/**
 * Normaliza un código de invitación: los usuarios lo escriben con espacios y
 * minúsculas de más, así que comparamos siempre sobre la forma canónica.
 */
export function normalizeCode(code: string): string {
  return code.trim().toUpperCase();
}

export type InviteCodeResult =
  | { valid: true; code: string; label: string | null }
  | { valid: false; reason: "NOT_FOUND" | "INACTIVE" | "EXPIRED" | "EXHAUSTED" };

/**
 * Valida un código de invitación contra la base de datos.
 *
 * El resultado se recalcula siempre en el servidor: el cliente manda un
 * booleano `hasValidCode` que no se puede confiar, porque cualquiera puede
 * llamar a la API a mano y pedir el acceso gratis saltándose el pago.
 */
export async function validateInviteCode(
  rawCode: string | undefined | null
): Promise<InviteCodeResult> {
  if (!rawCode || !rawCode.trim()) {
    return { valid: false, reason: "NOT_FOUND" };
  }

  const code = normalizeCode(rawCode);
  const record = await db.inviteCode.findUnique({ where: { code } });

  if (!record) return { valid: false, reason: "NOT_FOUND" };
  if (!record.isActive) return { valid: false, reason: "INACTIVE" };
  if (record.expiresAt && record.expiresAt.getTime() < Date.now()) {
    return { valid: false, reason: "EXPIRED" };
  }
  if (record.maxUses !== null && record.usedCount >= record.maxUses) {
    return { valid: false, reason: "EXHAUSTED" };
  }

  return { valid: true, code: record.code, label: record.label };
}
