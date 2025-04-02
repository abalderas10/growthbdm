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
      return NextResponse.json(
        { 
          error: 'Error de configuración de Cloudinary', 
          details: 'Credenciales no configuradas en variables de entorno',
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
