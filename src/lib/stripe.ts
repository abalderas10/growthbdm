import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('La variable STRIPE_SECRET_KEY no está configurada');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

export async function createCheckoutSession() {
  try {
    const priceId = 'price_1QxFi6P1CcAYKMEzLi6VCkP0';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/reservations/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/networking`,
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      phone_number_collection: {
        enabled: true,
      },
    });

    return session;
  } catch (error) {
    console.error('Error al crear la sesión de checkout:', error);
    throw error;
  }
}

export async function getProduct() {
  try {
    const productId = 'prod_Rqxdf37ruTalZu';

    const product = await stripe.products.retrieve(productId);

    return {
      id: product.id,
      name: product.name,
      description: product.description,
      images: product.images,
      metadata: product.metadata,
      price: {
        currency: 'MXN',
        unit_amount: 50000, // $500.00 MXN
      },
    };
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    throw error;
  }
}
