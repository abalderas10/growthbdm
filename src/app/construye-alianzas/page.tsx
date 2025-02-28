'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const PRICE_ID = 'price_1QwDX6P1CcAYKMEzAHOPsdSD';

export default function ConstruyeAlianzas() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubscription = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Iniciando proceso de checkout...');
      
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: PRICE_ID,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Error al crear la sesión de checkout');
      }

      const data = await response.json();
      console.log('Sesión creada:', data);

      if (!data.sessionId) {
        throw new Error('No se recibió el ID de sesión');
      }
      
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Stripe no se inicializó correctamente');
      }

      const { error } = await stripe.redirectToCheckout({
        sessionId: data.sessionId
      });
      
      if (error) {
        throw error;
      }
    } catch (err: any) {
      console.error('Error en el proceso de checkout:', err);
      setError(err.message || 'Ocurrió un error al procesar el pago');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-12 flex-grow">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Construye Alianzas Estratégicas
        </h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            Suscripción Growth Premium
          </h2>
          <ul className="mb-6 space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
              </svg>
              <span>Acceso a nuestra red de aliados estratégicos</span>
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
              </svg>
              <span>Herramientas exclusivas de networking</span>
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
              </svg>
              <span>Asesoría personalizada</span>
            </li>
          </ul>
          
          {error && (
            <div className="bg-red-50 dark:bg-red-900/50 text-red-600 dark:text-red-200 p-4 rounded-lg mb-4">
              {error}
            </div>
          )}
          
          <button
            onClick={handleSubscription}
            disabled={loading}
            className="w-full bg-[#004b8d] dark:bg-[#0066cc] text-white py-3 px-6 rounded-lg hover:bg-[#003366] dark:hover:bg-[#0052a3] transition-colors disabled:opacity-50"
          >
            {loading ? 'Procesando...' : 'Suscribirse Ahora'}
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
