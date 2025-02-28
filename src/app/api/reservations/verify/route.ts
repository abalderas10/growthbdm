import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      throw new Error('Session ID no proporcionado');
    }

    // Verificar el estado del pago en Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === 'paid') {
      // Actualizar el estado de la reservación en Supabase
      const { data, error } = await supabase
        .from('reservations')
        .update({ status: 'confirmed' })
        .eq('payment_id', sessionId)
        .select()
        .single();

      if (error) throw error;

      return NextResponse.json({ reservation: data });
    }

    return NextResponse.json(
      { error: 'Pago no completado' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Error al verificar el pago' },
      { status: 500 }
    );
  }
}
