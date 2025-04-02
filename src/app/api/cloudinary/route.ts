import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';
import { cloudinaryConfig } from '@/lib/config/cloudinary';

// Marcar explícitamente como ruta dinámica
export const dynamic = 'force-dynamic';

// Configuración de Cloudinary
cloudinary.config({
  cloud_name: 'de4dpzh9c', // Hardcodeado para asegurar que funcione
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function GET() {
  try {
    console.log('Iniciando búsqueda en Cloudinary');
    console.log(`Carpeta configurada: ${cloudinaryConfig.folder}`);
    console.log(`Cloud name: ${cloudinary.config().cloud_name}`);
    
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
        { status: 200 }
      );
    }

    return NextResponse.json(results);
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
      { status: 500 }
    );
  }
}
