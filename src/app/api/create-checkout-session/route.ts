import { NextResponse } from 'next/server';
import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY must be defined');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

export async function POST(request: Request) {
  try {
    console.log('Received request to create checkout session');
    
    const { priceId } = await request.json();
    console.log('Price ID received:', priceId);

    if (!priceId) {
      console.error('No price ID provided');
      return NextResponse.json(
        { error: { message: 'Price ID is required' } },
        { status: 400 }
      );
    }

    // Verificar que el precio existe
    try {
      const price = await stripe.prices.retrieve(priceId);
      console.log('Price found:', price.id);
    } catch (priceErr: any) {
      console.error('Error retrieving price:', priceErr);
      return NextResponse.json(
        { error: { message: `Invalid price ID: ${priceErr.message}` } },
        { status: 400 }
      );
    }

    console.log('Creating checkout session with price:', priceId);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: 'https://growthbdm.vercel.app/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'https://growthbdm.vercel.app/construye-alianzas',
      billing_address_collection: 'required',
      allow_promotion_codes: true,
      locale: 'es',
    });

    console.log('Checkout session created:', session.id);

    return NextResponse.json({ sessionId: session.id });
  } catch (err: any) {
    console.error('Error creating checkout session:', err);
    return NextResponse.json(
      { 
        error: { 
          message: err.message || 'Error creating checkout session',
          code: err.code,
          type: err.type
        } 
      },
      { status: err.statusCode || 500 }
    );
  }
}
