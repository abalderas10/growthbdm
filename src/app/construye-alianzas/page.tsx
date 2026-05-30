'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Button } from "../../components/ui/button";
import { motion } from "framer-motion";
import { useToast } from "../../components/ui/use-toast";
import { Dialog, DialogContent, DialogTitle } from "../../components/ui/dialog";
import {
  CheckCircle2, ArrowRight, Star, Users, Zap,
  Globe, Calendar, Handshake, TrendingUp,
  Building2, MessageSquare, BarChart3, Megaphone,
} from "lucide-react";
import Link from 'next/link';

export const dynamic = 'force-dynamic';

const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null;

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};
const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.11 } },
};

/* ── AUDIENCIAS ─────────────────────────────────── */
const AUDIENCES = [
  {
    flag: '🌎',
    title: 'Extranjeros que quieren expandir a México',
    desc: 'Tienes capital, modelo de negocio probado y quieres entrar al mercado mexicano. Necesitas un socio local que te guíe en lo legal, fiscal, comercial y operativo — y que te abra las puertas correctas desde el día uno.',
    journey: ['Growth Intro', 'Growth Alliance', 'Ticket to Play'],
  },
  {
    flag: '🇲🇽',
    title: 'Empresarios mexicanos que quieren crecer',
    desc: 'Ya operas en México. Quieres expandir, encontrar socios estratégicos, entrar a nuevos sectores o consolidar tu posicionamiento. El valor de Growth BDM es su extensa red de contactos y la capacidad de abrirte puertas reales.',
    journey: ['Growth Intro', 'Growth Alliance', 'Ticket to Play'],
  },
];

/* ── PLANS ──────────────────────────────────────── */
const PLANS = [
  {
    id: 'intro',
    name: 'Growth Intro',
    tag: 'Punto de entrada',
    price: 'Sin costo',
    priceSub: 'Primera consultoría gratuita',
    badge: null,
    featured: false,
    description:
      'Cuéntanos a qué te dedicas y cómo quieres crecer en México. Nosotros te mostramos el potencial real, la red de contactos que tenemos y cómo podemos construir juntos.',
    includes: [
      'Consultoría inicial de ~60 minutos sin costo',
      'Diagnóstico de tu oportunidad en el mercado mexicano',
      'Presentación de la red de contactos de Growth BDM',
      'Identificación de tu sector y estrategia de entrada',
      'Plan de expansión preliminar personalizado',
      'Conexión con el perfil de Growth Alliance si aplica',
    ],
    cta: 'Agendar consultoría gratuita',
    ctaType: 'cal' as const,
    icon: Star,
    color: 'gray',
  },
  {
    id: 'alliance',
    name: 'Growth Alliance',
    tag: 'Servicio on demand · 6 meses',
    price: '$12,000',
    priceSub: 'MXN / mes + $35,000 pago inicial',
    badge: 'Más popular',
    featured: true,
    description:
      'Acompañamiento continuo durante 6 meses. Te presentamos a las personas correctas, acercamos proyectos y ventas según tu industria, y construimos tu posicionamiento en México paso a paso.',
    includes: [
      'Estrategia de entrada al mercado mexicano',
      'Estrategia de comunicación y posicionamiento de marca',
      'Estrategia LinkedIn: perfil, contenido y alcance',
      'Acercamiento mensual a contactos y tomadores de decisión',
      'Presentaciones a personas y empresas clave de tu sector',
      'Acceso a la extensa red de contactos de Growth BDM',
      'Identificación activa de proyectos y oportunidades de venta',
      'Revisión mensual de resultados y ajuste de estrategia',
    ],
    cta: 'Iniciar Growth Alliance',
    ctaType: 'stripe-sub' as const,
    icon: TrendingUp,
    color: 'blue',
  },
  {
    id: 'ticket',
    name: 'Ticket to Play',
    tag: 'Entrada inmediata · Evento dedicado',
    price: 'A convenir',
    priceSub: 'Diseñado a medida de tu empresa',
    badge: null,
    featured: false,
    description:
      'Exposure total en un evento de networking diseñado específicamente para ti. Curado, organizado y ejecutado por Growth BDM — tú en el centro de la conversación con los actores más importantes de tu sector.',
    includes: [
      'Evento de networking dedicado a tu empresa',
      'Selección y curación de asistentes clave de tu sector',
      'Presentación protagónica ante top decisores e inversionistas',
      'Invitación a exponentes y socios estratégicos relevantes',
      'Cobertura y difusión del evento en LinkedIn y red Growth BDM',
      'Seguimiento personalizado con cada contacto post-evento',
    ],
    cta: 'Diseñar mi evento',
    ctaType: 'stripe-ticket' as const,
    icon: Megaphone,
    color: 'purple',
  },
];

