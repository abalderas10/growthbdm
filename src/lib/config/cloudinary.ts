export const cloudinaryConfig = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'de4dpzh9c',
  folder: 'GrowthNetworking',  // Carpeta específica para imágenes de eventos
  maxResults: 100,
} as const;

// Configuración de respaldo para asegurar que siempre haya valores disponibles
export const cloudinaryCredentials = {
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'de4dpzh9c',
  api_key: process.env.CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || '',
  secure: true,
};
