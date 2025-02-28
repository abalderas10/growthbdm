import { NextResponse } from 'next/server';
import { getTokens } from '@/lib/google-auth';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    
    if (!code) {
      return NextResponse.redirect('/error?message=No authorization code provided');
    }

    // Obtener tokens de Google
    const tokens = await getTokens(code);

    // Guardar tokens en Supabase (necesitarás crear una tabla para esto)
    const { error } = await supabase
      .from('google_calendar_tokens')
      .upsert({
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        expiry_date: new Date(tokens.expiry_date as number).toISOString(),
      });

    if (error) throw error;

    // Redirigir a la página de éxito
    return NextResponse.redirect('/meetings/setup/success');
  } catch (error) {
    console.error('Error in Google callback:', error);
    return NextResponse.redirect('/error?message=Failed to authenticate with Google');
  }
}
