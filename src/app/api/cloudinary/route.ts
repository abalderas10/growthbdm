import { NextResponse } from 'next/server';
import type { ImageProps } from '@/types/gallery';

// Fallback images for development and error cases
const FALLBACK_IMAGES: ImageProps[] = [
  {
    id: 0,
    height: 1080,
    width: 1920,
    public_id: 'GrowthBDM/networking_banner',
    format: 'jpg'
  },
  {
    id: 1,
    height: 1080,
    width: 1920,
    public_id: 'GrowthBDM/event_1',
    format: 'jpg'
  }
];

export async function GET() {
  try {
    // Por ahora, retornamos las imágenes estáticas mientras configuramos Cloudinary
    return NextResponse.json({ 
      success: true,
      images: FALLBACK_IMAGES 
    });
  } catch (error) {
    console.error('Error in Cloudinary API:', error);
    return NextResponse.json({ 
      success: false,
      images: FALLBACK_IMAGES,
      error: 'Error fetching images' 
    });
  }
}
