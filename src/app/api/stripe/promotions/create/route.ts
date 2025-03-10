import { NextResponse } from 'next/server';
import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  console.error('STRIPE_SECRET_KEY no está configurada');
  throw new Error('La variable de entorno STRIPE_SECRET_KEY es requerida');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-02-24.acacia',
});

const NETWORKING_PRODUCT_ID = 'prod_Rqxdf37ruTalZu';
const NETWORKING_PRICE_ID = 'price_1QxFi6P1CcAYKMEzLi6VCkP0';

export async function POST(request: Request) {
  try {
    const { code, percentOff, name } = await request.json();

    if (!code || !percentOff || !name) {
      return NextResponse.json(
        { error: 'Se requieren code, percentOff y name' },
        { status: 400 }
      );
    }

    console.log('Creando cupón con descuento del', percentOff, '%');

    // Primero crear el cupón
    const coupon = await stripe.coupons.create({
      percent_off: percentOff,
      duration: 'repeating',
      duration_in_months: 2,
      max_redemptions: 100,
      applies_to: {
        products: [NETWORKING_PRODUCT_ID]
      },
      currency: 'mxn',
      name: name,
    });

    console.log('Cupón creado:', coupon.id);

    // Luego crear el código de promoción
    const promotionCode = await stripe.promotionCodes.create({
      coupon: coupon.id,
      code: code.toUpperCase(),
      active: true,
      restrictions: {
        first_time_transaction: false,
        minimum_amount: 0,
      },
      metadata: {
        event: 'Networking Mayo 2025',
        location: 'Torre Virreyes',
        product_id: NETWORKING_PRODUCT_ID,
        price_id: NETWORKING_PRICE_ID,
        type: percentOff === 100 ? 'vip' : 'general',
        created_at: new Date().toISOString(),
      },
    });

    console.log('Código de promoción creado:', promotionCode.code);

    return NextResponse.json({
      success: true,
      promotionCode: {
        id: promotionCode.id,
        code: promotionCode.code,
        active: promotionCode.active,
        coupon: {
          id: coupon.id,
          percent_off: coupon.percent_off,
          name: coupon.name,
        },
      },
    });
  } catch (error) {
    console.error('Error al crear código de promoción:', error);
    return NextResponse.json(
      { error: 'Error al crear código de promoción', details: error instanceof Error ? error.message : 'Error desconocido' },
      { status: 500 }
    );
  }
}
