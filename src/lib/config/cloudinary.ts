export const cloudinaryConfig = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '',
  folder: 'GrowthNetworking',  // Carpeta específica para imágenes de eventos
  maxResults: 100,
} as const;
