'use client';

import { loadStripe } from '@stripe/stripe-js';

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  throw new Error('Error de configuración: Clave pública de Stripe no disponible');
}

export const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export async function createCheckoutSession(priceId: string) {
  try {
    const response = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ priceId }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Error al crear la sesión de pago');
    }

    const { url } = await response.json();
    return url;
  } catch (error) {
    console.error('Error en createCheckoutSession:', error);
    throw error;
  }
}
