'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Button } from "../../components/ui/button";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ContactForm from "../../components/ContactForm";
import { Check, Zap, Globe, Shield, Brain } from "lucide-react";
import { CheckCircle2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Configuración de Stripe
const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY 
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null;

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const FeatureItem = ({ text }: { text: string }) => (
  <motion.li 
    variants={fadeInUp}
    className="flex items-start gap-2 mb-2"
  >
    <Check className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
    <span>{text}</span>
  </motion.li>
);

export default function ConstruyeAlianzas() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleCheckout = async (priceId: string, productId: string, mode: 'payment' | 'subscription') => {
    try {
      setIsLoading(true);
      const stripe = await stripePromise;
      if (!stripe) {
        console.error('Error: Stripe no está inicializado. Verifica NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY');
        throw new Error('Error al inicializar Stripe');
      }

      console.log('Iniciando checkout con:', { priceId, productId, mode });
      
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          productId,
          quantity: 1,
          mode,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        console.error('Error en la respuesta del servidor:', data);
        throw new Error(data.error || 'Error al crear la sesión de checkout');
      }

      if (!data.sessionId) {
        console.error('Respuesta inválida del servidor:', data);
        throw new Error('Respuesta inválida del servidor');
      }

      console.log('Redirigiendo a checkout con sessionId:', data.sessionId);
      
      const { error } = await stripe.redirectToCheckout({
        sessionId: data.sessionId
      });

      if (error) {
        console.error('Error en redirectToCheckout:', error);
        throw new Error(error.message);
      }
    } catch (error) {
      console.error('Error detallado al procesar el pago:', error);
      toast({
        title: "Error en el Proceso de Pago",
        description: error instanceof Error ? error.message : "Hubo un problema al procesar tu solicitud. Por favor, intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubscription = () => handleCheckout(
    'price_1QwDX6P1CcAYKMEzAHOPsdSD',
    'prod_RptJzpgYz5FXOe',
    'subscription'
  );

  const handleTicketPurchase = () => handleCheckout(
    'price_1QyljqP1CcAYKMEzKHVCsimR',
    'prod_RsWnCXR23J6v7x',
    'payment'
  );

  const handleCalMeeting = () => {
    // Implementar la lógica para agendar una reunión
  };

  return (
    <div className="min-h-screen bg-blue-950">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative h-[80vh] flex items-center bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800/20 overflow-hidden">
          <div className="absolute inset-0 bg-grid-blue-950/10" />
          <div className="container mx-auto px-4 relative">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-6xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-200">
                Construye Alianzas Estratégicas
              </h1>
              <div className="w-full h-1 bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200 mx-auto max-w-md rounded-full mb-12" />
              <p className="text-xl text-blue-200/80">
                Conectamos tu empresa con las oportunidades clave del sector inmobiliario
              </p>
            </motion.div>
          </div>
        </section>

        {/* Sección de contenido unificado */}
        <motion.section 
          className="py-24 bg-blue-900/20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12">
              <motion.div 
                className="bg-blue-900/20 backdrop-blur-sm p-8 rounded-2xl border border-blue-800/30 shadow-xl"
                variants={fadeInUp}
              >
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-300 mb-6">
                  Nuestra Metodología
                </h2>
                <div className="space-y-4 text-blue-200/80">
                  <p>• Análisis de mercado con IA predictiva</p>
                  <p>• Modelos de simulación 3D para proyectos</p>
                  <p>• Plataforma colaborativa en tiempo real</p>
                </div>
              </motion.div>

              <motion.div 
                className="bg-blue-900/20 backdrop-blur-sm p-8 rounded-2xl border border-blue-800/30 shadow-xl"
                variants={fadeInUp}
              >
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-300 mb-6">
                  Beneficios Clave
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Zap className="h-6 w-6 text-blue-400 flex-shrink-0" />
                    <p className="text-blue-200/80">Reducción de tiempos de implementación en un 40%</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="h-6 w-6 text-blue-400 flex-shrink-0" />
                    <p className="text-blue-200/80">Protección de datos con cifrado AES-256</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Pricing Section */}
        <section className="py-24 bg-blue-900/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-blue-950/10" />
          <div className="container mx-auto px-4 relative">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-200">
                Modelos de Suscripción
              </h2>
              <p className="text-xl text-blue-200/80 max-w-3xl mx-auto">
                Selecciona el modelo que mejor se adapte a tus necesidades y comienza tu camino hacia el crecimiento empresarial en el sector inmobiliario.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
            >
              {/* Free Plan */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-blue-200/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
                <div className="relative bg-blue-900/20 backdrop-blur-sm p-8 rounded-2xl border border-blue-800/30 shadow-xl h-full flex flex-col">
                  <h3 className="text-2xl font-bold mb-4">AliEst Intro</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">Sin Costo</span>
                  </div>
                  <p className="text-blue-200/80 mb-6">
                    Una sesión exclusiva diseñada para conocernos, explorar oportunidades y entender cómo podemos generar valor juntos en el mercado mexicano.
                  </p>
                  <div className="text-lg font-semibold mb-4">Incluye:</div>
                  <ul className="space-y-4 mb-8 flex-grow">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-blue-400 flex-shrink-0 mt-1" />
                      <span>Reunión de Presentación, donde conocerás el ecosistema de AliEst y Growth Business Development.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-blue-400 flex-shrink-0 mt-1" />
                      <span>Exploración de Proyectos y Oportunidades de Negocio, identificando sinergias estratégicas.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-blue-400 flex-shrink-0 mt-1" />
                      <span>Acceso a Información sobre el Mercado Inmobiliario en México, brindando un primer acercamiento al panorama de inversión y desarrollo.</span>
                    </li>
                  </ul>
                  <Button 
                    onClick={handleCalMeeting}
                    className="w-full bg-blue-400/10 hover:bg-blue-400/20 transition-colors"
                  >
                    Agendar Reunión Introductoria
                  </Button>
                </div>
              </motion.div>

              {/* AliEst Growth Plan */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { delay: 0.1 } }
                }}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-blue-200/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
                <div className="relative bg-blue-900/20 backdrop-blur-sm p-8 rounded-2xl border border-blue-800/30 shadow-xl h-full flex flex-col">
                  <div className="absolute -top-3 right-4 bg-blue-400 px-3 py-1 rounded-full text-sm font-medium text-blue-200">
                    Recomendado
                  </div>
                  <h3 className="text-2xl font-bold mb-4">AliEst Growth</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">$20,000</span>
                    <span className="text-blue-200/80"> MXN/mes</span>
                  </div>
                  <p className="text-blue-200/80 mb-6">
                    Un plan integral diseñado para empresas que buscan expansión, posicionamiento estratégico y desarrollo de negocios en México dentro del sector inmobiliario.
                  </p>
                  <div className="text-lg font-semibold mb-4">Incluye:</div>
                  <ul className="space-y-4 mb-8 flex-grow">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-blue-400 flex-shrink-0 mt-1" />
                      <span>Estrategias de Expansión y Crecimiento diseñadas para maximizar oportunidades en el mercado.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-blue-400 flex-shrink-0 mt-1" />
                      <span>Fortalecimiento de Marca en el sector de desarrollo de negocios inmobiliarios.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-blue-400 flex-shrink-0 mt-1" />
                      <span>Plataforma de Business Development y Networking Estratégico, facilitando conexiones de alto nivel.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-blue-400 flex-shrink-0 mt-1" />
                      <span>Acceso Exclusivo a Eventos y Oportunidades de Negocio con actores clave de la industria.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-blue-400 flex-shrink-0 mt-1" />
                      <span>Publicación y Difusión en la Red de AliEst, aumentando visibilidad y reconocimiento.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-blue-400 flex-shrink-0 mt-1" />
                      <span>Alta en la Plataforma de Proveedores Estratégicos, integrándote a un ecosistema validado.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-blue-400 flex-shrink-0 mt-1" />
                      <span>Acceso a Inteligencia de Mercado con IA y Herramientas de Productividad, optimizando la toma de decisiones y eficiencia operativa.</span>
                    </li>
                  </ul>
                  <Button 
                    className="w-full bg-blue-400/10 hover:bg-blue-400/20 transition-colors"
                    onClick={handleSubscription}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Procesando...' : 'Suscribirse'}
                  </Button>
                </div>
              </motion.div>

              {/* Ticket to Play Plan */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { delay: 0.2 } }
                }}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-blue-200/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
                <div className="relative bg-blue-900/20 backdrop-blur-sm p-8 rounded-2xl border border-blue-800/30 shadow-xl h-full flex flex-col">
                  <h3 className="text-2xl font-bold mb-4">Ticket to Play</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">$50,000</span>
                    <span className="text-blue-200/80"> MXN/pago único</span>
                  </div>
                  <p className="text-blue-200/80 mb-6">
                    Una solución diseñada para empresas que buscan validación inmediata y acceso directo a la red de negocios de AliEst.
                  </p>
                  <div className="text-lg font-semibold mb-4">Incluye:</div>
                  <ul className="space-y-4 mb-8 flex-grow">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-blue-400 flex-shrink-0 mt-1" />
                      <span>Alta y Validación en la Plataforma de Proveedores Estratégicos, asegurando credibilidad y confianza en el mercado.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-blue-400 flex-shrink-0 mt-1" />
                      <span>Acceso Directo a Networking y Relaciones Comerciales Clave, conectando con tomadores de decisiones.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-blue-400 flex-shrink-0 mt-1" />
                      <span>Publicación y Posicionamiento en la Red de AliEst y Growth Business Development, fortaleciendo la presencia de tu empresa.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-blue-400 flex-shrink-0 mt-1" />
                      <span>Acceso a Inteligencia de Mercado y Análisis Competitivo, brindando información clave para el crecimiento y la estrategia empresarial.</span>
                    </li>
                  </ul>
                  <p className="text-sm text-blue-200/80 mb-6">
                    Este modelo permite a las empresas integrarse de manera ágil y efectiva en un entorno de negocios consolidado, acelerando su posicionamiento en el mercado inmobiliario.
                  </p>
                  <Button 
                    className="w-full bg-blue-400/10 hover:bg-blue-400/20 transition-colors"
                    onClick={handleTicketPurchase}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Procesando...' : 'Comprar Ahora'}
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Por qué elegirnos con iconos y diseño mejorado */}
        <section className="py-20 bg-blue-900/20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="container mx-auto px-4"
          >
            <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-200">
              ¿Por qué formar parte de AliEst Growth?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-blue-200/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="relative p-8 rounded-2xl bg-blue-900/20 backdrop-blur-sm border border-blue-800/30 transition-transform duration-500 group-hover:-translate-y-2">
                  <Globe className="h-8 w-8 text-blue-400 mb-4" />
                  <h3 className="font-semibold mb-2">Red Exclusiva</h3>
                  <p className="text-blue-200/80">Acceso a una red exclusiva de contactos estratégicos</p>
                </div>
              </div>
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-blue-200/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="relative p-8 rounded-2xl bg-blue-900/20 backdrop-blur-sm border border-blue-800/30 transition-transform duration-500 group-hover:-translate-y-2">
                  <Brain className="h-8 w-8 text-blue-400 mb-4" />
                  <h3 className="font-semibold mb-2">Inteligencia de Mercado</h3>
                  <p className="text-blue-200/80">Optimización de estrategias comerciales con datos reales</p>
                </div>
              </div>
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-blue-200/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="relative p-8 rounded-2xl bg-blue-900/20 backdrop-blur-sm border border-blue-800/30 transition-transform duration-500 group-hover:-translate-y-2">
                  <Zap className="h-8 w-8 text-blue-400 mb-4" />
                  <h3 className="font-semibold mb-2">Visibilidad</h3>
                  <p className="text-blue-200/80">Mayor visibilidad y posicionamiento en el sector inmobiliario</p>
                </div>
              </div>
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-blue-200/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="relative p-8 rounded-2xl bg-blue-900/20 backdrop-blur-sm border border-blue-800/30 transition-transform duration-500 group-hover:-translate-y-2">
                  <Shield className="h-8 w-8 text-blue-400 mb-4" />
                  <h3 className="font-semibold mb-2">Toma de Decisiones</h3>
                  <p className="text-blue-200/80">Herramientas para decisiones basadas en datos reales</p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Contacto con diseño mejorado */}
        <section className="py-32 bg-blue-900/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-blue-950/10" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-400/5 to-transparent" />
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="container mx-auto px-4 relative"
          >
            <motion.div 
              variants={fadeInUp}
              className="relative group max-w-3xl mx-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-blue-200/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
              <div className="relative bg-blue-900/20 backdrop-blur-sm p-12 rounded-2xl border border-blue-800/30 shadow-xl transition-transform duration-500 group-hover:-translate-y-2">
                <div className="text-center mb-12">
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-200">
                    Únete a AliEst Growth y Expande tu Negocio
                  </h2>
                  <p className="text-xl text-blue-200/80">
                    Si estás listo para llevar tu empresa al siguiente nivel, agenda una reunión con nosotros y descubre cómo podemos ayudarte a crecer.
                  </p>
                </div>
                <Button
                  onClick={handleCalMeeting}
                  className="px-8 py-6 text-lg bg-blue-400 hover:bg-blue-400/90 text-white rounded-full"
                >
                  Programar Consulta Estratégica
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
