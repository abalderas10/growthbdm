import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';
import { cloudinaryConfig } from '@/lib/config/cloudinary';

if (!process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  throw new Error('Faltan las credenciales de Cloudinary');
}

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function GET() {
  try {
    const results = await cloudinary.search
      .expression(`folder:${cloudinaryConfig.folder}`)
      .sort_by('created_at', 'desc')
      .with_field('context')
      .max_results(cloudinaryConfig.maxResults)
      .execute();

    return NextResponse.json(results);
  } catch (error) {
    console.error('Error fetching Cloudinary images:', error);
    return NextResponse.json(
      { error: 'Error al cargar las imágenes' },
      { status: 500 }
    );
  }
}
