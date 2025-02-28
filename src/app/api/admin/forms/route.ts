import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { supabase } from '@/lib/supabase';

// Datos de prueba
const seedData = [
  {
    name: 'Juan Pérez',
    email: 'juan.perez@empresa.com',
    company: 'Constructora XYZ',
    message: 'Me interesa conocer más sobre las oportunidades de inversión en el sector inmobiliario.',
    status: 'pending',
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    name: 'María González',
    email: 'maria.gonzalez@desarrollo.mx',
    company: 'Desarrollos Inmobiliarios MG',
    message: 'Quisiera agendar una reunión para discutir posibles alianzas estratégicas.',
    status: 'contacted',
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    name: 'Carlos Rodríguez',
    email: 'carlos.rodriguez@inversionista.com',
    company: 'Inversiones CR',
    message: 'Busco oportunidades de inversión en proyectos residenciales.',
    status: 'completed',
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  }
];

export async function GET() {
  try {
    // Verificar autenticación
    const session = await getServerSession(authOptions);
    
    if (!session) {
      console.log('Error de autenticación: No hay sesión activa');
      return NextResponse.json(
        { error: 'No estás autorizado para acceder a este recurso' },
        { status: 401 }
      );
    }

    console.log('Sesión válida, obteniendo formularios...');

    // Obtener formularios de contacto de Supabase
    const { data: forms, error } = await supabase
      .from('contact_forms')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error de Supabase:', error);
      return NextResponse.json(
        { error: `Error al obtener datos: ${error.message}` },
        { status: 500 }
      );
    }

    // Si no hay formularios, insertar datos de prueba
    if (!forms || forms.length === 0) {
      console.log('No hay formularios, insertando datos de prueba...');
      const { error: insertError } = await supabase
        .from('contact_forms')
        .insert(seedData);

      if (insertError) {
        console.error('Error al insertar datos de prueba:', insertError);
        return NextResponse.json(
          { error: `Error al insertar datos de prueba: ${insertError.message}` },
          { status: 500 }
        );
      }

      // Obtener los formularios recién insertados
      const { data: newForms, error: newError } = await supabase
        .from('contact_forms')
        .select('*')
        .order('created_at', { ascending: false });

      if (newError) {
        console.error('Error al obtener nuevos datos:', newError);
        return NextResponse.json(
          { error: `Error al obtener nuevos datos: ${newError.message}` },
          { status: 500 }
        );
      }

      console.log(`Datos de prueba insertados: ${newForms?.length || 0} registros`);
      return NextResponse.json({ forms: newForms || [] });
    }

    console.log(`Formularios obtenidos: ${forms.length} registros`);
    return NextResponse.json({ forms });
    
  } catch (error: any) {
    console.error('Error detallado:', {
      message: error.message,
      name: error.name,
      stack: error.stack,
    });
    
    return NextResponse.json(
      { error: `Error del servidor: ${error.message}` },
      { status: 500 }
    );
  }
}
