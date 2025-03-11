'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { SimpleMeetingScheduler } from "../../components/Calendar/SimpleMeetingScheduler";
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
    <Check className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section con gradiente y efecto de luz */}
        <section className="relative overflow-hidden py-20 bg-gradient-to-br from-background via-background to-primary/10">
          <div className="absolute inset-0 bg-grid-white/5" />
          <div className="container mx-auto px-4 relative">
            <motion.div 
              className="text-center max-w-4xl mx-auto"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <div className="mb-6">
                <h1 className="text-6xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground">
                  AliEst - Growth
                </h1>
                <p className="text-2xl md:text-3xl text-muted-foreground">
                  Plataforma de Desarrollo de Negocios Inmobiliarios
                </p>
              </div>
              <div className="w-full h-1 bg-gradient-to-r from-primary via-primary-foreground to-primary mx-auto max-w-md rounded-full mb-12" />
            </motion.div>
          </div>
        </section>

        {/* Descripción con diseño moderno */}
        <section className="py-20 bg-gradient-to-b from-background to-background/95">
          <motion.div
            className="container mx-auto px-4"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <div className="prose prose-lg dark:prose-invert mx-auto bg-card/50 backdrop-blur-sm p-12 rounded-2xl border border-primary/10 shadow-xl">
              <div className="grid gap-8">
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground mb-6">
                    Soluciones Integrales para el Sector Inmobiliario
                  </h2>
                  <div className="flex items-start gap-4 text-lg leading-relaxed">
                    <div className="flex-shrink-0 w-1 h-full bg-gradient-to-b from-primary to-primary-foreground rounded-full" />
                    <p>
                      AliEst, en alianza estratégica con Growth Business Development, ofrece una plataforma integral para la expansión y consolidación de empresas en el mercado mexicano. A través de estrategias de networking, alianzas estratégicas y desarrollo de negocios, facilitamos la entrada y operación eficiente de empresas en sectores clave, con un enfoque especializado en el sector inmobiliario.
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground mb-6">
                    Innovación y Tecnología
                  </h2>
                  <div className="flex items-start gap-4 text-lg leading-relaxed">
                    <div className="flex-shrink-0 w-1 h-full bg-gradient-to-b from-primary to-primary-foreground rounded-full" />
                    <p>
                      Nuestra propuesta combina <span className="text-primary font-semibold">softlanding empresarial</span>, 
                      <span className="text-primary font-semibold"> modelos de inteligencia artificial</span> con datos reales de mercado 
                      y <span className="text-primary font-semibold">herramientas de productividad</span>, diseñadas para optimizar 
                      procesos comerciales y estratégicos.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Pricing Section */}
        <section className="py-24 bg-gradient-to-b from-background/95 to-background relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/5" />
          <div className="container mx-auto px-4 relative">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground">
                Modelos de Suscripción
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
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
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary-foreground/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
                <div className="relative bg-card/50 backdrop-blur-sm p-8 rounded-2xl border border-primary/10 shadow-xl h-full flex flex-col">
                  <h3 className="text-2xl font-bold mb-4">AliEst Intro</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">Sin Costo</span>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Una sesión exclusiva diseñada para conocernos, explorar oportunidades y entender cómo podemos generar valor juntos en el mercado mexicano.
                  </p>
                  <div className="text-lg font-semibold mb-4">Incluye:</div>
                  <ul className="space-y-4 mb-8 flex-grow">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                      <span>Reunión de Presentación, donde conocerás el ecosistema de AliEst y Growth Business Development.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                      <span>Exploración de Proyectos y Oportunidades de Negocio, identificando sinergias estratégicas.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                      <span>Acceso a Información sobre el Mercado Inmobiliario en México, brindando un primer acercamiento al panorama de inversión y desarrollo.</span>
                    </li>
                  </ul>
                  <SimpleMeetingScheduler />
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
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary-foreground/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
                <div className="relative bg-card/50 backdrop-blur-sm p-8 rounded-2xl border border-primary/10 shadow-xl h-full flex flex-col">
                  <div className="absolute -top-3 right-4 bg-primary px-3 py-1 rounded-full text-sm font-medium text-primary-foreground">
                    Recomendado
                  </div>
                  <h3 className="text-2xl font-bold mb-4">AliEst Growth</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">$20,000</span>
                    <span className="text-muted-foreground"> MXN/mes</span>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Un plan integral diseñado para empresas que buscan expansión, posicionamiento estratégico y desarrollo de negocios en México dentro del sector inmobiliario.
                  </p>
                  <div className="text-lg font-semibold mb-4">Incluye:</div>
                  <ul className="space-y-4 mb-8 flex-grow">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                      <span>Estrategias de Expansión y Crecimiento diseñadas para maximizar oportunidades en el mercado.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                      <span>Fortalecimiento de Marca en el sector de desarrollo de negocios inmobiliarios.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                      <span>Plataforma de Business Development y Networking Estratégico, facilitando conexiones de alto nivel.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                      <span>Acceso Exclusivo a Eventos y Oportunidades de Negocio con actores clave de la industria.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                      <span>Publicación y Difusión en la Red de AliEst, aumentando visibilidad y reconocimiento.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                      <span>Alta en la Plataforma de Proveedores Estratégicos, integrándote a un ecosistema validado.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                      <span>Acceso a Inteligencia de Mercado con IA y Herramientas de Productividad, optimizando la toma de decisiones y eficiencia operativa.</span>
                    </li>
                  </ul>
                  <Button 
                    className="w-full bg-primary/10 hover:bg-primary/20 transition-colors"
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
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary-foreground/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
                <div className="relative bg-card/50 backdrop-blur-sm p-8 rounded-2xl border border-primary/10 shadow-xl h-full flex flex-col">
                  <h3 className="text-2xl font-bold mb-4">Ticket to Play</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">$50,000</span>
                    <span className="text-muted-foreground"> MXN/pago único</span>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Una solución diseñada para empresas que buscan validación inmediata y acceso directo a la red de negocios de AliEst.
                  </p>
                  <div className="text-lg font-semibold mb-4">Incluye:</div>
                  <ul className="space-y-4 mb-8 flex-grow">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                      <span>Alta y Validación en la Plataforma de Proveedores Estratégicos, asegurando credibilidad y confianza en el mercado.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                      <span>Acceso Directo a Networking y Relaciones Comerciales Clave, conectando con tomadores de decisiones.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                      <span>Publicación y Posicionamiento en la Red de AliEst y Growth Business Development, fortaleciendo la presencia de tu empresa.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                      <span>Acceso a Inteligencia de Mercado y Análisis Competitivo, brindando información clave para el crecimiento y la estrategia empresarial.</span>
                    </li>
                  </ul>
                  <p className="text-sm text-muted-foreground mb-6">
                    Este modelo permite a las empresas integrarse de manera ágil y efectiva en un entorno de negocios consolidado, acelerando su posicionamiento en el mercado inmobiliario.
                  </p>
                  <Button 
                    className="w-full bg-primary/10 hover:bg-primary/20 transition-colors"
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
        <section className="py-20 bg-gradient-to-b from-background to-background/95">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="container mx-auto px-4"
          >
            <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground">
              ¿Por qué formar parte de AliEst Growth?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary-foreground/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="relative p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-primary/10 transition-transform duration-500 group-hover:-translate-y-2">
                  <Globe className="h-8 w-8 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">Red Exclusiva</h3>
                  <p className="text-muted-foreground">Acceso a una red exclusiva de contactos estratégicos</p>
                </div>
              </div>
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary-foreground/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="relative p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-primary/10 transition-transform duration-500 group-hover:-translate-y-2">
                  <Brain className="h-8 w-8 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">Inteligencia de Mercado</h3>
                  <p className="text-muted-foreground">Optimización de estrategias comerciales con datos reales</p>
                </div>
              </div>
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary-foreground/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="relative p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-primary/10 transition-transform duration-500 group-hover:-translate-y-2">
                  <Zap className="h-8 w-8 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">Visibilidad</h3>
                  <p className="text-muted-foreground">Mayor visibilidad y posicionamiento en el sector inmobiliario</p>
                </div>
              </div>
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary-foreground/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="relative p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-primary/10 transition-transform duration-500 group-hover:-translate-y-2">
                  <Shield className="h-8 w-8 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">Toma de Decisiones</h3>
                  <p className="text-muted-foreground">Herramientas para decisiones basadas en datos reales</p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Contacto con diseño mejorado */}
        <section className="py-32 bg-gradient-to-b from-background/95 to-background relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/5" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
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
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary-foreground/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
              <div className="relative bg-card/50 backdrop-blur-sm p-12 rounded-2xl border border-primary/10 shadow-xl transition-transform duration-500 group-hover:-translate-y-2">
                <div className="text-center mb-12">
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground">
                    Únete a AliEst Growth y Expande tu Negocio
                  </h2>
                  <p className="text-xl text-muted-foreground">
                    Si estás listo para llevar tu empresa al siguiente nivel, agenda una reunión con nosotros y descubre cómo podemos ayudarte a crecer.
                  </p>
                </div>
                <SimpleMeetingScheduler />
              </div>
            </motion.div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
