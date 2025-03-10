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

export async function POST(request: Request) {
  try {
    const { priceId, successUrl, cancelUrl } = await request.json();

    if (!priceId) {
      return NextResponse.json(
        { error: 'Se requiere el ID del precio' },
        { status: 400 }
      );
    }

    // Crear la sesión de checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl || `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_BASE_URL}/networking`,
      allow_promotion_codes: true,
      locale: 'es',
      currency: 'mxn',
      customer_creation: 'always',
      billing_address_collection: 'required',
      phone_number_collection: {
        enabled: true,
      },
      custom_text: {
        submit: {
          message: 'Al hacer clic en pagar, aceptas nuestros términos y condiciones.',
        },
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error al crear la sesión de checkout:', error);
    return NextResponse.json(
      { error: 'Error al crear la sesión de checkout' },
      { status: 500 }
    );
  }
}
