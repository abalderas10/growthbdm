import { NextResponse } from 'next/server';
import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not defined');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

const PRODUCT_ID = 'prod_Rqxdf37ruTalZu';

export async function GET() {
  try {
    console.log('Fetching product from Stripe...');
    const product = await stripe.products.retrieve(PRODUCT_ID);
    console.log('Product fetched:', JSON.stringify(product, null, 2));
    
    if (!product.active) {
      throw new Error('Product is not active');
    }

    // Asegurarnos de que el producto tiene una imagen
    if (!product.images || product.images.length === 0) {
      console.warn('Product has no images');
    } else {
      console.log('Product image URL:', product.images[0]);
    }

    return NextResponse.json({ 
      product,
      timestamp: new Date().toISOString() 
    }, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      }
    });
  } catch (error: any) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { 
        error: `Error fetching product: ${error.message}`,
        timestamp: new Date().toISOString()
      },
      { 
        status: 500,
        headers: {
          'Cache-Control': 'no-store, max-age=0',
        }
      }
    );
  }
}
