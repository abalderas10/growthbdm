import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { supabase } from '@/lib/supabase';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';

type Props = {
  params: {
    id: string
  }
}

export async function PATCH(
  req: NextRequest,
  props: Props
): Promise<NextResponse> {
  try {
    // Verificar autenticación
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { status } = await req.json();

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
      .eq('id', props.params.id);

    if (error) {
      return NextResponse.json(
        { error: 'Error al actualizar el formulario' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
