import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';
import { cloudinaryConfig, cloudinaryCredentials } from '@/lib/config/cloudinary';

// Marcar explícitamente como ruta dinámica para evitar el cacheo en producción
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

// Configuración de Cloudinary con credenciales
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'de4dpzh9c',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function GET() {
  try {
    console.log('Iniciando búsqueda en Cloudinary');
    console.log(`Carpeta configurada: ${cloudinaryConfig.folder}`);
    console.log(`Cloud name: ${cloudinary.config().cloud_name}`);
    
    // Verificar credenciales
    if (!process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      console.error('Credenciales de Cloudinary no configuradas en variables de entorno');
      console.log('Devolviendo datos de ejemplo para desarrollo');
      
      // Devolver datos de ejemplo para desarrollo
      return NextResponse.json({
        resources: [
          {
            id: 'networking1',
            public_id: 'GrowthNetworking/networking1',
            format: 'jpg',
            width: 1200,
            height: 800,
            created_at: new Date().toISOString(),
            secure_url: 'https://res.cloudinary.com/de4dpzh9c/image/upload/v1741501148/AI_chip_hg8jqt',
            context: {
              custom: {
                alt: 'Evento de Networking Mayo 2025',
                caption: 'Participantes intercambiando ideas durante la sesión principal',
                location: 'Torre Virreyes'
              }
            }
          },
          {
            id: 'networking2',
            public_id: 'GrowthNetworking/networking2',
            format: 'jpg',
            width: 1200,
            height: 800,
            created_at: new Date(Date.now() - 86400000).toISOString(), // Ayer
            secure_url: 'https://res.cloudinary.com/de4dpzh9c/image/upload/v1741501148/AI_chip_hg8jqt',
            context: {
              custom: {
                alt: 'Conferencia de Apertura',
                caption: 'Presentación inaugural sobre tendencias tecnológicas',
                location: 'Auditorio Principal'
              }
            }
          },
          {
            id: 'networking3',
            public_id: 'GrowthNetworking/networking3',
            format: 'jpg',
            width: 1200,
            height: 800,
            created_at: new Date(Date.now() - 172800000).toISOString(), // Hace 2 días
            secure_url: 'https://res.cloudinary.com/de4dpzh9c/image/upload/v1741501148/AI_chip_hg8jqt',
            context: {
              custom: {
                alt: 'Sesión de Networking',
                caption: 'Profesionales intercambiando tarjetas y estableciendo contactos',
                location: 'Salón Ejecutivo'
              }
            }
          },
          {
            id: 'networking4',
            public_id: 'GrowthNetworking/networking4',
            format: 'jpg',
            width: 1200,
            height: 800,
            created_at: new Date(Date.now() - 259200000).toISOString(), // Hace 3 días
            secure_url: 'https://res.cloudinary.com/de4dpzh9c/image/upload/v1741501148/AI_chip_hg8jqt',
            context: {
              custom: {
                alt: 'Panel de Expertos',
                caption: 'Discusión sobre el futuro de la tecnología y las oportunidades de negocio',
                location: 'Centro de Convenciones'
              }
            }
          }
        ],
        total_count: 4
      }, {
        headers: {
          'Cache-Control': 'no-store, max-age=0',
          'Surrogate-Control': 'no-store',
        }
      });
    }
    
    // Ejecutar la búsqueda en Cloudinary
    const results = await cloudinary.search
      .expression(`folder:${cloudinaryConfig.folder}`)
      .sort_by('created_at', 'desc')
      .with_field('context')
      .max_results(cloudinaryConfig.maxResults)
      .execute();

    console.log(`Resultados obtenidos: ${results.resources?.length || 0} imágenes`);
    
    // Verificar si hay resultados
    if (!results || !results.resources || results.resources.length === 0) {
      console.warn('No se encontraron imágenes en la carpeta especificada');
      return NextResponse.json(
        { resources: [], total_count: 0 },
        { 
          status: 200,
          headers: {
            'Cache-Control': 'no-store, max-age=0',
            'Surrogate-Control': 'no-store',
          }
        }
      );
    }

    // Añadir headers para evitar el cacheo
    return NextResponse.json(results, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
        'Surrogate-Control': 'no-store',
      }
    });
  } catch (error) {
    console.error('Error detallado al obtener imágenes de Cloudinary:', error);
    
    // Intentar extraer un mensaje de error más descriptivo
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'Error desconocido al cargar las imágenes';
    
    return NextResponse.json(
      { 
        error: 'Error al cargar las imágenes', 
        details: errorMessage,
        timestamp: new Date().toISOString()
      },
      { 
        status: 500,
        headers: {
          'Cache-Control': 'no-store, max-age=0',
          'Surrogate-Control': 'no-store',
        }
      }
    );
  }
}
