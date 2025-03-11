import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Verificar que la clave de API existe
if (!process.env.STRIPE_SECRET_KEY) {
  console.error('STRIPE_SECRET_KEY no está configurada');
  throw new Error('La variable de entorno STRIPE_SECRET_KEY es requerida');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-02-24.acacia',
});

export async function GET(
  request: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const { productId } = params;

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
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode || 500 }
      );
    }
    return NextResponse.json(
      { error: 'Error al obtener el producto' },
      { status: 500 }
    );
  }
}
