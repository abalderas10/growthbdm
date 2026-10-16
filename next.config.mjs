/**
 * Configuración única de Next.js.
 *
 * Antes convivían `next.config.js` y `next.config.mjs`. Next.js resuelve en
 * este orden: `.nextrc.js` → `next.config.js` → `next.config.mjs` → `.cjs`
 * (ver `node_modules/next/dist/lib/find-config.js`), así que ganaba el `.js`
 * y el `.mjs` se leía… nunca. Eso dejaba en producción sin redirect a `www` y
 * sin ningún header de seguridad (HSTS, X-Frame-Options, nosniff, Referrer-
 * Policy). Ahora todo vive acá.
 */
const imageHosts = [
  "res.cloudinary.com",
  "images.unsplash.com",
  "imagedelivery.net",
  "files.stripe.com",
  "www.growthbdm.com",
  "growthbdm.com",
];

const nextConfig = {
  images: {
    remotePatterns: [
      ...imageHosts.map((hostname) => ({ protocol: "https", hostname })),
      // En desarrollo las imágenes locales se sirven por http en cualquier puerto.
      { protocol: "http", hostname: "localhost" },
    ],
    formats: ["image/avif", "image/webp"],
  },

  // Host canónico: growthbdm.com redirige a www.
  //
  // El patrón va anclado a propósito. Un `has: host (?!www\.).*` —que es lo que
  // había— también captura `localhost:3022` y los `*.vercel.app` de preview,
  // dejando el desarrollo local en un 308 hacia producción.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "^growthbdm\\.com$" }],
        destination: "https://www.growthbdm.com/:path*",
        permanent: true,
      },
    ];
  },

  poweredByHeader: false,

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },

  // Server Actions solo desde los orígenes conocidos.
  experimental: {
    serverActions: {
      allowedOrigins: [
        "localhost:3022",
        "www.growthbdm.com",
        "growthbdm.com",
      ],
    },
  },
};

export default nextConfig;
