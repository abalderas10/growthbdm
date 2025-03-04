'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import SimpleMeetingScheduler from '@/components/Calendar/SimpleMeetingScheduler';
import { PriceCard } from '@/components/ui/price-card';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from "framer-motion"; // Corregido la importación de framer-motion

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const PRODUCTS = {
  TICKET_TO_PLAY: 'price_1Q74ZnP1CcAYKMEzMXMTtOQf',
  SUBSCRIPTION: 'price_1Q74ZnP1CcAYKMEzMXMTtOQf'
};

export default function ConstruyeAlianzas() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async (priceId: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Error al crear la sesión de checkout');
      }

      const { sessionId } = await response.json();
      
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Stripe no se inicializó correctamente');
      }

      const { error: stripeError } = await stripe.redirectToCheckout({ sessionId });
      
      if (stripeError) {
        throw stripeError;
      }
    } catch (err: any) {
      console.error('Error en el proceso de checkout:', err);
      setError(err.message || 'Ocurrió un error al procesar el pago');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0f172a] flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <section className="relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
              <div className="text-center max-w-4xl mx-auto">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
                  <span className="bg-gradient-to-r from-[#004b8d] via-[#0066cc] to-[#004b8d] dark:from-[#0066cc] dark:via-[#4d94ff] dark:to-[#0066cc] bg-clip-text text-transparent bg-300% animate-gradient">
                    AliEst
                  </span>
                  <br />
                  <span className="inline-block mt-2 text-3xl sm:text-4xl md:text-5xl text-gray-600/90 dark:text-gray-300">
                    en Alianza Estratégica con
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-[#004b8d] via-[#0066cc] to-[#004b8d] dark:from-[#0066cc] dark:via-[#4d94ff] dark:to-[#0066cc] bg-clip-text text-transparent bg-300% animate-gradient">
                    Growth Business Development
                  </span>
                </h1>
                
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="mt-10"
                >
                  <SimpleMeetingScheduler />
                </motion.div>
              </div>
            </div>
          </section>
        </div>

        {/* Value Proposition Section */}
        <section className="py-24 bg-white dark:bg-gray-800 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Primera columna */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#004b8d]/10 to-transparent rounded-3xl"></div>
                <div className="relative p-8 backdrop-blur-sm bg-white/30 dark:bg-gray-900/30 rounded-3xl border border-[#004b8d]/10 dark:border-white/5 shadow-xl">
                  <div className="mb-6">
                    <svg className="w-12 h-12 text-[#004b8d] dark:text-[#0066cc]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                  </div>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed"
                  >
                    Impulsamos el crecimiento empresarial mediante estrategias estructuradas de networking, alianzas estratégicas y desarrollo de negocios. Nuestro enfoque está orientado a la generación de conexiones estratégicas de alto valor, fortaleciendo relaciones comerciales sólidas y sostenibles en el tiempo.
                  </motion.p>
                </div>
              </motion.div>

              {/* Segunda columna */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-bl from-[#0066cc]/10 to-transparent rounded-3xl"></div>
                <div className="relative p-8 backdrop-blur-sm bg-white/30 dark:bg-gray-900/30 rounded-3xl border border-[#0066cc]/10 dark:border-white/5 shadow-xl">
                  <div className="mb-6">
                    <svg className="w-12 h-12 text-[#0066cc] dark:text-[#4d94ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                    </svg>
                  </div>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed"
                  >
                    Integramos expertise empresarial con tecnología avanzada, optimizando procesos comerciales y estratégicos para maximizar la eficiencia y potenciar el crecimiento de tu empresa en un entorno altamente competitivo.
                  </motion.p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <h2 className="text-3xl font-bold text-center mb-12 text-[#004b8d] dark:text-[#0066cc]">
              Planes de Membresía
            </h2>

            {error && (
              <div className="max-w-2xl mx-auto mb-8">
                <div className="bg-red-50 dark:bg-red-900/50 text-red-600 dark:text-red-200 p-4 rounded-lg">
                  {error}
                </div>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <PriceCard
                title="Growth Premium"
                price="$20,000 MXN"
                period="/mes"
                features={[
                  "Acceso a nuestra red de contactos estratégicos",
                  "Desarrollo de estrategias de crecimiento",
                  "Participación en eventos exclusivos",
                  "Asesoría personalizada",
                  "Herramientas de networking",
                  "Análisis de mercado",
                  "Soporte prioritario"
                ]}
                buttonText="Suscribirse Ahora"
                onSubscribe={() => handleCheckout(PRODUCTS.SUBSCRIPTION)}
                loading={loading}
                featured={true}
              />

              <PriceCard
                title="Growth Starter"
                price="$50,000 MXN"
                period="pago único"
                features={[
                  "Acceso inicial a la red de contactos",
                  "Evaluación de oportunidades de negocio",
                  "Participación en un evento",
                  "Sesión de asesoría inicial",
                  "Herramientas básicas de networking"
                ]}
                buttonText="Empezar Ahora"
                onSubscribe={() => handleCheckout(PRODUCTS.TICKET_TO_PLAY)}
                loading={loading}
              />
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-white dark:bg-gray-800 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <h2 className="text-3xl font-bold text-center mb-12 text-[#004b8d] dark:text-[#0066cc]">
              ¿Por qué elegir Growth Business Development?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="p-6 bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold mb-4 text-[#004b8d] dark:text-[#0066cc]">
                  Networking Estratégico
                </h3>
                <p className="text-gray-600 dark:text-gray-300">Conexiones de alto valor con decision makers y empresas líderes</p>
              </div>
              <div className="p-6 bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold mb-4 text-[#004b8d] dark:text-[#0066cc]">
                  Desarrollo de Negocios
                </h3>
                <p className="text-gray-600 dark:text-gray-300">Estrategias personalizadas para acelerar tu crecimiento empresarial</p>
              </div>
              <div className="p-6 bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold mb-4 text-[#004b8d] dark:text-[#0066cc]">
                  Eventos Exclusivos
                </h3>
                <p className="text-gray-600 dark:text-gray-300">Acceso a eventos y oportunidades únicas de networking</p>
              </div>
              <div className="p-6 bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold mb-4 text-[#004b8d] dark:text-[#0066cc]">
                  Asesoría Experta
                </h3>
                <p className="text-gray-600 dark:text-gray-300">Guía profesional para maximizar tus oportunidades de negocio</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900 relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
            <h2 className="text-3xl font-bold mb-8 text-[#004b8d] dark:text-[#0066cc]">
              Impulsa tu Crecimiento con Growth Business Development
            </h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-600 dark:text-gray-300 mb-12"
            >
              Da el siguiente paso en el desarrollo de tu negocio. Agenda una reunión con nuestro equipo y descubre cómo podemos ayudarte a alcanzar tus objetivos.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-10"
            >
              <SimpleMeetingScheduler />
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
