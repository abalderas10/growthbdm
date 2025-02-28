import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    // Obtener el total de formularios
    const { count: formsCount } = await supabase
      .from('contact_forms')
      .select('*', { count: 'exact' });

    // Obtener el total de reuniones
    const { count: meetingsCount } = await supabase
      .from('meetings')
      .select('*', { count: 'exact' });

    // Por ahora, estos son datos de ejemplo
    const stats = {
      users: 120,
      meetings: meetingsCount || 0,
      forms: formsCount || 0,
      revenue: 25000,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json(
      { error: 'Error al obtener las estadísticas' },
      { status: 500 }
    );
  }
}
