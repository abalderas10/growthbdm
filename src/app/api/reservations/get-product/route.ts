import { NextResponse } from 'next/server';
import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not defined');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

const PRODUCT_ID = 'prod_Rqxdf37ruTalZu';
const PRICE_ID = 'price_1QxFi6P1CcAYKMEzLi6VCkP0';

export async function GET() {
  try {
    console.log('Fetching product from Stripe...');
    
    // Obtener el producto
    const product = await stripe.products.retrieve(PRODUCT_ID);
    console.log('Product fetched:', JSON.stringify(product, null, 2));
    
    if (!product.active) {
      throw new Error('Product is not active');
    }

    // Obtener el precio específico
    const price = await stripe.prices.retrieve(PRICE_ID);

    // Combinar la información del producto con el precio
    const productWithPrice = {
      ...product,
      price: {
        id: price.id,
        unit_amount: price.unit_amount,
        currency: price.currency
      }
    };

    return NextResponse.json({ 
      product: productWithPrice,
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
