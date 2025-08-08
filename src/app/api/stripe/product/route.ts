import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Marcar explícitamente como ruta dinámica
export const dynamic = 'force-dynamic';

// Verificar que la clave de API existe
let stripe: Stripe | null = null;
let useExampleData = false;

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn('STRIPE_SECRET_KEY no está configurada, usando datos de ejemplo');
  useExampleData = true;
} else {
  try {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-02-24.acacia',
    });
  } catch (error) {
    console.warn('Error al inicializar Stripe, usando datos de ejemplo:', error);
    useExampleData = true;
  }
}

// Producto por defecto para el evento de networking
const DEFAULT_PRODUCT_ID = 'prod_Rqxdf37ruTalZu';

export async function GET(request: Request) {
  try {
    // Obtener el ID del producto de la URL o usar el default
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('id') || DEFAULT_PRODUCT_ID;
    
    // Solo usar datos de ejemplo si no hay otra opción (API key no configurada)
    if (useExampleData) {
      console.log('Usando datos de ejemplo para el producto:', productId);
      
      // Datos de ejemplo para el producto específico
      if (productId === 'prod_Rqxdf37ruTalZu') {
        return NextResponse.json({
          id: 'prod_Rqxdf37ruTalZu',
          name: 'Evento de Networking - Junio 2025 (ACTUALIZADO)',
          description: 'Únete a nuestro exclusivo evento de networking para conectar con profesionales del sector tecnológico y expandir tu red de contactos. ¡Contenido actualizado!',
          images: ['https://res.cloudinary.com/de4dpzh9c/image/upload/v1741501148/AI_chip_hg8jqt'],
          metadata: {
            date: '15 de Junio 2025',
            location: 'Torre Reforma',
            time: '18:30 hrs',
          },
          price: {
            id: 'price_1QxFi6P1CcAYKMEzLi6VCkP0',
            unit_amount: 180000,
            currency: 'mxn',
          },
        });
      } else {
        return NextResponse.json({
          id: productId,
          name: 'Evento de Networking - Mayo 2025',
          description: 'Únete a nuestro exclusivo evento de networking para conectar con profesionales del sector y expandir tu red de contactos.',
          images: ['https://res.cloudinary.com/de4dpzh9c/image/upload/v1741501148/AI_chip_hg8jqt'],
          metadata: {
            date: '8 de Mayo 2025',
            location: 'Torre Virreyes',
            time: '19:00 hrs',
          },
          price: {
            id: 'price_example',
            unit_amount: 150000,
            currency: 'mxn',
          },
        });
      }
    }
    
    // Si no estamos usando datos de ejemplo, continuar con la lógica normal
    if (!stripe) {
      throw new Error('Stripe no está inicializado');
    }

    // Obtener detalles del producto
    const product = await stripe.products.retrieve(productId);
    
    // Obtener el precio asociado
    const prices = await stripe.prices.list({
      product: productId,
      limit: 1,
      active: true,
    });

    if (!prices.data.length) {
      console.error('No se encontraron precios para el producto:', productId);
      return NextResponse.json(
        { error: 'No se encontró precio para el producto' },
        { status: 404 }
      );
    }

    const price = prices.data[0];

    // Devolver producto con precio
    return NextResponse.json({
      id: product.id,
      name: product.name,
      description: product.description,
      images: product.images,
      metadata: {
        date: product.metadata.date || '8 de Mayo 2025',
        location: product.metadata.location || 'Torre Virreyes',
        time: product.metadata.time || '19:00 hrs',
      },
      price: {
        id: price.id,
        unit_amount: price.unit_amount,
        currency: price.currency,
      },
    });
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    
    // Si hay un error con Stripe, usar datos de ejemplo en desarrollo
    if (process.env.NODE_ENV === 'development') {
      console.log('Error con Stripe, usando datos de ejemplo para el producto por defecto');
      return NextResponse.json({
        id: DEFAULT_PRODUCT_ID,
        name: 'Evento de Networking - Mayo 2025 (Ejemplo)',
        description: 'Únete a nuestro exclusivo evento de networking para conectar con profesionales del sector y expandir tu red de contactos.',
        images: ['https://res.cloudinary.com/de4dpzh9c/image/upload/v1741501148/AI_chip_hg8jqt'],
        metadata: {
          date: '8 de Mayo 2025',
          location: 'Torre Virreyes',
          time: '19:00 hrs',
        },
        price: {
          id: 'price_example',
          unit_amount: 150000,
          currency: 'mxn',
        },
      });
    }
    
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode || 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Error al obtener el producto' },
      { status: 500 }
    );
  }
}
