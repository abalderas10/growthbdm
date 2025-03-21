# Growth BDM

Plataforma de Desarrollo de Negocios y Alianzas Estratégicas

## 📋 Descripción del Proyecto

Growth BDM es una plataforma moderna para el desarrollo de negocios inmobiliarios y la creación de alianzas estratégicas. Diseñada con las últimas tecnologías web, ofrece una experiencia de usuario fluida y atractiva tanto en dispositivos móviles como de escritorio.

## 🚀 Stack Tecnológico

- **Framework**: [Next.js 14.2.3](https://nextjs.org/)
- **Node.js**: 20.12.2 (LTS)
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
- **Estilos**: [Tailwind CSS](https://tailwindcss.com/) con [shadcn/ui](https://ui.shadcn.com/)
- **Animaciones**: [Framer Motion](https://www.framer.com/motion/)
- **Gestión de Citas**: [Cal.com](https://cal.com/)
- **Procesamiento de Pagos**: [Stripe](https://stripe.com/)
- **Hosting**: [Vercel](https://vercel.com/)

## 🧩 Componentes Principales

### 1. Header y Navegación
- Logo Growth BDM
- Menú de navegación responsive
- Botón de tema claro/oscuro
- CTA "Construye Alianzas"

### 2. Hero Section
- Título con gradiente y animaciones
- Subtítulo con efectos de aparición
- Botones CTA principales
- Fondo con gradiente y patrones

### 3. Growth Business Developer
- Descripción de servicios
- Tarjetas de valor con animaciones
- Métricas de resultados

### 4. Estrategias de Expansión
- Presentación de estrategias
- Elementos visuales interactivos
- Llamadas a la acción contextuales

### 5. Growth Intelligence
- Presentación de análisis de datos
- Visualizaciones interactivas
- Beneficios de inteligencia de negocios

### 6. Blog
- Artículos organizados por categorías
- Sistema de etiquetas
- Feed RSS
- Sitemaps para SEO

### 7. Sección de Networking
- Información sobre eventos
- Botón "Reservar Lugar" con color primario
- Formulario de registro

### 8. Página de Alianzas Estratégicas
- Integración con Cal.com para agendar reuniones
- Procesamiento de pagos con Stripe
- Formularios de contacto

### 9. Footer
- Enlaces a secciones principales
- Formulario de suscripción a newsletter
- Información de contacto
- Enlaces a redes sociales

## 🛠️ Funcionalidades Principales

### 1. Tema Claro/Oscuro
- Cambio automático según preferencias del sistema
- Transición suave entre temas
- Persistencia de preferencia del usuario

### 2. Animaciones y Microinteracciones
- Transiciones de página con Framer Motion
- Efectos de aparición al hacer scroll
- Hover effects en botones y tarjetas
- Animaciones coordinadas con variants

### 3. Integración con Cal.com
- Agendamiento de reuniones y citas
- Sincronización con calendarios
- Recordatorios automáticos

### 4. Procesamiento de Pagos con Stripe
- Checkout seguro
- Gestión de productos y promociones
- Páginas de éxito y cancelación

### 5. Sistema de Contacto
- Formularios de contacto rápido
- Envío de mensajes mediante API
- Validación de datos con Zod

### 6. Newsletter
- Suscripción a actualizaciones
- Integración con servicios de email
- Confirmación de suscripción

### 7. Optimización SEO
- Metadatos optimizados
- Sitemaps automáticos
- Imágenes OG para compartir en redes

### 8. Responsive Design
- Diseño adaptativo para todos los dispositivos
- Menú móvil optimizado
- Imágenes optimizadas para diferentes tamaños de pantalla

### 9. Integración con Cloudinary
- Gestión de imágenes optimizada
- Transformaciones automáticas
- Galería de imágenes interactiva

## 🏠 Información de La Villa Galeón
- 3 recámaras/habitaciones
- 4 baños
- 2 plazas de estacionamiento

## 🚀 Configuración del Proyecto

### Requisitos Previos
- Node.js 20.x o superior
- npm o yarn

### Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/abalderas10/growthbdm.git
   cd growthbdm
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   - Crear archivo `.env.local` basado en `.env.example`

4. **Iniciar servidor de desarrollo**
   ```bash
   npm run dev
   ```
   El servidor se iniciará en http://localhost:3022

### Build para Producción

```bash
# Limpiar caché de Next.js
rm -rf .next
# O en Windows
Remove-Item -Recurse -Force .next

# Crear build optimizado
npm run build

# Iniciar en modo producción
npm start
```

## 🔍 Solución de Problemas

### Errores de Build
- Si encuentras errores durante el build, intenta limpiar la caché de Next.js
- Verifica que todas las dependencias estén correctamente instaladas
- Asegúrate de que TypeScript y los tipos relacionados estén en `dependencies` (no en `devDependencies`) para despliegues en Vercel

### Despliegue en Vercel
- La rama principal para despliegue es `main`
- La rama de respaldo para soluciones de build es `fix/build-typescript-vercel`

## 📝 Desarrollo

- Rama principal: `main`
- Seguir convenciones de commits de [Conventional Commits](https://www.conventionalcommits.org/)
- Ejecutar `npm run lint` antes de hacer commit

## 📄 Licencia

Copyright 2025 Growth Business Development Management
