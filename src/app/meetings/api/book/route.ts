import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { createCalendarEvent } from '@/lib/google-calendar';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      title,
      description,
      startTime,
      endTime,
      attendeeEmail,
      attendeeName,
      meetingTypeId
    } = body;

    // Crear el evento en Google Calendar
    const calendarEvent = await createCalendarEvent({
      summary: title,
      description,
      startDateTime: startTime,
      endDateTime: endTime,
      attendeeEmail
    });

    // Guardar la reunión en Supabase
    const { data, error } = await supabase
      .from('meetings')
      .insert({
        title,
        description,
        start_time: startTime,
        end_time: endTime,
        attendee_email: attendeeEmail,
        attendee_name: attendeeName,
        meeting_type_id: meetingTypeId,
        google_event_id: calendarEvent.id,
        status: 'confirmed'
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ 
      success: true, 
      data: {
        meeting: data,
        calendarEvent
      }
    });
  } catch (error) {
    console.error('Error booking meeting:', error);
    return NextResponse.json(
      { success: false, error: 'Error al agendar la reunión' },
      { status: 500 }
    );
  }
}
