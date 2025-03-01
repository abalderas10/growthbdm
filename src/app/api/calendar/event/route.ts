import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email?.endsWith('@growthbdm.com')) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    // @ts-ignore - el token de acceso está en el token de sesión
    const token = session.accessToken;
    if (!token) {
      return NextResponse.json({ error: 'No token available' }, { status: 401 });
    }

    const { summary, description, startDateTime, endDateTime, attendeeEmail } = await request.json();

    const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        summary,
        description,
        start: {
          dateTime: startDateTime,
          timeZone: 'America/Mexico_City',
        },
        end: {
          dateTime: endDateTime,
          timeZone: 'America/Mexico_City',
        },
        attendees: [
          { email: attendeeEmail },
        ],
        reminders: {
          useDefault: true,
        },
      }),
    });

    if (!response.ok) {
      throw new Error('Error creating calendar event');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error creating calendar event:', error);
    return NextResponse.json(
      { error: 'Error al crear evento en el calendario' },
      { status: 500 }
    );
  }
}
