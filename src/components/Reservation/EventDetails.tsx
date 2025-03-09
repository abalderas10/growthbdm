'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin } from 'lucide-react';
import { toast } from 'sonner';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface EventDetailsProps {
  product: {
    id: string;
    name: string;
    description: string;
    images: string[];
    metadata: {
      event_date?: string;
      location?: string;
    };
    price: {
      currency: string;
      unit_amount: number;
    };
  };
}

export default function EventDetails({ product }: EventDetailsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al procesar el pago');
      }

      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Error al cargar Stripe');
      }

      const { error } = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error instanceof Error ? error.message : 'Error al procesar el pago');
      toast.error('Error al procesar el pago');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto overflow-hidden bg-[#1a1f2e] rounded-lg shadow-xl">
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="flex items-center space-x-3 text-gray-300">
            <Calendar className="h-5 w-5 text-blue-400" />
            <div>
              <h3 className="font-medium">Fecha</h3>
              <p>martes, 5 de marzo de 2024</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-gray-300">
            <Clock className="h-5 w-5 text-blue-400" />
            <div>
              <h3 className="font-medium">Hora</h3>
              <p>07:00 p.m.</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-gray-300">
            <MapPin className="h-5 w-5 text-blue-400" />
            <div>
              <h3 className="font-medium">Ubicación</h3>
              <p>Hotel Westin Santa Fe CDMX</p>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-500 rounded-lg text-red-400">
            {error}
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-white">
            {new Intl.NumberFormat('es-MX', {
              style: 'currency',
              currency: 'MXN',
            }).format(500)}
          </div>
          <Button
            onClick={handleCheckout}
            className="bg-blue-500 hover:bg-blue-600 text-white px-8"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Procesando...
              </div>
            ) : (
              'Reservar Ahora'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
