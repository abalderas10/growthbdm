/**
 * Imágenes de respaldo para la galería de networking
 * Estas imágenes se mostrarán cuando la galería de Cloudinary no pueda cargar
 */

import { CloudinaryImage } from '../types/cloudinary';

// Imágenes de respaldo para la galería
export const fallbackGalleryImages: CloudinaryImage[] = [
  {
    id: 'fallback-1',
    height: 600,
    width: 800,
    public_id: 'fallback-1',
    format: 'jpg',
    created_at: new Date().toISOString(),
    context: {
      alt: 'Evento de networking Growth BDM',
      caption: 'Networking profesional',
    }
  },
  {
    id: 'fallback-2',
    height: 600,
    width: 800,
    public_id: 'fallback-2',
    format: 'jpg',
    created_at: new Date().toISOString(),
    context: {
      alt: 'Conexiones empresariales',
      caption: 'Construyendo alianzas',
    }
  },
  {
    id: 'fallback-3',
    height: 600,
    width: 800,
    public_id: 'fallback-3',
    format: 'jpg',
    created_at: new Date().toISOString(),
    context: {
      alt: 'Reunión de negocios',
      caption: 'Oportunidades de crecimiento',
    }
  },
  {
    id: 'fallback-4',
    height: 600,
    width: 800,
    public_id: 'fallback-4',
    format: 'jpg',
    created_at: new Date().toISOString(),
    context: {
      alt: 'Conferencia empresarial',
      caption: 'Compartiendo conocimientos',
    }
  },
  {
    id: 'fallback-5',
    height: 600,
    width: 800,
    public_id: 'fallback-5',
    format: 'jpg',
    created_at: new Date().toISOString(),
    context: {
      alt: 'Evento corporativo',
      caption: 'Innovación y desarrollo',
    }
  },
  {
    id: 'fallback-6',
    height: 600,
    width: 800,
    public_id: 'fallback-6',
    format: 'jpg',
    created_at: new Date().toISOString(),
    context: {
      alt: 'Networking estratégico',
      caption: 'Colaboración empresarial',
    }
  },
];