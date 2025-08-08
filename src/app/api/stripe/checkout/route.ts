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
    const { priceId, productId, quantity = 1, mode = 'payment' } = await request.json();
    console.log('Recibida solicitud de checkout:', { priceId, productId, mode });

    if (!priceId) {
      console.error('Error: priceId no proporcionado');
      return Response.json(
        { error: 'Se requiere el ID del precio' },
        { status: 400 }
      );
    }

    // Usar HTTP para localhost (desarrollo) y HTTPS para producción
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    // Determinar la URL base correcta
    // Si estamos en desarrollo local y accediendo desde localhost, usar el puerto correcto
    const currentUrl = request.headers.get('referer') || '';
    const isLocalhost = currentUrl.includes('localhost');
    
    let baseUrl;
    if (isDevelopment && isLocalhost) {
      // Extraer el puerto del referer si está disponible
      const localhostMatch = currentUrl.match(/localhost:(\d+)/);
      const port = localhostMatch ? localhostMatch[1] : '3022'; // Puerto por defecto
      baseUrl = `http://localhost:${port}`;
    } else {
      baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
              (isDevelopment ? 'http://localhost:3022' : 'https://www.growthbdm.com');
    }
    
    // Asegurarse de que las URLs de redirección sean absolutas y tengan el protocolo correcto
    const successUrl = new URL('/success', baseUrl).toString();
    
    // Determinar la URL de cancelación basada en el producto
    let cancelUrl;
    if (productId === 'prod_Rqxdf37ruTalZu') { // ID del producto de networking
      cancelUrl = new URL('/networking', baseUrl).toString();
    } else {
      cancelUrl = new URL('/construye-alianzas', baseUrl).toString();
    }
    
    console.log('URLs de redirección:', { successUrl, cancelUrl, productId, baseUrl, isLocalhost: currentUrl.includes('localhost') });

    // Configuración base de la sesión
    const sessionConfig: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: quantity,
        },
      ],
      mode: mode as Stripe.Checkout.SessionCreateParams.Mode,
      success_url: successUrl,
      cancel_url: cancelUrl,
      allow_promotion_codes: true,
      locale: 'es',
      currency: 'mxn',
      billing_address_collection: 'required' as Stripe.Checkout.SessionCreateParams.BillingAddressCollection,
      phone_number_collection: {
        enabled: true,
      },
      custom_text: {
        submit: {
          message: mode === 'subscription' 
            ? 'Al suscribirte, aceptas nuestros términos y condiciones.' 
            : 'Al realizar el pago, aceptas nuestros términos y condiciones.',
        },
      },
    };

    // Agregar customer_creation solo en modo payment
    if (mode === 'payment') {
      sessionConfig.customer_creation = 'always';
    }

    console.log('Creando sesión de checkout con config:', JSON.stringify(sessionConfig, null, 2));
    
    try {
      const session = await stripe.checkout.sessions.create(sessionConfig);
      console.log('Sesión creada exitosamente:', session.id);
      return Response.json({ sessionId: session.id, url: session.url });
    } catch (stripeError) {
      if (stripeError instanceof Stripe.errors.StripeError) {
        console.error('Error de Stripe al crear la sesión:', stripeError.message);
        return Response.json(
          { error: `Error de Stripe: ${stripeError.message}` },
          { status: 500 }
        );
      }
      throw stripeError;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error al crear la sesión de checkout:', error.message);
      return Response.json(
        { error: error.message },
        { status: 500 }
      );
    }
    console.error('Error desconocido:', error);
    return Response.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
