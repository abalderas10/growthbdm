import { NextResponse } from 'next/server';
import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Stripe secret key is not defined');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { productId } = body;

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID no proporcionado' },
        { status: 400 }
      );
    }

    // Obtener detalles del producto
    const product = await stripe.products.retrieve(productId);

    // Obtener el precio asociado
    const prices = await stripe.prices.list({
      product: productId,
      active: true,
      limit: 1,
    });

    const price = prices.data[0];

    return NextResponse.json({
      product: {
        id: product.id,
        name: product.name,
        description: product.description,
        images: product.images,
        metadata: product.metadata,
        price: price ? {
          id: price.id,
          amount: price.unit_amount,
          currency: price.currency,
        } : null,
      },
    });
  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Error al obtener detalles del producto' },
      { status: 500 }
    );
  }
}
