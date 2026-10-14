/**
 * Helpers compartidos para las rutas de email (Resend).
 */

/**
 * Escapa caracteres HTML para interpolar valores de usuario dentro de
 * plantillas de correo sin riesgo de inyección de HTML.
 *
 * Sin esto, un `name` como `<img src=x onerror=...>` o un `message` con un
 * `<a href="https://phishing...">` viajan intactos al HTML del correo que
 * termina leyendo el equipo.
 */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Remitente de los correos salientes.
 *
 * `onboarding@resend.dev` es el remitente del sandbox de Resend: solo entrega
 * al email de la cuenta propietaria. Para enviar a `contacto@growthbdm.com` hace
 * falta un dominio propio verificado en Resend, definido en `RESEND_FROM_EMAIL`.
 */
export function getResendFrom(): string {
  return process.env.RESEND_FROM_EMAIL || "Growth BDM <onboarding@resend.dev>";
}

/**
 * Indica si el remitente sigue siendo el sandbox de Resend, en cuyo caso los
 * envíos a dominios externos van a fallar aunque la API responda 200.
 */
export function isResendSandboxSender(): boolean {
  return (process.env.RESEND_FROM_EMAIL || "").includes("resend.dev");
}
