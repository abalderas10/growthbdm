# Growth BDM

Desarrollo de Negocios Inmobiliarios - Deploy: 2025-03-07 19:14

## 🚀 Características

- 🔐 Autenticación segura con Google OAuth
- 📊 Dashboard administrativo
- 📅 Integración con Google Calendar
- 📧 Sistema de contacto y formularios
- 🌓 Tema claro/oscuro
- 📱 Diseño responsive
- 🔒 Rutas protegidas
- 🎨 UI moderna con Tailwind CSS

## 🛠️ Stack Tecnológico

- **Framework**: [Next.js 13+](https://nextjs.org/)
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
- **Autenticación**: [NextAuth.js](https://next-auth.js.org/)
- **Base de Datos**: [Supabase](https://supabase.io/)
- **Estilos**: [Tailwind CSS](https://tailwindcss.com/)
- **Hosting**: [Google Cloud Platform (App Engine)](https://cloud.google.com/)

## 📋 Requisitos Previos

- Node.js 18.x o superior
- npm o yarn
- Cuenta de Google Cloud Platform
- Cuenta de Supabase
- Dominio verificado (para producción)

## 🚀 Configuración Local

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/abalderas10/growthbdm.git
   cd growthbdm
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   # o
   yarn install
   ```

3. **Configurar variables de entorno**
   - Crear archivo `.env` (ver sección de Variables de Entorno)

4. **Iniciar servidor de desarrollo**
   ```bash
   npm run dev
   # o
   yarn dev
   ```

## 🔑 Variables de Entorno

Crear un archivo `.env` con las siguientes variables:

```env
# URLs y Configuración Base
NEXT_PUBLIC_BASE_URL="http://localhost:3022"
NEXTAUTH_URL="http://localhost:3022"
NEXTAUTH_SECRET="un-string-aleatorio-muy-largo-y-seguro"

# Google OAuth
GOOGLE_CLIENT_ID="tu-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="tu-client-secret"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="tu-supabase-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="tu-supabase-anon-key"

# Blog (opcional)
NEXT_PUBLIC_BLOG_ID="tu-blog-id"
NEXT_PUBLIC_BLOG_DISPLAY_NAME="Growth Blog"
NEXT_PUBLIC_BLOG_COPYRIGHT="Growth Business Development"
NEXT_DEFAULT_METADATA_DEFAULT_TITLE="Business Development"
NEXT_PUBLIC_BLOG_DESCRIPTION="Desarrollo de Negocios Inmobiliarios"

# Stripe (opcional)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="tu-stripe-publishable-key"
STRIPE_SECRET_KEY="tu-stripe-secret-key"

# Cloudinary (opcional)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="tu-cloud-name"
CLOUDINARY_API_KEY="tu-api-key"
CLOUDINARY_API_SECRET="tu-api-secret"
```

## 🌐 Despliegue en GCP

### 1. Configuración Inicial en GCP

1. Crear nuevo proyecto en GCP
2. Habilitar APIs necesarias:
   - App Engine Admin API
   - Cloud Build API
   - Identity and Access Management (IAM) API

### 2. Configuración de Permisos

1. IAM & Admin > Service Accounts
2. Crear o configurar cuenta de servicio
3. Asignar roles:
   - App Engine Admin
   - Cloud Build Service Account
   - Storage Admin

### 3. Configuración de App Engine

1. Crear aplicación en App Engine
2. Seleccionar región: us-central1
3. Ambiente: Node.js standard

### 4. Despliegue

1. Configurar app.yaml:
   ```yaml
   runtime: nodejs20
   env: standard
   instance_class: F1

   automatic_scaling:
     target_cpu_utilization: 0.65
     min_instances: 1
     max_instances: 10

   env_variables:
     # Agregar variables de entorno aquí
   ```

2. Ejecutar despliegue:
   ```bash
   gcloud app deploy
   ```

## 🔒 Seguridad

- Autenticación restringida a dominio @growthbdm.com
- Todas las rutas del dashboard protegidas
- Variables de entorno seguras
- HTTPS forzado
- Tokens JWT para sesiones

## 📝 Desarrollo

- Rama principal: `main`
- Crear feature branches para nuevas funcionalidades
- Seguir convenciones de commits de [Conventional Commits](https://www.conventionalcommits.org/)

## 🤝 Soporte

Para soporte técnico, contactar a:
- **Email**: alberto.balderas@growthbdm.com
- **Documentación**: [Wiki del proyecto](https://github.com/abalderas10/growthbdm/wiki)

## 📄 Licencia

Copyright 2024 Growth Business Development Management

# Technical stuff

Main repository for growthbdm.com web page.

To install all NPM packages:

Note: This command creates the node_modules/ folder on root folder.

```
npm install
```

To run the server on DEV env:

```
npm run dev
```

To validate installation:

```
http://localhost:3000/ 
```

To validate installation on mossco-ai GCP VM:

GCP VM: [mossco-ai](https://console.cloud.google.com/compute/instancesDetail/zones/us-central1-c/instances/mossco-ai?project=data-oasis-436904-a7)

URL:

```
http://34.44.71.242:3000/   
```

To create an optimized PROD build:

```
npm run build
``` 

To execute the app in PROD env:

```
npm run start
```

To validate packages funding:

```
npm fund
```

To address all issues:

```
npm audit fix --force
```

For git push please execute the following commands after changes:

```
git add .
git commit -m "<Brief_Message>"
git push
```
