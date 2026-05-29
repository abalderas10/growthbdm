"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Building2, Globe, Users, Wrench } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.13 } },
};

const STATS = [
  { value: '#1', label: 'Destino nearshoring en América' },
  { value: 'T-MEC', label: 'Acceso preferencial a USA y Canadá' },
  { value: '130M', label: 'Consumidores en el mercado mexicano' },
  { value: '4ª', label: 'Economía de Latinoamérica' },
];

const PILLARS = [
  { icon: Building2, label: 'Real Estate', href: '/real-estate', desc: 'Terrenos y activos off market' },
  { icon: Globe,     label: 'Inversión',   href: '/invierte-en-mexico', desc: 'Entra al mercado mexicano' },
  { icon: Users,     label: 'Networking',  href: '/networking', desc: 'Eventos y contactos clave' },
  { icon: Wrench,    label: 'Consultoría', href: '/invierte-en-mexico', desc: 'Proveedores y estrategia' },
];

export default function Hero() {
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden pt-[80px]">

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50 to-slate-100 dark:from-gray-950 dark:via-blue-950 dark:to-slate-900" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:32px_32px]" />
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-blue-400/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-slate-500/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 py-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-600/20 rounded-full px-4 py-1.5 text-sm text-blue-700 dark:text-blue-300 mb-8 font-medium">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            México · Business Development · Real Estate
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.05] tracking-tight"
          >
            <span className="text-gray-900 dark:text-white">Tu puerta de entrada</span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-400 dark:to-blue-300">
              a los negocios en México
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeUp}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed max-w-3xl mx-auto"
          >
            Growth BDM conecta capital, ideas, empresas y personas.
            Estrategia, Real Estate e inversión para quienes quieren crecer — o aterrizar — en México.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <Link
              href="/invierte-en-mexico"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors duration-200 shadow-lg shadow-blue-600/25"
            >
              Quiero invertir en México
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="/real-estate"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/40 hover:bg-blue-100 dark:hover:bg-blue-900/60 rounded-xl border border-blue-200 dark:border-blue-800 transition-colors duration-200"
            >
              Ver oportunidades inmobiliarias
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-20"
          >
            {STATS.map((s) => (
              <motion.div
                key={s.value}
                variants={fadeUp}
                className="bg-white/70 dark:bg-gray-900/60 backdrop-blur-sm border border-gray-200/80 dark:border-gray-700/60 rounded-2xl px-4 py-5 text-center"
              >
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">{s.value}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 leading-tight">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* 4 Pillars */}
          <motion.div variants={stagger} className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
            {PILLARS.map((p) => (
              <motion.div key={p.label} variants={fadeUp}>
                <Link
                  href={p.href}
                  className="flex flex-col items-center gap-2 bg-white/80 dark:bg-gray-900/60 backdrop-blur-sm border border-gray-200/80 dark:border-gray-700/60 rounded-2xl px-4 py-5 text-center hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md transition-all duration-200 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center group-hover:bg-blue-100 dark:group-hover:bg-blue-900 transition-colors">
                    <p.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">{p.label}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{p.desc}</div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
