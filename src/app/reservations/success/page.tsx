"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [isLoading, setIsLoading] = useState(true);
  const [reservation, setReservation] = useState<any>(null);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const response = await fetch(`/api/reservations/verify?session_id=${sessionId}`);
        const data = await response.json();
        setReservation(data.reservation);
      } catch (error) {
        console.error('Error verificando el pago:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (sessionId) {
      verifyPayment();
    }
  }, [sessionId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
        <div className="text-center">
          <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
            ¡Reservación Exitosa!
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Tu pago ha sido procesado y tu lugar está confirmado.
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <div className="rounded-md bg-gray-50 dark:bg-gray-700 p-4">
            <div className="text-sm text-gray-700 dark:text-gray-300">
              <p className="font-medium">Detalles de la reservación:</p>
              <ul className="mt-2 space-y-1">
                <li>Fecha: {new Date(reservation?.event_date).toLocaleDateString()}</li>
                <li>Email: {reservation?.email}</li>
                <li>Monto: ${reservation?.amount?.toFixed(2)} MXN</li>
              </ul>
            </div>
          </div>

          <div className="text-sm text-gray-500 dark:text-gray-400">
            Recibirás un correo electrónico con los detalles de tu reservación.
          </div>

          <div className="flex justify-center">
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
