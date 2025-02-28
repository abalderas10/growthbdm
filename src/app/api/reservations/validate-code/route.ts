import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('Supabase credentials are not defined');
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code } = body;

    if (!code) {
      return NextResponse.json(
        { error: 'Código no proporcionado' },
        { status: 400 }
      );
    }

    // Verificar el código en la base de datos
    const { data, error } = await supabase
      .from('invite_codes')
      .select('*')
      .eq('code', code)
      .eq('is_used', false)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // No se encontró el código
        return NextResponse.json({ isValid: false });
      }
      
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Error al validar el código' },
        { status: 500 }
      );
    }

    return NextResponse.json({ isValid: true, codeId: data.id });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    );
  }
}
