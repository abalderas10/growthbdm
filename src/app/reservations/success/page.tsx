"use client";

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

// Marcar explícitamente como página dinámica
export const dynamic = 'force-dynamic';

interface Reservation {
  date: string;
  time: string;
  productName?: string;
  customerEmail?: string;
  customerName?: string;
}

// Componente que usa useSearchParams envuelto en Suspense
function SuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [isLoading, setIsLoading] = useState(true);
  const [reservation, setReservation] = useState<Reservation | null>(null);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        if (!sessionId) {
          setIsLoading(false);
          return;
        }
        
        const response = await fetch(`/api/reservations/verify?session_id=${sessionId}`);
        
        if (!response.ok) {
          console.error('Error en la respuesta del servidor:', await response.text());
          setIsLoading(false);
          return;
        }
        
        const data = await response.json();
        setReservation(data.reservation);
      } catch (error) {
        console.error('Error verificando el pago:', error);
      } finally {
        setIsLoading(false);
      }
    };

    verifyPayment();
  }, [sessionId]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
        <h2 className="text-2xl font-bold mb-2">Verificando tu reservación...</h2>
        <p className="text-muted-foreground">Estamos confirmando los detalles de tu pago.</p>
      </div>
    );
  }

  if (!reservation && sessionId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
        <div className="bg-destructive/10 p-4 rounded-lg mb-6">
          <h2 className="text-2xl font-bold mb-2 text-destructive">No pudimos verificar tu reservación</h2>
          <p className="text-muted-foreground">Hubo un problema al verificar los detalles de tu pago. Por favor, contacta a soporte.</p>
        </div>
        <Link href="/networking" className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-lg font-medium">
          Volver a la página de networking
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
      <div className="bg-green-50 dark:bg-green-950/30 p-8 rounded-xl shadow-lg max-w-2xl w-full mb-8">
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-20 h-20 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold text-center mb-6">¡Reservación Confirmada!</h1>
        <p className="text-lg text-center mb-8">
          Gracias por reservar tu lugar en nuestro evento de networking. Hemos enviado los detalles a tu correo electrónico.
        </p>
        <div className="border-t border-b border-gray-200 dark:border-gray-700 py-4 mb-6">
          <h2 className="text-xl font-semibold mb-4">Detalles de la Reservación:</h2>
          {reservation && (
            <div className="space-y-2">
              <p><span className="font-medium">Evento:</span> {reservation.productName || 'Networking Growth BDM'}</p>
              <p><span className="font-medium">Fecha:</span> {new Date(reservation.date).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <p><span className="font-medium">Hora:</span> {reservation.time}</p>
              {reservation.customerName && <p><span className="font-medium">Nombre:</span> {reservation.customerName}</p>}
              {reservation.customerEmail && <p><span className="font-medium">Email:</span> {reservation.customerEmail}</p>}
            </div>
          )}
        </div>
        <div className="flex justify-center">
          <Link href="/" className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-lg font-medium">
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}

// Componente principal que envuelve el contenido en Suspense
export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
        <h2 className="text-2xl font-bold mb-2">Cargando...</h2>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
