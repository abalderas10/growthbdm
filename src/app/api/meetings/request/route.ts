import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email?.endsWith('@growthbdm.com')) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { startTime, duration, projectDetails } = await request.json();

    // Aquí iría la lógica para guardar la solicitud en la base de datos
    // y enviar notificaciones al equipo de Growth BDM

    // Por ahora, solo simulamos una respuesta exitosa
    return NextResponse.json({
      message: 'Solicitud de reunión recibida',
      status: 'pending',
      meeting: {
        startTime,
        duration,
        projectDetails,
        requestedBy: session.user.email,
      }
    });

  } catch (error) {
    console.error('Error processing meeting request:', error);
    return NextResponse.json(
      { error: 'Error al procesar la solicitud de reunión' },
      { status: 500 }
    );
  }
}
