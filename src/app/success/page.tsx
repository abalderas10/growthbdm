'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function Success() {
  const [status, setStatus] = useState('loading');
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (sessionId) {
      setStatus('success');
    }
  }, [sessionId]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-center">
      <div className="bg-white rounded-lg shadow-lg p-8">
        {status === 'loading' ? (
          <h1 className="text-2xl font-bold mb-4">Procesando tu pago...</h1>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-[#004b8d] mb-4">¡Gracias por tu suscripción!</h1>
            <p className="text-lg mb-6">
              Tu pago ha sido procesado exitosamente. Pronto recibirás un correo electrónico con los detalles de tu suscripción.
            </p>
            <Link 
              href="/"
              className="inline-block bg-[#004b8d] text-white py-3 px-6 rounded-lg hover:bg-[#003366] transition-colors"
            >
              Volver al inicio
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
