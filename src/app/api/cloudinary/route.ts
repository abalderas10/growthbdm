import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Tipos para la respuesta de Cloudinary
interface CloudinaryResource {
  asset_id: string;
  secure_url: string;
  created_at: string;
  context?: {
    custom?: {
      alt?: string;
      location?: string;
      event_name?: string;
    };
  };
}

// Validar variables de entorno requeridas
if (!process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  throw new Error('Faltan las credenciales de Cloudinary');
}

// Configuración de Cloudinary
const cloudinaryConfig = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'de4dpzh9c',
  folder: 'GrowthNetworking',  // Carpeta específica para imágenes de eventos
  maxResults: 100,
};

// Configurar Cloudinary solo en el servidor
cloudinary.config({
  cloud_name: cloudinaryConfig.cloudName,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  try {
    console.log('Consultando Cloudinary:', { 
      folder: cloudinaryConfig.folder,
      cloudName: cloudinaryConfig.cloudName,
      maxResults: cloudinaryConfig.maxResults
    });

    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: cloudinaryConfig.folder,
      max_results: cloudinaryConfig.maxResults,
      sort_by: 'created_at',
      direction: 'desc',
      context: true,
      metadata: true,
      tags: true,
    });

    if (!result.resources || !Array.isArray(result.resources)) {
      console.error('Respuesta sin recursos:', result);
      throw new Error('No se encontraron recursos en Cloudinary');
    }

    // Transformar las URLs para usar el formato optimizado
    const transformedResources = result.resources.map((resource: CloudinaryResource) => ({
      id: resource.asset_id,
      url: resource.secure_url.replace('/upload/', '/upload/q_85,f_auto,c_fill,g_faces,w_800,h_600/'),
      createdAt: resource.created_at,
      location: resource.context?.custom?.location,
      eventName: resource.context?.custom?.event_name,
      alt: resource.context?.custom?.alt || `Evento Growth BDM - ${new Date(resource.created_at).toLocaleDateString('es-MX', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })}`,
    }));

    return NextResponse.json({ resources: transformedResources });
  } catch (error) {
    console.error('Error al obtener imágenes de Cloudinary:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error al obtener las imágenes' },
      { status: 500 }
    );
  }
}
