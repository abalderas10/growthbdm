/**
 * Configuración de Cloudinary para la galería de imágenes
 */
export const cloudinaryConfig = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'de4dpzh9c',
  folder: 'GrowthNetworking',  // Carpeta específica para imágenes de eventos
  maxResults: 100,
} as const;

/**
 * Credenciales de Cloudinary para la API del servidor
 * Estas credenciales deben estar configuradas en las variables de entorno
 * en el entorno de producción (Vercel)
 */
export const cloudinaryCredentials = {
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'de4dpzh9c',
  api_key: process.env.CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || '',
  secure: true,
};
