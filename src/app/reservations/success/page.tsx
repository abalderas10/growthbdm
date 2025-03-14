"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

interface Reservation {
  date: string;
  time: string;
}

export default function SuccessPage() {
  const router = useRouter();
  const { session_id: sessionId } = router.query || {};
  const [isLoading, setIsLoading] = useState(true);
  const [reservation, setReservation] = useState<Reservation | null>(null);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        if (!sessionId) return;
        const response = await fetch(`/api/reservations/verify?session_id=${sessionId}`);
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
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-card p-8 rounded-lg shadow-lg text-center">
        <CheckCircle className="w-16 h-16 text-primary mx-auto mb-6" />
        <h1 className="text-2xl font-bold text-foreground mb-4">
          ¡Reservación Exitosa!
        </h1>
        {reservation && (
          <div className="text-muted-foreground mb-6">
            <p className="mb-2">Tu reservación ha sido confirmada.</p>
            <p className="mb-2">Fecha: {new Date(reservation.date).toLocaleDateString('es-ES')}</p>
            <p>Hora: {reservation.time}</p>
          </div>
        )}
        <Link 
          href="/"
          className="inline-block bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 transition-colors"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
