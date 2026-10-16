/**
 * Rate limiting para rutas públicas de escritura.
 *
 * ## Alcance real
 *
 * El contador vive en memoria del proceso. En Vercel cada función serverless
 * corre en su propia instancia con vida corta, así que este límite frena el
 * abuso casual y los bots simples, pero **no** es un límite global: un atacante
 * que dispare contra N instancias ve N veces el presupuesto.
 *
 * Para un límite global de verdad hay que poner un store compartido (Upstash
 * Redis, Vercel KV o una tabla en Supabase). Cuando se quiera, se cambia el
 * backing store de este archivo y las rutas no se tocan: todas pasan por
 * `rateLimit()`.
 */

type Entry = { count: number; resetAt: number };

// Evitar crecimiento indefinido: si nadie limpia, el Map crece sin límite.
const store = new Map<string, Entry>();
const MAX_KEYS = 10_000;

function sweep(now: number) {
  for (const [key, entry] of store) {
    if (entry.resetAt <= now) store.delete(key);
  }
  // Si todavía hay demasiadas claves, tira las más antiguas.
  while (store.size > MAX_KEYS) {
    const oldest = store.keys().next().value;
    if (oldest === undefined) break;
    store.delete(oldest);
  }
}

export type RateLimitResult = {
  ok: boolean;
  remaining: number;
  retryAfterSeconds: number;
};

/**
 * Cuenta un evento para `key` y decide si se permite.
 */
export function rateLimit(
  key: string,
  limit: number,
  windowMs: number
): RateLimitResult {
  const now = Date.now();
  const existing = store.get(key);

  if (!existing || existing.resetAt <= now) {
    if (store.size > MAX_KEYS) sweep(now);
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1, retryAfterSeconds: 0 };
  }

  existing.count += 1;

  if (existing.count > limit) {
    return {
      ok: false,
      remaining: 0,
      retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }

  return {
    ok: true,
    remaining: limit - existing.count,
    retryAfterSeconds: 0,
  };
}

/**
 * Extrae la IP del cliente de los headers que Vercel/los proxies añaden.
 */
export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();

  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  return "unknown";
}
