import Stripe from 'stripe';
import { NextResponse } from 'next/server';

// Marcar explícitamente como ruta dinámica
export const dynamic = 'force-dynamic';

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
    
    // Construir la respuesta con la información de la sesión
    const responseData = {
      success: true,
      session: {
        id: session.id,
        paymentStatus: session.payment_status,
        amountTotal: session.amount_total ? session.amount_total / 100 : 0, // Convertir de centavos a la moneda base
        currency: session.currency?.toUpperCase(),
        customerEmail: session.customer_details?.email || '',
        customerName: session.customer_details?.name || '',
        productName: productName,
        createdAt: new Date(session.created * 1000).toISOString(), // Convertir timestamp a fecha
      }
    };

    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Error al verificar la sesión:', error);
    return NextResponse.json(
      { error: 'Error al verificar la sesión de pago' },
      { status: 500 }
    );
  }
}
