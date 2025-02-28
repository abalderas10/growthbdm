import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    // Obtener el conteo y la suma de pagos
    const { data, error } = await supabase
      .from('payments')
      .select('amount');

    if (error) {
      console.error('Error al obtener estadísticas de pagos:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    // Calcular estadísticas
    const count = data?.length || 0;
    const revenue = data?.reduce((sum, payment) => sum + (payment.amount || 0), 0) || 0;

    return NextResponse.json({ 
      count,
      revenue
    });
  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
