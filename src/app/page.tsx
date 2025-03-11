"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Image from 'next/image';
import Link from 'next/link';
import ArrowRight from '@/components/icons/ArrowRight';
import AliestGrowth from '@/components/AliestGrowth';
import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { SimpleMeetingScheduler } from '@/components/Calendar/SimpleMeetingScheduler';

const Page = () => {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      const scrollPosition = window.scrollY;

      sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (scrollPosition >= sectionTop - sectionHeight / 3) {
          setActiveSection(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full overflow-x-hidden">
      <Header />
      <main className="w-full">
        {/* Hero Section */}
        <section className="w-full h-screen">
          <Hero />
          <button 
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 animate-bounce"
            type="button"
          >
            <ChevronDown className="w-8 h-8" />
          </button>
        </section>

        {/* Growth Business Developer Section */}
        <section className="w-full relative overflow-hidden py-20">
          {/* Fondo con gradiente y efecto de malla */}
          <div className="absolute inset-0 w-full bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
          </div>
          <div className="absolute right-0 w-1/3 h-full bg-gradient-to-l from-blue-500/10 to-transparent dark:from-blue-400/10" />
          
          <div className="container mx-auto px-4 py-16 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
              <div className="relative aspect-[4/3] w-full h-full">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-gray-900/20 rounded-xl blur-2xl" />
                <Image
                  src="/avo1.png"
                  alt="Growth Business Developer"
                  fill
                  className="object-contain relative"
                  priority
                />
              </div>
              <div className="space-y-6 relative">
                <div className="absolute -inset-4 bg-white/50 dark:bg-gray-800/50 rounded-2xl backdrop-blur-sm" />
                <div className="relative space-y-6 p-8">
                  <h2 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
                    Un Growth Business Developer
                  </h2>
                  <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                    Un Growth Business Developer es un profesional especializado en identificar y crear oportunidades de crecimiento para las empresas. Su rol abarca desde la planificación estratégica hasta la implementación de iniciativas que impulsan el desarrollo del negocio.
                  </p>
                  <blockquote className="border-l-4 border-blue-500 pl-4 my-8">
                    <p className="text-lg italic text-gray-700 dark:text-gray-300">"Vamos a crear estrategias en el sector el Inmobiliario."</p>
                    <footer className="mt-2 text-sm text-gray-600 dark:text-gray-400">- Adriana Vargas</footer>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Estrategias de Expansión Section */}
        <section className="w-full min-h-screen relative overflow-hidden">
          {/* Fondo con efecto de degradado y patrón */}
          <div className="absolute inset-0 w-full bg-gradient-to-br from-gray-900 to-blue-900">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:32px_32px]" />
          </div>
          
          {/* Efectos de fondo */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gray-900/20 rounded-full filter blur-3xl" />

          <div className="container mx-auto px-4 py-16 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
              <div className="space-y-8 order-2 lg:order-1">
                <div className="relative">
                  <div className="absolute -inset-4 bg-white/10 rounded-2xl backdrop-blur-sm" />
                  <div className="relative space-y-6 p-8">
                    <h2 className="text-4xl font-bold text-white sm:text-5xl">
                      Estrategias de{' '}
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-gray-300">
                        Expansión
                      </span>
                    </h2>
                    <p className="text-xl text-gray-300 leading-relaxed">
                      Desarrollamos estrategias personalizadas para impulsar el crecimiento de tu negocio, identificando oportunidades clave y estableciendo alianzas estratégicas que maximizan tu potencial en el mercado.
                    </p>
                    <div className="pt-4">
                      <Link 
                        href="/blog"
                        className="inline-flex items-center px-8 py-4 border-2 border-blue-400 text-lg font-medium rounded-full text-blue-400 hover:bg-blue-400/10 transition-colors duration-200"
                      >
                        Descubre Más
                        <ArrowRight className="ml-2 -mr-1 h-6 w-6" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative aspect-[4/3] w-full h-full order-1 lg:order-2">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-gray-900/20 rounded-xl blur-2xl" />
                <Image
                  src="/3.jpeg"
                  alt="Estrategias de Expansión"
                  fill
                  className="object-cover relative rounded-xl"
                  priority
                />
              </div>
            </div>

            {/* Grid de características */}
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-16">
                <div className="p-6 bg-white/10 rounded-xl backdrop-blur-sm">
                  <h3 className="text-xl font-semibold text-white mb-3">Incrementa tus Oportunidades</h3>
                  <p className="text-gray-300">Multiplica tus oportunidades comerciales con leads de alto valor</p>
                </div>
                <div className="p-6 bg-white/10 rounded-xl backdrop-blur-sm">
                  <h3 className="text-xl font-semibold text-white mb-3">Posiciona Tu Marca</h3>
                  <p className="text-gray-300">Fortalece tu presencia en eventos clave y medios especializados</p>
                </div>
                <div className="p-6 bg-white/10 rounded-xl backdrop-blur-sm">
                  <h3 className="text-xl font-semibold text-white mb-3">Fortalece Relaciones</h3>
                  <p className="text-gray-300">Conecta con desarrolladores y tomadores de decisiones clave</p>
                </div>
                <div className="p-6 bg-white/10 rounded-xl backdrop-blur-sm">
                  <h3 className="text-xl font-semibold text-white mb-3">Ofrece Ingenierías de Valor</h3>
                  <p className="text-gray-300">Aporta soluciones innovadoras y genera sinergias</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Growth Intelligence Section */}
        <section className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 relative">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="container mx-auto px-4 py-16 relative z-10">
            <AliestGrowth />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Page;