/* ── WHY ─────────────────────────────────────────── */
const WHY = [
  { icon: Globe,        title: 'Red extensa y validada',          desc: 'Acceso directo a inversionistas, desarrolladores, gobierno y tomadores de decisión en México. No son contactos fríos — son relaciones activas.' },
  { icon: Handshake,    title: 'Acompañamiento real',             desc: 'No recibes un manual ni un plan en PDF. Growth BDM actúa contigo: negocia, presenta, conecta y hace seguimiento.' },
  { icon: BarChart3,    title: 'Estrategia + ejecución',          desc: 'Muchos consultores dan estrategia. Nosotros también ejecutamos: LinkedIn, posicionamiento, eventos y presentaciones.' },
  { icon: Building2,    title: 'Conocimiento local profundo',     desc: 'Conocemos el mercado mexicano con profundidad. Te ahorramos errores costosos y atajos que solo se aprenden con años de operación local.' },
  { icon: MessageSquare,'title': 'Comunicación directa',         desc: 'Sin intermediarios ni capas de cuenta. Hablas directamente con el equipo que trabaja en tu proyecto.' },
  { icon: Zap,          title: 'Resultados medibles',             desc: 'Cada mes revisamos resultados juntos: contactos realizados, presentaciones generadas, oportunidades activas.' },
];

const HOW_STEPS = [
  { n: '01', title: 'Growth Intro', desc: 'Primera consultoría sin costo. Entendemos tu negocio, objetivos y cómo encajas en el mercado mexicano. Definimos la estrategia base.' },
  { n: '02', title: 'Arranque de Growth Alliance', desc: 'Pago inicial de $35,000 MXN. Diseñamos en detalle la estrategia de entrada, comunicación y LinkedIn. Primer batch de contactos identificados.' },
  { n: '03', title: 'Ejecución mensual', desc: 'Durante 6 meses: presentaciones a contactos clave, seguimiento de oportunidades, ajuste de estrategia y revisión mensual de resultados.' },
  { n: '04', title: 'Crecimiento sostenido', desc: 'Al cierre del plan, tienes una red activa en México, posicionamiento construido y oportunidades de negocio reales en curso.' },
];

