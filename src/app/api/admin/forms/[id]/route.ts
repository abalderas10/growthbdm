import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { supabase } from '@/lib/supabase';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Verificar autenticación
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { status } = await request.json();

    // Validar estado
    if (!['pending', 'contacted', 'completed'].includes(status)) {
      return NextResponse.json(
        { error: 'Estado inválido' },
        { status: 400 }
      );
    }

    // Actualizar estado en Supabase
    const { error } = await supabase
      .from('contact_forms')
      .update({ status })
      .eq('id', params.id);

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error al actualizar formulario:', error);
    return NextResponse.json(
      { error: 'Error al actualizar formulario' },
      { status: 500 }
    );
  }
}
