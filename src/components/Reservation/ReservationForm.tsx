"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { loadStripe } from '@stripe/stripe-js';
import { CalendarDays, MapPin, Clock } from 'lucide-react';
import { toast } from 'sonner';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const reservationSchema = z.object({
  name: z.string().min(2, 'El nombre es requerido'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(10, 'Teléfono inválido'),
  inviteCode: z.string().optional(),
});

type ReservationFormData = z.infer<typeof reservationSchema>;

export default function ReservationForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isValidatingCode, setIsValidatingCode] = useState(false);
  const [codeStatus, setCodeStatus] = useState<'valid' | 'invalid' | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
  });

  const inviteCode = watch('inviteCode');

  const validateInviteCode = async (code: string) => {
    if (!code) return;
    setIsValidatingCode(true);
    setError(null);
    try {
      const response = await fetch('/api/reservations/validate-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Error al validar el código');
      }
      setCodeStatus(result.isValid ? 'valid' : 'invalid');
      if (result.isValid) {
        toast.success('Código válido');
      } else {
        toast.error('Código inválido');
      }
    } catch (error) {
      console.error('Error validando código:', error);
      setCodeStatus('invalid');
      toast.error('Error al validar el código');
    } finally {
      setIsValidatingCode(false);
    }
  };

  const onSubmit = async (data: ReservationFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      console.log('Enviando datos:', data);
      
      // Crear la reservación en Supabase
      const response = await fetch('/api/reservations/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          hasValidCode: codeStatus === 'valid',
        }),
      });

      const result = await response.json();
      console.log('Respuesta del servidor:', result);

      if (!response.ok) {
        throw new Error(result.error || 'Error al crear la reservación');
      }

      // Si no hay código de invitación válido, proceder con el pago
      if (codeStatus !== 'valid') {
        const stripe = await stripePromise;
        if (!stripe) {
          throw new Error('Error al cargar Stripe');
        }
        
        const { error } = await stripe.redirectToCheckout({
          sessionId: result.sessionId,
        });

        if (error) {
          throw new Error(error.message);
        }
      } else {
        // Redireccionar directamente a la página de éxito
        window.location.href = `/reservations/success?session_id=${result.sessionId}`;
      }

    } catch (error: any) {
      console.error('Error:', error);
      setError(error.message || 'Error al procesar la reservación');
      toast.error(error.message || 'Error al procesar la reservación');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Detalles del Evento
        </h3>
        <div className="space-y-3">
          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <CalendarDays className="h-5 w-5 mr-2" />
            <span>Martes, 5 de Marzo 2024</span>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <Clock className="h-5 w-5 mr-2" />
            <span>19:00 hrs</span>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <MapPin className="h-5 w-5 mr-2" />
            <span>Hotel Westin, Santa Fe CDMX</span>
          </div>
        </div>
      </div>
      
      {error && (
        <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Nombre completo
          </label>
          <input
            type="text"
            {...register('name')}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Email
          </label>
          <input
            type="email"
            {...register('email')}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Teléfono
          </label>
          <input
            type="tel"
            {...register('phone')}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Código de invitación (opcional)
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              {...register('inviteCode')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
              placeholder="Ingresa tu código"
            />
            <Button
              type="button"
              onClick={() => validateInviteCode(inviteCode || '')}
              disabled={!inviteCode || isValidatingCode}
              className="mt-1"
            >
              Validar
            </Button>
          </div>
          {codeStatus === 'valid' && (
            <p className="mt-1 text-sm text-green-600">Código válido - ¡Entrada gratuita!</p>
          )}
          {codeStatus === 'invalid' && (
            <p className="mt-1 text-sm text-red-600">Código inválido</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? 'Procesando...' : 'Reservar'}
        </Button>
      </form>
    </div>
  );
}