export default function ConstruyeAlianzas() {
  const [isLoading, setIsLoading] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const { toast } = useToast();

  const handleCheckout = async (priceId: string, productId: string, mode: 'payment' | 'subscription') => {
    try {
      setIsLoading(true);
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Error al inicializar Stripe');
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId, productId, quantity: 1, mode }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Error al crear la sesión de checkout');
      if (data.url) {
        window.location.href = data.url;
      } else if (data.sessionId) {
        const { error } = await stripe.redirectToCheckout({ sessionId: data.sessionId });
        if (error) throw new Error(error.message);
      }
    } catch (error) {
      toast({
        title: 'Error en el proceso de pago',
        description: error instanceof Error ? error.message : 'Por favor intenta de nuevo.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCta = (type: 'cal' | 'stripe-sub' | 'stripe-ticket') => {
    if (type === 'cal') { setShowCalendar(true); return; }
    if (type === 'stripe-sub') { handleCheckout('price_1RwEitP1CcAYKMEz1taohzys', 'prod_RptJzpgYz5FXOe', 'subscription'); return; }
    if (type === 'stripe-ticket') { handleCheckout('price_1QyljqP1CcAYKMEzKHVCsimR', 'prod_RsWnCXR23J6v7x', 'payment'); return; }
  };

  const colorMap: Record<string, { icon: string; badge: string; border: string; bg: string }> = {
    gray:   { icon: 'bg-gray-100  dark:bg-gray-800  text-gray-600   dark:text-gray-300',   badge: '', border: 'border-gray-200  dark:border-gray-700',  bg: 'bg-white        dark:bg-gray-950'  },
    blue:   { icon: 'bg-blue-50   dark:bg-blue-950  text-blue-600   dark:text-blue-400',   badge: 'bg-blue-600 text-white', border: 'border-blue-400  dark:border-blue-500',  bg: 'bg-white        dark:bg-gray-950'  },
    purple: { icon: 'bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400', badge: '', border: 'border-gray-200  dark:border-gray-700',  bg: 'bg-white        dark:bg-gray-950'  },
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />

      {/* ── HERO ─────────────────────────────────────── */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff07_1px,transparent_1px),linear-gradient(to_bottom,#ffffff07_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 dark:from-gray-950 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-3xl mx-auto text-center">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 text-sm text-blue-200 mb-6">
              <Star className="h-3.5 w-3.5" /> Para nacionales y extranjeros
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Construye alianzas<br className="hidden md:block" /> estratégicas con Growth BDM
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl text-blue-100/80 mb-10 leading-relaxed">
              Conectamos tu empresa con las oportunidades clave del sector — a través de una red validada, inteligencia de mercado y acceso exclusivo a los actores estratégicos en México.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-center">
              <button onClick={() => setShowCalendar(true)} className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-blue-900 bg-white hover:bg-blue-50 rounded-xl transition-colors shadow-lg">
                Consultoría gratuita <ArrowRight className="ml-2 h-4 w-4" />
              </button>
              <a href="#planes" className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white border border-white/25 hover:bg-white/10 rounded-xl transition-colors">
                Ver planes
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── AUDIENCIAS ───────────────────────────────── */}
      <section className="py-16 bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={stagger}>
            <motion.div variants={fadeUp} className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">¿Para quién es Growth BDM?</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">Dos perfiles distintos, un mismo resultado: crecimiento real en México.</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {AUDIENCES.map((a) => (
                <motion.div key={a.title} variants={fadeUp} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-7">
                  <div className="text-3xl mb-4">{a.flag}</div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-base">{a.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-5">{a.desc}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    {a.journey.map((step, i) => (
                      <div key={step} className="flex items-center gap-2">
                        <span className="text-xs font-medium bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-900 rounded-full px-3 py-1">{step}</span>
                        {i < a.journey.length - 1 && <ArrowRight className="h-3 w-3 text-gray-400" />}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PLANES ───────────────────────────────────── */}
      <section id="planes" className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={stagger}>
            <motion.div variants={fadeUp} className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Elige tu plan</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Desde tu primera conversación hasta un evento de networking dedicado — tenemos el nivel de acompañamiento correcto para cada etapa.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {PLANS.map((plan) => {
                const c = colorMap[plan.color];
                return (
                  <motion.div
                    key={plan.id}
                    variants={fadeUp}
                    className={`relative flex flex-col rounded-3xl border-2 ${c.border} ${c.bg} overflow-hidden ${plan.featured ? 'shadow-2xl shadow-blue-500/10 ring-2 ring-blue-400/30' : 'shadow-sm'}`}
                  >
                    {plan.badge && (
                      <div className={`absolute top-0 left-0 right-0 py-1.5 text-center text-xs font-semibold ${c.badge}`}>
                        {plan.badge}
                      </div>
                    )}
                    <div className={`p-8 ${plan.badge ? 'pt-9' : ''}`}>
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${c.icon}`}>
                        <plan.icon className="h-5 w-5" />
                      </div>
                      <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">{plan.tag}</div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                      <div className="mb-1">
                        <span className="text-3xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-5">{plan.priceSub}</div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6 border-t border-gray-100 dark:border-gray-800 pt-5">{plan.description}</p>
                      <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">Incluye</div>
                      <ul className="space-y-3 mb-8 flex-1">
                        {plan.includes.map((item) => (
                          <li key={item} className="flex items-start gap-2.5 text-sm text-gray-700 dark:text-gray-300">
                            <CheckCircle2 className={`h-4 w-4 mt-0.5 shrink-0 ${plan.featured ? 'text-blue-500' : 'text-gray-400 dark:text-gray-500'}`} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="px-8 pb-8 mt-auto">
                      <Button
                        onClick={() => handleCta(plan.ctaType)}
                        disabled={isLoading}
                        className={`w-full h-12 font-semibold rounded-xl text-sm ${
                          plan.featured
                            ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20'
                            : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white'
                        }`}
                      >
                        {isLoading ? 'Procesando…' : plan.cta}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Nota clarificadora de precios */}
            <motion.div variants={fadeUp} className="max-w-3xl mx-auto mt-8 bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900 rounded-2xl p-5 text-sm text-blue-800 dark:text-blue-300 leading-relaxed text-center">
              Growth Alliance: <strong>$35,000 MXN pago inicial</strong> + <strong>$12,000 MXN/mes durante 6 meses</strong>. Al término del plan tienes una red activa, posicionamiento construido y oportunidades en curso. · Ticket to Play: cotización personalizada según el tipo de evento y sector.
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── CÓMO FUNCIONA ────────────────────────────── */}
      <section className="py-20 bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={stagger} className="max-w-3xl mx-auto">
            <motion.div variants={fadeUp} className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Cómo funciona</h2>
              <p className="text-gray-600 dark:text-gray-400">El camino desde la primera conversación hasta resultados reales.</p>
            </motion.div>
            <div className="space-y-5">
              {HOW_STEPS.map((step) => (
                <motion.div key={step.n} variants={fadeUp} className="flex gap-5 items-start">
                  <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white font-bold text-lg flex items-center justify-center shrink-0">
                    {step.n}
                  </div>
                  <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1.5">{step.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── POR QUÉ GROWTH BDM ───────────────────────── */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={stagger}>
            <motion.div variants={fadeUp} className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">¿Por qué Growth Alliance?</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">El mayor activo de Growth BDM es su extensa y activa red de contactos en México — y ahora puede ser tuya.</p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
              {WHY.map((item) => (
                <motion.div key={item.title} variants={fadeUp} className="bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center mb-4">
                    <item.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">{item.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA FINAL ────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-br from-blue-950 to-blue-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger} className="max-w-2xl mx-auto text-center">
            <motion.div variants={fadeUp}>
              <Calendar className="h-10 w-10 text-blue-300 mx-auto mb-5" />
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Empieza con una conversación
              </h2>
              <p className="text-blue-100/80 text-lg leading-relaxed mb-10">
                La primera consultoría es sin costo y sin compromiso. Cuéntanos tu proyecto y te mostramos cómo Growth BDM puede abrirte las puertas correctas en México.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={() => setShowCalendar(true)}
                  size="lg"
                  className="bg-white text-blue-900 hover:bg-blue-50 font-semibold px-10"
                >
                  Agendar Growth Intro <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Link href="/invierte-en-mexico">
                  <Button size="lg" variant="outline" className="border-white/25 text-white hover:bg-white/10 px-8">
                    Saber más sobre inversión
                  </Button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── CALENDAR MODAL ───────────────────────────── */}
      <Dialog open={showCalendar} onOpenChange={setShowCalendar}>
        <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-hidden p-0">
          <DialogTitle className="sr-only">Agenda tu consultoría Growth Intro</DialogTitle>
          <iframe
            src="https://cal.com/alberto-balderas/30min?embed=true&hideBranding=true&hideFooter=true&borderless=true&theme=light&layout=month_view"
            width="100%"
            height="80vh"
            frameBorder="0"
            style={{ minHeight: '650px' }}
            title="Agenda Growth Intro"
          />
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
