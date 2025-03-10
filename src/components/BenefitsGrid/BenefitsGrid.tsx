'use client';

import { motion } from 'framer-motion';

interface Benefit {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const benefits: Benefit[] = [
  {
    id: 'conexiones-alto-nivel',
    title: 'Conexiones de Alto Nivel',
    description: 'La interacción cara a cara facilita la creación de relaciones estratégicas con líderes del sector, inversionistas y empresarios clave, generando confianza y oportunidades de colaboración.',
    icon: '🔹'
  },
  {
    id: 'espacios-exclusivos',
    title: 'Espacios Exclusivos para Conversaciones Claves',
    description: 'Participa en encuentros diseñados para propiciar diálogos significativos, donde las ideas fluyen con mayor naturalidad y pueden traducirse en alianzas estratégicas.',
    icon: '🔹'
  },
  {
    id: 'oportunidades-tiempo-real',
    title: 'Oportunidades que Surgen en el Momento',
    description: 'El networking presencial permite detectar oportunidades de negocio en tiempo real, agilizando negociaciones y abriendo puertas a nuevas posibilidades de crecimiento.',
    icon: '🔹'
  },
  {
    id: 'visibilidad-empresa',
    title: 'Mayor Visibilidad para tu Empresa',
    description: 'Tu presencia en estos eventos refuerza el posicionamiento de tu marca en un entorno selecto, aumentando su reconocimiento dentro del sector.',
    icon: '🔹'
  },
  {
    id: 'experiencia-inmersiva',
    title: 'Experiencia Inmersiva y Enriquecedora',
    description: 'Más allá de las conexiones de negocio, estos encuentros ofrecen un ambiente inspirador, donde las conversaciones y el intercambio de ideas generan valor a largo plazo.',
    icon: '🔹'
  },
  {
    id: 'contenido-exclusivo',
    title: 'Acceso a Contenido y Perspectivas Exclusivas',
    description: 'Obten información de primera mano sobre tendencias del mercado, estrategias innovadoras y experiencias compartidas por referentes del sector.',
    icon: '🔹'
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const BenefitsGrid = () => {
  return (
    <section className="w-full py-24 bg-gradient-to-b from-background to-background/80">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Beneficios del Networking Presencial
          </h2>
          <p className="text-muted-foreground text-lg">
            Asistir en persona a nuestros eventos no solo amplía tu red de contactos, sino que te sitúa en el centro de las decisiones que impulsan el crecimiento del sector.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {benefits.map((benefit) => (
            <motion.div
              key={benefit.id}
              variants={item}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-primary/5 rounded-2xl transform transition-transform group-hover:scale-105 duration-300" />
              <div className="relative p-6 bg-card rounded-2xl border border-border/50 hover:border-border transition-colors duration-300">
                <span className="text-2xl mb-4 block">{benefit.icon}</span>
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BenefitsGrid;
