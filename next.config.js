/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
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
  experimental: {
    // serverActions ya está disponible por defecto en Next.js 14.2.3
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  swcMinify: true,
  reactStrictMode: true,
  poweredByHeader: false,
  env: {
    NEXT_PUBLIC_BLOG_ID: process.env.NEXT_PUBLIC_BLOG_ID,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  },
  serverRuntimeConfig: {
    port: 3022
  },
  publicRuntimeConfig: {
    port: 3022
  },
  // Excluir carpetas de ejemplo/referencia del build
  webpack: (config, { isServer }) => {
    // Excluir la carpeta reference_gallery
    config.module.rules.push({
      test: /reference_gallery/,
      loader: 'ignore-loader',
    });
    
    return config;
  },
};

module.exports = nextConfig;
