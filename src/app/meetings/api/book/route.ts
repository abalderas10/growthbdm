import { NextResponse } from 'next/server';
import { createCalendarEvent } from '@/lib/server/calendar/google';
import { z } from 'zod';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';

// Schema de validación
const bookingSchema = z.object({
  title: z.string(),
  description: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  attendeeEmail: z.string().email(),
  attendeeName: z.string(),
  meetingType: z.string()
});

export async function POST(request: Request) {
  try {
    // Verificar autenticación
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'No autorizado. Por favor inicia sesión.' },
        { status: 401 }
      );
    }

    // Verificar si es un usuario de Growth BDM
    const isGrowthAdmin = session.user?.email?.endsWith('@growthbdm.com');
    
    const body = await request.json();
    
    // Validar los datos
    const validatedData = bookingSchema.parse(body);
    
    // Crear el evento en Google Calendar
    const calendarEvent = await createCalendarEvent({
      summary: validatedData.title,
      description: `
Reunión con: ${validatedData.attendeeName}
Tipo: ${validatedData.meetingType}

${validatedData.description}

${isGrowthAdmin ? '(Confirmada por administrador)' : '(Pendiente de confirmación)'}
      `.trim(),
      startDateTime: validatedData.startTime,
      endDateTime: validatedData.endTime,
      attendeeEmail: validatedData.attendeeEmail,
      status: isGrowthAdmin ? 'confirmed' : 'tentative'
    });

    return NextResponse.json({ 
      success: true, 
      data: {
        calendarEvent,
        isConfirmed: isGrowthAdmin
      }
    });

  } catch (error) {
    console.error('Error al agendar la reunión:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({ 
        success: false, 
        error: 'Datos inválidos en el formulario' 
      }, { status: 400 });
    }

    if (error instanceof Error && error.message === 'No token available') {
      return NextResponse.json({ 
        success: false, 
        error: 'Error de autenticación. Por favor, inicia sesión nuevamente.' 
      }, { status: 401 });
    }

    return NextResponse.json({ 
      success: false, 
      error: 'Error al agendar la reunión. Por favor intenta nuevamente.' 
    }, { status: 500 });
  }
}
