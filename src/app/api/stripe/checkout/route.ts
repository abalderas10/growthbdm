import { NextResponse } from 'next/server';
import { createCheckoutSession } from '@/lib/stripe';

export async function POST() {
  try {
    const session = await createCheckoutSession();
    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error al crear la sesión de checkout:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error al crear la sesión de checkout' },
      { status: 500 }
    );
  }
}
