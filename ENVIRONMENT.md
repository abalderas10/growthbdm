# Configuración de Variables de Entorno

Este documento explica cómo configurar las variables de entorno necesarias para el correcto funcionamiento de Growth BDM, especialmente para las integraciones con Cloudinary y Stripe.

## Variables de Entorno en Vercel

Las variables de entorno están configuradas en el panel de Vercel para el entorno de producción. Para desarrollo local, necesitas crear un archivo `.env.local` con las siguientes variables:

## Archivo .env.local

Crea un archivo `.env.local` en la raíz del proyecto con la siguiente estructura:

```
# Cloudinary credentials
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=de4dpzh9c
CLOUDINARY_API_KEY=tu_api_key_de_cloudinary
CLOUDINARY_API_SECRET=tu_api_secret_de_cloudinary

# Stripe credentials
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=tu_publishable_key_de_stripe
STRIPE_SECRET_KEY=tu_secret_key_de_stripe

# Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3022
```

## Base de datos (Supabase / PostgreSQL)

El proyecto usa **Prisma sobre PostgreSQL**. Supabase es PostgreSQL, así que la
conexión es directa: basta apuntar `DATABASE_URL` al proyecto.

Supabase ofrece dos formas de conexión, y la diferencia importa:

| Connection type | Cuándo usarla |
|---|---|
| **Session pooler** (puerto `5432`) | Migrations, `prisma db push`, tareas de larga duración. |
| **Transaction pooler** (puerto `6543`, Supavisor) | **La app en runtime.** Las funciones serverless abren y cierran conexiones constantemente; el pool de sesiones de Supabase se agota rápido y la app empieza a dar timeouts. |

Formato del connection string:

```
DATABASE_URL="postgresql://postgres.PROYECTO:PASSWORD@aws-0-REGION.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"
```

> Para las **migraciones** usá el session pooler y **omití** `pgbouncer=true`:
> Prisma necesita prepare statements, que el transaction pooler no soporta.
>
> ```
> # migrations
> DATABASE_URL="postgresql://postgres.PROYECTO:PASSWORD@aws-0-REGION.pooler.supabase.com:5432/postgres"
> ```

Después de conectar, creá las tablas:

```bash
npx prisma migrate dev --name init
```

Los modelos actuales son `Contact` (tabla `contacts`) y `Meeting`
(tabla `meetings`), definidos en `prisma/schema.prisma`.

> **Nota:** la capa de MongoDB que existía antes ya fue eliminada del proyecto.
> Ninguna ruta la usaba, y su archivo de conexión lanzaba un error al
> importarse sin `MONGODB_URI`, lo que rompía el build de forma similar al
> problema que tumbó Resend.


## Obtener Credenciales

### Cloudinary

1. Crea una cuenta en [Cloudinary](https://cloudinary.com/)
2. Ve al Dashboard y encuentra tu Cloud Name, API Key y API Secret
3. Reemplaza los valores en el archivo `.env.local`

### Stripe

1. Crea una cuenta en [Stripe](https://stripe.com/)
2. Ve a la sección de Desarrolladores > API Keys
3. Obtén tu Publishable Key y Secret Key
4. Reemplaza los valores en el archivo `.env.local`

## Modo Desarrollo sin Credenciales

El proyecto está configurado para funcionar en modo desarrollo incluso sin credenciales válidas:

- Para Cloudinary: Se mostrarán imágenes de ejemplo en la galería
- Para Stripe: Se mostrarán datos de producto de ejemplo

Esto permite desarrollar y probar la aplicación sin necesidad de configurar las APIs externas, pero para una experiencia completa y funcional, se recomienda configurar las credenciales reales.

## Notas Importantes

- **Nunca** incluyas el archivo `.env.local` en el control de versiones
- Para despliegues en producción, configura estas variables en el panel de Vercel
- Las credenciales de ejemplo en el archivo `.env.local` no funcionarán para operaciones reales