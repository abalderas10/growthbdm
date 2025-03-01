import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { getGoogleToken } from '@/lib/google/auth';

export async function POST(request: Request) {
  try {
    // Verificar la sesión del servidor
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email?.endsWith('@growthbdm.com')) {
      console.error('Unauthorized: Invalid email domain');
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    // Obtener el token de acceso del header de autorización
    const authHeader = request.headers.get('authorization');
    const accessToken = authHeader?.startsWith('Bearer ') 
      ? authHeader.substring(7) 
      : null;

    if (!accessToken) {
      console.error('Unauthorized: No access token provided');
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { startDate, endDate } = await request.json();

    const response = await fetch('https://www.googleapis.com/calendar/v3/freeBusy', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        timeMin: startDate,
        timeMax: endDate,
        items: [{ id: 'primary' }],
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Google Calendar API error:', errorData);
      
      // Si el token expiró, devolver 401 para que el cliente refresque
      if (response.status === 401) {
        return NextResponse.json({ error: 'Token expirado' }, { status: 401 });
      }
      
      return NextResponse.json(
        { error: 'Error al obtener disponibilidad del calendario' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data.calendars?.primary.busy || []);
  } catch (error) {
    console.error('Error getting availability:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error al obtener disponibilidad' },
      { status: 500 }
    );
  }
}
