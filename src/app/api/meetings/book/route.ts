import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    console.log('Iniciando proceso de reserva...');
    const body = await request.json();
    console.log('Body recibido:', body);

    const { 
      title,
      description,
      startTime,
      endTime,
      attendeeEmail,
      attendeeName,
      meetingType
    } = body;

    // Validar que todos los campos requeridos estén presentes
    if (!title || !startTime || !endTime || !attendeeEmail || !attendeeName || !meetingType) {
      console.log('Campos faltantes:', { title, startTime, endTime, attendeeEmail, attendeeName, meetingType });
      return NextResponse.json(
        { success: false, error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    // Intentar insertar directamente sin select
    const { error: supabaseError } = await supabase
      .from('meetings')
      .insert({
        title,
        description: description || '',
        start_time: startTime,
        end_time: endTime,
        attendee_email: attendeeEmail,
        attendee_name: attendeeName,
        meeting_type: meetingType,
        status: 'pending'
      });

    if (supabaseError) {
      console.error('Error Supabase completo:', supabaseError);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Error al guardar la reunión: ' + supabaseError.message,
          details: supabaseError
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true,
      message: 'Reunión agendada correctamente'
    });

  } catch (error) {
    console.error('Error completo:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Error al procesar la solicitud: ' + (error as Error).message,
        details: error
      },
      { status: 500 }
    );
  }
}
