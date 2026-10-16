import { timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";
import { clientIp, rateLimit } from "@/lib/rate-limit";

/**
 * Comparación en tiempo constante de la contraseña de admin.
 *
 * Un `!==` normal filtra información por timing: midiendo cuánto tarda la
 * respuesta se puede adivinar la contraseña carácter a carácter.
 */
export function secretMatches(provided: string | null, expected: string): boolean {
  if (!provided) return false;

  const a = Buffer.from(provided);
  const b = Buffer.from(expected);

  // `timingSafeEqual` exige el mismo largo. Para no filtrar el largo de la
  // contraseña, comparamos contra sí mismo antes de devolver false.
  if (a.length !== b.length) {
    timingSafeEqual(a, a);
    return false;
  }

  return timingSafeEqual(a, b);
}

export type AdminAuthResult =
  | { ok: true }
  | { ok: false; response: NextResponse };

/**
 * Exige la contraseña de admin y acota la tasa de intentos.
 *
 * `budget` acota cuántas operaciones caras (una llamada a la API de
 * Anthropic, una subida) puede disparar un atacante que conocer la clave.
 */
export function requireAdmin(
  request: Request,
  options: {
    password: unknown;
    scope: string;
    budget: number;
    windowMs: number;
  }
): AdminAuthResult {
  const expected = process.env.ADMIN_BLOG_PASSWORD;

  if (!expected) {
    console.error(
      `[admin:${options.scope}] ADMIN_BLOG_PASSWORD no configurada: endpoint cerrado.`
    );
    return {
      ok: false,
      response: NextResponse.json(
        { error: "Endpoint no configurado" },
        { status: 503 }
      ),
    };
  }

  const provided =
    typeof options.password === "string" ? options.password : null;

  // Límite antes de comparar: frena tanto el spam de peticiones como el
  // fuerza bruta de la contraseña, sin distinguir cuál de los dos es.
  const limit = rateLimit(
    `admin:${options.scope}:${clientIp(request)}`,
    options.budget,
    options.windowMs
  );

  if (!limit.ok) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "Demasiados intentos. Espera antes de volver a probar." },
        {
          status: 429,
          headers: { "Retry-After": String(limit.retryAfterSeconds) },
        }
      ),
    };
  }

  if (!secretMatches(provided, expected)) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "Acceso no autorizado" },
        { status: 401 }
      ),
    };
  }

  return { ok: true };
}
