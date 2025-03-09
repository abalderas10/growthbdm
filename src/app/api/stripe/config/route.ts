import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    productId: 'prod_Rqxdf37ruTalZu',
    priceId: 'price_1QxFi6P1CcAYKMEzLi6VCkP0',
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'http://34.44.71.242',
  });
}
