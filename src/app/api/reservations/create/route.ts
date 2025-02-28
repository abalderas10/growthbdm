import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';
import { Database } from '@/types/database.types';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not defined');
}

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('Supabase credentials are not defined');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const EVENT_DATE = '2024-03-05T19:00:00-06:00';
const PRODUCT_ID = 'prod_Rqxdf37ruTalZu';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, inviteCode, hasValidCode } = body;

    console.log('Request body:', body);

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    let sessionId = '';

    if (!hasValidCode) {
      try {
        console.log('Creating Stripe customer...');

        // Actualizar el producto con metadatos e imagen
        await stripe.products.update(PRODUCT_ID, {
          name: 'Networking Event - Marzo 2024',
          description: 'Evento de Networking - 5 de Marzo 2024, 19:00 hrs, Hotel Westin Santa Fe CDMX',
          images: ['https://res.cloudinary.com/de4dpzh9c/image/upload/v1708990821/GrowthBDM/networking_event.jpg'],
          metadata: {
            event_date: EVENT_DATE,
            location: 'Hotel Westin Santa Fe CDMX',
            type: 'networking_event'
          }
        });

        // Obtener o crear el precio para el producto
        let price;
        const prices = await stripe.prices.list({
          product: PRODUCT_ID,
          active: true,
          limit: 1,
        });

        console.log('Existing prices:', prices.data);

        if (prices.data.length > 0) {
          price = prices.data[0];
        } else {
          price = await stripe.prices.create({
            product: PRODUCT_ID,
            unit_amount: 50000,
            currency: 'mxn',
            metadata: {
              event_date: EVENT_DATE
            }
          });
        }

        console.log('Using price:', price.id);

        // Crear la sesión de Stripe
        const session = await stripe.checkout.sessions.create({
          customer_email: email,
          payment_method_types: ['card'],
          line_items: [
            {
              price: price.id,
              quantity: 1,
            },
          ],
          mode: 'payment',
          success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/reservations/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/reservations/cancel`,
          locale: 'es',
          payment_method_options: {
            card: {
              setup_future_usage: 'on_session'
            },
          },
          metadata: {
            event_date: EVENT_DATE,
            customer_name: name,
            customer_phone: phone
          }
        });

        console.log('Session created:', session.id);
        sessionId = session.id;
      } catch (stripeError: any) {
        console.error('Stripe error:', stripeError);
        return NextResponse.json(
          { error: `Error al procesar el pago: ${stripeError.message}` },
          { status: 500 }
        );
      }
    } else {
      sessionId = `free_${Date.now()}`;
    }

    try {
      // Si hay un código de invitación, marcarlo como usado
      if (inviteCode && hasValidCode) {
        console.log('Updating invite code...');
        const { error: codeError } = await supabase
          .from('invite_codes')
          .update({ is_used: true, used_by: email, used_at: new Date().toISOString() })
          .eq('code', inviteCode);

        if (codeError) {
          console.error('Code update error:', codeError);
          throw codeError;
        }
      }

      console.log('Creating reservation...');
      // Guardar la reservación
      const { data, error: reservationError } = await supabase
        .from('reservations')
        .insert([
          {
            name,
            email,
            phone,
            event_date: EVENT_DATE,
            status: hasValidCode ? 'confirmed' : 'pending',
            payment_id: sessionId,
            amount: hasValidCode ? 0 : 500.00,
            invite_code: inviteCode || null,
          },
        ])
        .select();

      if (reservationError) {
        console.error('Reservation error:', reservationError);
        throw new Error(`Error al guardar la reservación: ${reservationError.message}`);
      }

      console.log('Reservation created successfully');
      return NextResponse.json({ 
        sessionId,
        message: hasValidCode ? 'Reservación gratuita creada' : 'Redirigiendo a pago'
      });
    } catch (dbError: any) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { error: `Error al guardar la reservación: ${dbError.message}` },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('General error:', error);
    return NextResponse.json(
      { error: `Error al procesar la solicitud: ${error.message}` },
      { status: 500 }
    );
  }
}
