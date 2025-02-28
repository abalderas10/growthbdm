import { NextResponse } from 'next/server';
import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not defined');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

const PRODUCT_ID = 'prod_Rqxdf37ruTalZu';

export async function POST(request: Request) {
  try {
    const { imageUrl } = await request.json();

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'No image URL provided' },
        { status: 400 }
      );
    }

    // Actualizar el producto con la nueva imagen
    const product = await stripe.products.update(PRODUCT_ID, {
      images: [imageUrl],
    });

    return NextResponse.json({ success: true, product });
  } catch (error: any) {
    console.error('Error updating product image:', error);
    return NextResponse.json(
      { error: `Error updating product image: ${error.message}` },
      { status: 500 }
    );
  }
}
