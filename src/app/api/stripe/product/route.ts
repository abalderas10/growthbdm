import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Marcar explícitamente como ruta dinámica
export const dynamic = 'force-dynamic';

// Verificar que la clave de API existe
if (!process.env.STRIPE_SECRET_KEY) {
  console.error('STRIPE_SECRET_KEY no está configurada');
  throw new Error('La variable de entorno STRIPE_SECRET_KEY es requerida');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-02-24.acacia',
});

// Producto por defecto para el evento de networking
const DEFAULT_PRODUCT_ID = 'prod_Rqxdf37ruTalZu';

export async function GET(request: Request) {
  try {
    // Obtener el ID del producto de la URL o usar el default
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('id') || DEFAULT_PRODUCT_ID;

    // Obtener detalles del producto
    const product = await stripe.products.retrieve(productId);
    
    // Obtener el precio asociado
    const prices = await stripe.prices.list({
      product: productId,
      limit: 1,
      active: true,
    });

    if (!prices.data.length) {
      console.error('No se encontraron precios para el producto:', productId);
      return NextResponse.json(
        { error: 'No se encontró precio para el producto' },
        { status: 404 }
      );
    }

    const price = prices.data[0];

    // Devolver producto con precio
    return NextResponse.json({
      id: product.id,
      name: product.name,
      description: product.description,
      images: product.images,
      metadata: {
        date: product.metadata.date || '8 de Mayo 2025',
        location: product.metadata.location || 'Torre Virreyes',
        time: product.metadata.time || '19:00 hrs',
      },
      price: {
        id: price.id,
        unit_amount: price.unit_amount,
        currency: price.currency,
      },
    });
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    return NextResponse.json(
      { error: 'Error al obtener el producto' },
      { status: 500 }
    );
  }
}
