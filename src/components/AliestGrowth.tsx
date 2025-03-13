"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { useEffect } from "react";

export default function AliestGrowth() {
  // Efecto para cargar el script de Cal.com
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cal.com/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Función para abrir el widget de Cal.com
  const openCalModal = () => {
    // @ts-ignore - Cal está disponible globalmente después de cargar el script
    if (window.Cal) {
      window.Cal.ui.openModal({
        calLink: 'growthbdm/consulta-estrategica',
        config: {
          layout: 'month_view',
          hideEventTypeDetails: false,
          hideBranding: true,
        }
      });
    } else {
      console.error('Cal.com script not loaded');
      // Fallback - abrir en una nueva pestaña si el script no cargó
      window.open('https://cal.com/growthbdm/consulta-estrategica', '_blank');
    }
  };

  return (
    <section className="bg-white">
      {/* Efectos de fondo */}
      <div className="absolute inset-0 w-full bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>
      <div className="absolute right-0 w-1/3 h-full bg-gradient-to-l from-blue-500/10 to-transparent" />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Encabezado */}
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-gray-900">
                Construye Alianzas Estratégicas
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Únete a una red exclusiva de líderes en el sector inmobiliario y potencia tu crecimiento empresarial
            </p>
          </div>

          {/* Grid de beneficios */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-blue-600 mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Incrementa tus Oportunidades</h3>
              <p className="text-gray-600 dark:text-gray-300">Multiplica tus oportunidades comerciales con leads de alto valor</p>
            </div>

            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-blue-600 mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Posiciona Tu Marca</h3>
              <p className="text-gray-600 dark:text-gray-300">Fortalece tu presencia en eventos clave y medios especializados</p>
            </div>

            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-blue-600 mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fortalece Relaciones</h3>
              <p className="text-gray-600 dark:text-gray-300">Conecta con desarrolladores y tomadores de decisiones clave</p>
            </div>

            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-blue-600 mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Ofrece Ingenierías de Valor</h3>
              <p className="text-gray-600 dark:text-gray-300">Aporta soluciones innovadoras y genera sinergias</p>
            </div>
          </div>

          {/* Botón de llamada a la acción */}
          <div className="text-center">
            <Button 
              onClick={openCalModal}
              className="px-8 py-6 text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-full"
            >
              Agenda una consulta estratégica
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
