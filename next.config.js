/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['localhost', 'imagedelivery.net', 'images.unsplash.com', 'res.cloudinary.com', 'files.stripe.com'],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3022', 'growthbdm.vercel.app', '*.vercel.app'],
    },
  },
}

module.exports = nextConfig
