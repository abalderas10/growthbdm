import Stripe from 'stripe';
import { NextResponse } from 'next/server';

// Verificar que la clave de API existe
if (!process.env.STRIPE_SECRET_KEY) {
  console.error('STRIPE_SECRET_KEY no está configurada');
  throw new Error('La variable de entorno STRIPE_SECRET_KEY es requerida');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-02-24.acacia',
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Se requiere el ID de la sesión' },
        { status: 400 }
      );
    }

    console.log(`Verificando sesión de Stripe: ${sessionId}`);

    // Obtener la información de la sesión de Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'customer', 'payment_intent']
    });

    if (!session) {
      return NextResponse.json(
        { error: 'Sesión no encontrada' },
        { status: 404 }
      );
    }

    // Verificar que la sesión fue pagada
    if (session.payment_status !== 'paid') {
      return NextResponse.json(
        { error: 'El pago no ha sido completado' },
        { status: 400 }
      );
    }

    // Extraer información relevante de la sesión
    const lineItems = session.line_items?.data || [];
    const productName = lineItems[0]?.description || 'Evento';
    
    // Crear un objeto de reservación con la información disponible
    const reservation = {
      date: new Date().toISOString(), // Fecha actual como fallback
      time: '19:00', // Hora por defecto
      productName,
      customerEmail: session.customer_details?.email,
      customerName: session.customer_details?.name,
    };

    console.log('Reservación verificada:', reservation);

    return NextResponse.json({
      success: true,
      reservation,
      session: {
        id: session.id,
        customer: session.customer,
        paymentStatus: session.payment_status,
        amountTotal: session.amount_total,
        currency: session.currency
      }
    });
  } catch (error) {
    console.error('Error al verificar la sesión:', error);
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: `Error de Stripe: ${error.message}` },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
