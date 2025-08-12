/**
 * Imágenes de respaldo para la galería de networking
 * Estas imágenes se mostrarán cuando la galería de Cloudinary no pueda cargar
 */

import { CloudinaryImage } from '../types/cloudinary';

// Nombres de archivos de imágenes en la carpeta public/images/networking
// Asegúrate de que estos archivos existan en la carpeta public/images/networking
// tanto en desarrollo como en producción
const networkingImageFiles = [
  'PA100270.jpg',
  'PA100278.jpg',
  'PA100285.jpg',
  'PA100293.jpg',
  'PA100297.jpg',
  'PA100302.jpg',
  'PA100311.jpg',
  'PA100313.jpg',
  'PA100320.jpg',
  'PA100322.jpg',
  'PA100329.jpg',
  'PA100330.jpg',
];

// Imagen de respaldo por defecto en caso de que fallen todas las demás
export const DEFAULT_IMAGE = 'https://res.cloudinary.com/de4dpzh9c/image/upload/v1741501148/AI_chip_hg8jqt';

// Imágenes de respaldo para la galería
export const fallbackGalleryImages: CloudinaryImage[] = networkingImageFiles.map((filename, index) => ({
  id: filename.replace('.jpg', ''),
  height: 600,
  width: 800,
  public_id: filename.replace('.jpg', ''),
  format: 'jpg',
  created_at: new Date().toISOString(),
  context: {
    alt: `Evento de networking Growth BDM ${index + 1}`,
    caption: `Networking profesional - Imagen ${index + 1}`,
  }
}));