import { NextResponse } from 'next/server';
import { UserService } from '@/lib/db/services/user.service';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { z } from 'zod';

// Schema de validación para crear/actualizar usuario
const userSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  position: z.string().min(1),
  company: z.string().min(1),
  project: z.string().min(1),
  status: z.enum(['active', 'inactive', 'pending']),
  billing: z.object({
    plan: z.enum(['basic', 'premium', 'enterprise']),
    status: z.enum(['paid', 'pending', 'overdue']),
    nextBillingDate: z.string(),
    amount: z.number().positive()
  }),
  phoneNumber: z.string().optional(),
  notes: z.string().optional()
});

export async function GET(request: Request) {
  try {
    // Verificar autenticación
    const session = await getServerSession(authOptions);
    if (!session?.user?.email?.endsWith('@growthbdm.com')) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status') || undefined;
    const search = searchParams.get('search') || undefined;
    const billingStatus = searchParams.get('billingStatus') || undefined;

    const result = await UserService.list({
      page,
      limit,
      status,
      search,
      billingStatus
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    return NextResponse.json(
      { error: 'Error al obtener usuarios' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // Verificar autenticación
    const session = await getServerSession(authOptions);
    if (!session?.user?.email?.endsWith('@growthbdm.com')) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = userSchema.parse(body);

    const user = await UserService.create({
      ...validatedData,
      billing: {
        ...validatedData.billing,
        nextBillingDate: new Date(validatedData.billing.nextBillingDate)
      }
    });

    return NextResponse.json(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Datos inválidos', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Error al crear usuario:', error);
    return NextResponse.json(
      { error: 'Error al crear usuario' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    // Verificar autenticación
    const session = await getServerSession(authOptions);
    if (!session?.user?.email?.endsWith('@growthbdm.com')) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID de usuario requerido' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const validatedData = userSchema.partial().parse(body);

    const user = await UserService.update(id, {
      ...validatedData,
      billing: validatedData.billing ? {
        ...validatedData.billing,
        nextBillingDate: validatedData.billing.nextBillingDate ? 
          new Date(validatedData.billing.nextBillingDate) : undefined
      } : undefined
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Datos inválidos', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Error al actualizar usuario:', error);
    return NextResponse.json(
      { error: 'Error al actualizar usuario' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    // Verificar autenticación
    const session = await getServerSession(authOptions);
    if (!session?.user?.email?.endsWith('@growthbdm.com')) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID de usuario requerido' },
        { status: 400 }
      );
    }

    const user = await UserService.delete(id);

    if (!user) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    return NextResponse.json(
      { error: 'Error al eliminar usuario' },
      { status: 500 }
    );
  }
}
