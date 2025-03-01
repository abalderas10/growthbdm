'use client';

import { useState, useEffect } from 'react';
import { useGoogleAuth } from '@/lib/client/auth/google';
import { supabase } from '@/lib/supabase';
import { ContactForm } from '@/components/ContactForm';

export default function MeetingSetupPage() {
  const [isConfigured, setIsConfigured] = useState(false);
  const [loading, setLoading] = useState(true);
  const { session, status, initiateGoogleAuth } = useGoogleAuth();

  useEffect(() => {
    checkConfiguration();
  }, []);

  async function checkConfiguration() {
    try {
      const { data } = await supabase
        .from('google_calendar_tokens')
        .select('*')
        .single();
      
      setIsConfigured(!!data);
    } catch (error) {
      console.error('Error checking configuration:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleConnect() {
    try {
      await initiateGoogleAuth();
    } catch (error) {
      console.error('Error connecting to Google Calendar:', error);
    }
  }

  if (loading || status === 'loading') {
    return <div>Cargando...</div>;
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-4xl font-bold mb-8">Configuración de Calendario</h1>
        <p className="mb-4">Para agendar reuniones, necesitas conectar tu cuenta de Google Calendar.</p>
        <button
          onClick={() => initiateGoogleAuth()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Conectar Google Calendar
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Configuración de Google Calendar</h1>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="space-y-6">
          <div className="flex items-center">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
              isConfigured ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
            }`}>
              {isConfigured ? '✓' : '1'}
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium">Conectar con Google Calendar</h3>
              <p className="text-gray-500">
                {isConfigured 
                  ? 'Tu cuenta está conectada con Google Calendar'
                  : 'Conecta tu cuenta para sincronizar reuniones'}
              </p>
            </div>
          </div>

          {!isConfigured && (
            <button
              onClick={handleConnect}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Conectar con Google Calendar
            </button>
          )}

          {isConfigured && (
            <div className="rounded-md bg-green-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">
                    Configuración completada
                  </h3>
                  <div className="mt-2 text-sm text-green-700">
                    <p>
                      Tu calendario está conectado y listo para sincronizar reuniones.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Agenda una Reunión</h1>
        <ContactForm />
      </div>
    </div>
  );
}
