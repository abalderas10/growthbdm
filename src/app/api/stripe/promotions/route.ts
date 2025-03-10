import { NextResponse } from 'next/server';
import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  console.error('STRIPE_SECRET_KEY no está configurada');
  throw new Error('La variable de entorno STRIPE_SECRET_KEY es requerida');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-02-24.acacia',
});

const NETWORKING_PRICE_ID = 'price_1QxFi6P1CcAYKMEzLi6VCkP0';

export async function GET() {
  try {
    // Obtener los códigos de promoción específicos para el producto de networking
    const promotionCodes = await stripe.promotionCodes.list({
      active: true,
      limit: 10,
      code: 'NETWORKING',
    });

    // Obtener los cupones asociados
    const coupons = await stripe.coupons.list({
      limit: 10,
    });

    console.log('Códigos de promoción encontrados:', promotionCodes.data.length);
    console.log('Cupones encontrados:', coupons.data.length);

    // Filtrar solo los códigos que aplican al precio del evento
    const validCodes = promotionCodes.data.filter(code => {
      const restrictions = code.restrictions;
      if (!restrictions) return true;
      
      return !restrictions.first_time_transaction &&
             (!restrictions.minimum_amount || restrictions.minimum_amount <= 50000) &&
             (!restrictions.currency_options || 'mxn' in restrictions.currency_options);
    });

    return NextResponse.json({
      promotionCodes: validCodes.map(code => ({
        id: code.id,
        code: code.code,
        active: code.active,
        metadata: code.metadata,
        coupon: code.coupon,
      }))
    });
  } catch (error) {
    console.error('Error al obtener códigos de promoción:', error);
    return NextResponse.json(
      { error: 'Error al obtener códigos de promoción', details: error instanceof Error ? error.message : 'Error desconocido' },
      { status: 500 }
    );
  }
}
