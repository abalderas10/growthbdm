# Conectar el proyecto a Supabase

Guía de terminal, paso a paso. Todos los comandos se corren **desde la raíz del
proyecto** (`growthbdm/`).

---

## 0. Conseguir las credenciales

En el dashboard de Supabase → **Project Settings → API**:

| Dato | Dónde | Para qué |
|---|---|---|
| Project URL | API → Project URL | `SUPABASE_URL` |
| `anon` public key | API → Publishable keys | Solo si el navegador consulta Supabase directo |
| `service_role` key | API → Secret keys | Operaciones de admin desde el servidor |
| **DB password** | Database → Settings → Database password | `DATABASE_URL` |
| Project ref | Project Settings → General → Reference ID | Build de la URL |

> 🔒 La `service_role` **no** la pongas nunca en el navegador ni en una variable
> `NEXT_PUBLIC_*`. Ignora RLS: es root en tu base.

---

## 1. Variables locales

```bash
cd growthbdm

cat > .env.local <<'EOF'
# Supabase
SUPABASE_URL=https://TU_PROJECT_REF.supabase.co

# Conexión a Postgres para la app (transaction pooler: serverless)
DATABASE_URL="postgresql://postgres.TU_PROJECT_REF:TU_PASSWORD@aws-0-TU_REGION.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"

# Email (opcional para probar; el lead se guarda igual sin esto)
RESEND_API_KEY=re_TU_KEY
RESEND_FROM_EMAIL=Growth BDM <hola@growthbdm.com>

# Stripe (solo para reservas de pago)
STRIPE_SECRET_KEY=sk_test_TU_KEY
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_TU_KEY
STRIPE_EVENT_PRICE_ID=price_TU_ID
EOF

echo "✅ .env.local creado"
```

**Los dos connection strings que importan:**

| Para qué | Host | Puerto | Query |
|---|---|---|---|
| **La app en Vercel** | `...pooler.supabase.com` | `6543` | `?pgbouncer=true&connection_limit=1` |
| **Las migraciones** | `...pooler.supabase.com` | `5432` | *(ninguna)* |

> ⚠️ Si usás el session pooler (`5432`) en la app, funciona en local y **se
> rompe en Vercel** con timeouts: las funciones serverless abren y cierran
> conexiones sin parar y agotan el pool de sesiones. Ese es el fallo clásico.

---

## 2. Crear las tablas

```bash
# Instalar la CLI de Supabase (una sola vez)
npm i -g supabase

# Vincular el proyecto (te pide el project ref y la DB password)
supabase login
supabase link --project-ref TU_PROJECT_REF
```

Luego creá las tablas. **Descomentá la línea de la URL de migraciones** para que
Prisma use el session pooler:

```bash
# Migrations
DATABASE_URL="postgresql://postgres.TU_PROJECT_REF:TU_PASSWORD@aws-0-TU_REGION.pooler.supabase.com:5432/postgres" \
  npx prisma migrate dev --name init

# Si eso falla por permisos de shadow database, usá esto en su lugar:
# DATABASE_URL="postgresql://...:5432/postgres" npx prisma db push
```

Crea: `contacts`, `newsletter_subscribers`, `invite_codes`, `reservations`,
`meetings`.

---

## 3. Códigos de invitación

```bash
# La variable de arriba debe ser la del session pooler (:5432)
DATABASE_URL="postgresql://postgres.TU_PROJECT_REF:TU_PASSWORD@aws-0-TU_REGION.pooler.supabase.com:5432/postgres" \
  npm run seed
```

Crea `VIP-2026`, `EARLY50` y `EXPIRADO` (este último, ya vencido, para probar
que el sistema lo rechaza).

Para crear códigos reales desde la consola de Supabase (SQL Editor):

```sql
INSERT INTO invite_codes (code, label, "isActive", "maxUses", "usedCount", "createdAt", "updatedAt")
VALUES ('CLIENTE-001', 'Cliente Acme', true, 1, 0, now(), now());
```

> Las columnas van entre comillas porque Prisma mapea los campos a camelCase y
> los que empiezan con mayúscula o son palabras reservadas de Postgres
> (`isActive`, `maxUses`…) los crea como `"isActive"`.

---

## 4. Correrlo en local

```bash
npm run dev
```

Probalo:

```bash
# En otra terminal — debe devolver {"success":true}
curl -X POST http://localhost:3022/api/contact \
  -H 'Content-Type: application/json' \
  -d '{"name":"Prueba","email":"prueba@test.com","message":"Mensaje de prueba de terminal"}'

# Y el suscriptor debe aparecer en la tabla
supabase db dump --linked --data-only --schema public > /dev/null 2>&1 || true
```

Verificá en el dashboard: **Table Editor → contacts** → tiene que estar la fila.

---

## 5. Variables en Vercel

```bash
npm i -g vercel
vercel link
vercel env add DATABASE_URL production
vercel env add SUPABASE_URL production
vercel env add RESEND_API_KEY production
vercel env add RESEND_FROM_EMAIL production
vercel env add STRIPE_SECRET_KEY production
vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY production
vercel env add STRIPE_EVENT_PRICE_ID production
```

Cada uno te pregunta el valor. Para `DATABASE_URL` pegá la del **transaction
pooler** (`:6543` con `pgbouncer=true`).

Después:

```bash
vercel --prod
```

---

## 6. Verificar que quedó vivo

```bash
# Lead guardado
curl -X POST https://growthbdm.vercel.app/api/contact \
  -H 'Content-Type: application/json' \
  -d '{"name":"Deploy","email":"deploy@test.com","message":"Prueba post-deploy"}'

# Suscriptor guardado (idempotente: no debe duplicar)
curl -X POST https://growthbdm.vercel.app/api/newsletter \
  -H 'Content-Type: application/json' \
  -d '{"email":"deploy@test.com"}'

# Código de invitación
curl -X POST https://growthbdm.vercel.app/api/reservations/validate-code \
  -H 'Content-Type: application/json' \
  -d '{"code":"VIP-2026"}'      # → {"isValid":true}
```

Después confirmá en el Table Editor del dashboard que hay filas en `contacts`
y `newsletter_subscribers`.

---

## Si algo falla

| Síntoma | Causa probable |
|---|---|
| `Can't reach database server` | Usás `:6543` para las migraciones. Cambiá a `:5432`. |
| Timeout en Vercel, bien en local | Session pooler en runtime. Usá `:6543` con `pgbouncer=true`. |
| `P1001: Can't reach database` en serverless | Falta `?pgbouncer=true&connection_limit=1` en el `DATABASE_URL`. |
| `relation "contacts" does not exist` | Corriste `migrate` contra otra base. Revisá el project ref. |
| Emails no llegan | `RESEND_FROM_EMAIL` apunta a `resend.dev` (sandbox: solo entrega a tu cuenta). Verificá el dominio. |
| `Invalid ... for prisma.seed` | El seed no corre solo: usá `npm run seed`. |
