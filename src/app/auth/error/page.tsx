'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

const errorMessages: Record<string, { title: string; message: string }> = {
  Configuration: {
    title: 'Error de Configuración',
    message: 'Hay un problema con la configuración del servidor. Por favor, contacta al administrador.',
  },
  AccessDenied: {
    title: 'Acceso Denegado',
    message: 'Solo se permiten cuentas de @growthbdm.com',
  },
  Verification: {
    title: 'Error de Verificación',
    message: 'El enlace de verificación ha expirado o ya ha sido usado.',
  },
  Default: {
    title: 'Error de Autenticación',
    message: 'Ocurrió un error durante la autenticación. Por favor, intenta de nuevo.',
  },
};

export default function ErrorPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get('error') || 'Default';
  const { title, message } = errorMessages[error] || errorMessages.Default;

  useEffect(() => {
    // Redirigir a la página de inicio después de 5 segundos
    const timeout = setTimeout(() => {
      router.push('/');
    }, 5000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        <Alert variant="destructive">
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
        
        <div className="flex justify-center gap-4">
          <Button
            variant="outline"
            onClick={() => router.push('/auth/signin')}
          >
            Volver a Iniciar Sesión
          </Button>
          <Button
            onClick={() => router.push('/')}
          >
            Ir al Inicio
          </Button>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          Serás redirigido automáticamente en 5 segundos...
        </p>
      </div>
    </div>
  );
}
