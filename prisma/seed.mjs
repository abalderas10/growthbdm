/**
 * Códigos de invitación de ejemplo.
 *
 * Uso:
 *   node prisma/seed.mjs
 *
 * Crea tres códigos: uno sin límite, uno con tope de usos y uno ya expirado
 * (para comprobar que la validación los rechaza).
 */
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const codes = [
  {
    code: "VIP-2026",
    label: "Invitado VIP — sin límite de usos",
    isActive: true,
    maxUses: null,
    expiresAt: null,
  },
  {
    code: "EARLY50",
    label: "Early bird — 50 usos",
    isActive: true,
    maxUses: 50,
    expiresAt: null,
  },
  {
    code: "EXPIRADO",
    label: "Caducado — para testear el rechazo",
    isActive: true,
    maxUses: null,
    expiresAt: new Date("2020-01-01T00:00:00.000Z"),
  },
];

async function main() {
  for (const c of codes) {
    await db.inviteCode.upsert({
      where: { code: c.code },
      create: c,
      update: {
        label: c.label,
        isActive: c.isActive,
        maxUses: c.maxUses,
        expiresAt: c.expiresAt,
      },
    });
    console.log(`✓ ${c.code} — ${c.label}`);
  }
  console.log(
    "\nCódigos listos. `usedCount` no se reinicia al re-ejecutar el seed."
  );
}

main()
  .catch((error) => {
    console.error("Error en el seed:", error);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
