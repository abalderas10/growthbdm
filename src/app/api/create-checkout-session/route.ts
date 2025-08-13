import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Marcar explícitamente como ruta dinámica
export const dynamic = 'force-dynamic';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY must be defined');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-02-24.acacia',
});

// Definir los IDs de productos y sus modos
const PRODUCT_MODES = {
  'price_1QwDX6P1CcAYKMEzAHOPsdSD': 'subscription',
  'price_1QyljqP1CcAYKMEzKHVCsimR': 'payment'
};

export async function POST(request: Request) {
  try {
    console.log('Received request to create checkout session');
    
    const body = await request.json();
    const { priceId, successUrl, cancelUrl, customerEmail } = body as {
      priceId: string;
      successUrl: string;
      cancelUrl: string;
      customerEmail: string;
    };

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
    } catch (priceErr: unknown) {
      console.error('Error retrieving price:', priceErr);
      return NextResponse.json(
        { error: { message: `Invalid price ID: ${priceErr as Error}.message` } },
        { status: 400 }
      );
    }

    console.log('Creating checkout session with price:', priceId);

    // Determinar el modo basado en el ID del precio
    const mode = PRODUCT_MODES[priceId as keyof typeof PRODUCT_MODES] || 'payment';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: mode as Stripe.Checkout.SessionCreateParams.Mode,
      success_url: successUrl || 'https://www.growthbdm.com/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: cancelUrl || 'https://www.growthbdm.com/construye-alianzas',
      billing_address_collection: 'required',
      allow_promotion_codes: true,
      locale: 'es',
    });

    console.log('Checkout session created:', session.id);

    return NextResponse.json({ sessionId: session.id });
  } catch (error: unknown) {
    console.error('Error creating checkout session:', error);
    
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: `Stripe error: ${error.message}` },
        { status: error.statusCode || 500 }
      );
    }

    return NextResponse.json(
      { 
        error: { 
          message: error instanceof Error ? error.message : 'Error creating checkout session'
        } 
      },
      { status: 500 }
    );
  }
}
