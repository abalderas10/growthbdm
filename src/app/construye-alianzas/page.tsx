'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { SimpleMeetingScheduler } from "../../components/Calendar/SimpleMeetingScheduler";
import { PriceCard } from "../../components/ui/price-card";
import { Button } from "../../components/ui/button";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ContactForm from "../../components/ContactForm";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function ConstruyeAlianzas() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <section className="text-center mb-16">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            Construye Alianzas Estratégicas
          </motion.h1>
          <motion.p 
            className="text-xl text-muted-foreground mb-8"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
          >
            Potencia tu negocio a través de alianzas estratégicas
          </motion.p>
          
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <SimpleMeetingScheduler />
            <ContactForm />
          </div>
        </section>

        <section ref={ref} className="py-16">
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeInUp}
            transition={{ delay: 0.3 }}
            className="grid md:grid-cols-3 gap-8"
          >
            <PriceCard
              title="Consultoría Básica"
              price="Gratuita"
              description="Primera sesión de consultoría para conocer tu negocio"
              features={[
                "Evaluación inicial",
                "Identificación de oportunidades",
                "Recomendaciones básicas"
              ]}
            />
            <PriceCard
              title="Desarrollo de Alianzas"
              price="Personalizado"
              description="Plan completo de desarrollo de alianzas"
              features={[
                "Estrategia personalizada",
                "Identificación de partners",
                "Gestión de relaciones",
                "Seguimiento continuo"
              ]}
              highlighted
            />
            <PriceCard
              title="Consultoría Avanzada"
              price="Por proyecto"
              description="Soluciones integrales para tu negocio"
              features={[
                "Análisis profundo",
                "Plan estratégico",
                "Implementación",
                "Medición de resultados"
              ]}
            />
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
