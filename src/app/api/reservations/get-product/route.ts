import { NextResponse } from 'next/server';
import { getProduct } from '@/lib/stripe';

/**
 * Creado el endpoint para obtener el producto usando la función getProduct de lib/stripe
 */
export async function GET() {
  try {
    const product = await getProduct();
    return NextResponse.json({ product });
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error al obtener el producto' },
      { status: 500 }
    );
  }
}
