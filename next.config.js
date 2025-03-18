/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'res.cloudinary.com',
      'images.unsplash.com',
      'localhost',
      'imagedelivery.net',
      'files.stripe.com'
    ],
    formats: ['image/avif', 'image/webp'],
  },
  // Ignorar errores de TypeScript y ESLint durante la compilación
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Configuración simplificada para mejorar la compatibilidad
  output: 'standalone',
  // Deshabilitar la compresión para facilitar la depuración
  compress: false,
  // Marcar todas las rutas de API como dinámicas
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3022', 'growthbdm.vercel.app']
    }
  }
};

module.exports = nextConfig;
