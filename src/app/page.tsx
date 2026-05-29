"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Building2, Globe, Users, Wrench,
  CheckCircle, ArrowRight, Calendar,
  MapPin, TrendingUp, Handshake,
  EyeOff, Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};
const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const SERVICES = [
  {
    icon: Building2,
    title: "Real Estate & Brokerage",
    href: "/real-estate",
    desc: "Terrenos, activos industriales y oportunidades off market en México. Due diligence jurídico completo y al mejor precio del mercado.",
    tag: "Nuevas oportunidades disponibles",
  },
  {
    icon: Globe,
    title: "Invierte en México",
    href: "/invierte-en-mexico",
    desc: "Tu socio estratégico para establecer, operar y escalar tu negocio en México. Legal, fiscal, comercial y operativo — un solo equipo.",
    tag: "Para nacionales y extranjeros",
  },
  {
    icon: Users,
    title: "Networking estratégico",
    href: "/networking",
    desc: "Eventos con inversionistas, desarrolladores y tomadores de decisión. Growth BDM te representa en México si no puedes estar presente.",
    tag: "Próximo evento: 24 Jun",
  },
  {
    icon: Wrench,
    title: "Consultoría técnica",
    href: "/invierte-en-mexico",
    desc: "Selección de los mejores proveedores y aliados para tu proyecto. Conocimiento local que te garantiza decisiones correctas desde el inicio.",
    tag: "Expertos en mercado local",
  },
];

const WHY = [
  { icon: TrendingUp, title: "Red de contactos extensa", desc: "Acceso directo a inversionistas, desarrolladores, gobierno y tomadores de decisión en México." },
  { icon: Handshake,  title: "Acompañamiento integral", desc: "Desde la estrategia hasta la operación. Legal, fiscal, comercial y técnico en un solo equipo." },
  { icon: EyeOff,     title: "Oportunidades off market", desc: "Activos y proyectos exclusivos que no se publican en portales convencionales." },
  { icon: MapPin,     title: "Presencia en México", desc: "Conocemos el mercado mexicano con profundidad. Te ahorramos errores costosos desde el día uno." },
];

export default function Page() {
  return (
    <div className="w-full overflow-x-hidden">
      <Header />

      <main className="w-full">

        {/* ── HERO ── */}
        <section className="w-full">
          <Hero />
        </section>

        {/* ── 4 SERVICIOS ── */}
        <section className="w-full py-24 bg-white dark:bg-gray-950">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={stagger}
            >
              <motion.div variants={fadeUp} className="text-center mb-14">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Todo lo que necesitas para operar en México
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  Growth BDM cubre todos los frentes para que tu inversión o expansión en México sea exitosa desde el primer día.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
                {SERVICES.map((svc) => (
                  <motion.div key={svc.title} variants={fadeUp}>
                    <Link
                      href={svc.href}
                      className="group flex flex-col h-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center mb-4 group-hover:bg-blue-100 dark:group-hover:bg-blue-900 transition-colors">
                        <svc.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="mb-2">
                        <span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 border border-blue-100 dark:border-blue-900 rounded-full px-2.5 py-0.5">
                          {svc.tag}
                        </span>
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-base">{svc.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex-1">{svc.desc}</p>
                      <div className="flex items-center gap-1.5 mt-4 text-xs font-medium text-blue-600 dark:text-blue-400">
                        Explorar <ArrowRight className="h-3.5 w-3.5" />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── PRÓXIMO EVENTO CNEC ── */}
        <section className="w-full py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff07_1px,transparent_1px),linear-gradient(to_bottom,#ffffff07_1px,transparent_1px)] bg-[size:32px_32px]" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={stagger}
              className="max-w-4xl mx-auto"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                <motion.div variants={fadeUp} className="flex-1">
                  <div className="inline-flex items-center gap-2 bg-green-400/15 border border-green-400/25 rounded-full px-3 py-1 text-sm text-green-300 font-medium mb-4">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    Próximo evento
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                    Evento de Networking<br className="hidden md:block" /> con CNEC
                  </h2>
                  <p className="text-blue-200/80 text-lg mb-4 leading-relaxed">
                    En colaboración con la Cámara Nacional de Empresas de Consultoría — un espacio estratégico para conectar con los actores más relevantes del sector consultor e inversión en México.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 text-blue-200/90 text-sm">
                      <Calendar className="h-4 w-4 text-blue-300" />
                      24 de Junio, 2026
                    </div>
                    <div className="flex items-center gap-2 text-blue-200/90 text-sm">
                      <MapPin className="h-4 w-4 text-blue-300" />
                      Sede por confirmar
                    </div>
                    <div className="flex items-center gap-2 text-blue-200/90 text-sm">
                      <Users className="h-4 w-4 text-blue-300" />
                      Cupo limitado
                    </div>
                  </div>
                </motion.div>
                <motion.div variants={fadeUp} className="flex flex-col gap-3 shrink-0">
                  <Link href="/networking#rsvp">
                    <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50 font-semibold px-8 w-full">
                      Reservar mi lugar <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/networking#representacion">
                    <Button size="lg" variant="outline" className="border-white/25 text-white hover:bg-white/10 px-8 w-full">
                      Growth me representa
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── POR QUÉ GROWTH BDM ── */}
        <section className="w-full py-24 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={stagger}
            >
              <motion.div variants={fadeUp} className="text-center mb-14">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Por qué Growth BDM
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
                  No somos una consultoría genérica. Somos tu equipo en México.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
                {WHY.map((item) => (
                  <motion.div
                    key={item.title}
                    variants={fadeUp}
                    className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 hover:shadow-md transition-shadow"
                  >
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

        {/* ── EXPANSIÓN / ESTRATEGIAS ── */}
        <section className="w-full py-24 bg-gradient-to-br from-gray-900 to-blue-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:32px_32px]" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/15 rounded-full filter blur-3xl pointer-events-none" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={stagger}
              className="max-w-5xl mx-auto"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
                <motion.div variants={fadeUp}>
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
                    Estrategias de{" "}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-300">
                      Expansión
                    </span>
                  </h2>
                  <p className="text-xl text-gray-300 leading-relaxed mb-8">
                    Desarrollamos estrategias personalizadas para impulsar el crecimiento de tu negocio, identificando oportunidades clave y estableciendo alianzas que maximizan tu potencial en el mercado mexicano.
                  </p>
                  <ul className="space-y-3 mb-8">
                    {[
                      "Incrementa tus oportunidades comerciales con leads de alto valor",
                      "Posiciona tu marca en eventos clave y medios especializados",
                      "Conecta con desarrolladores y tomadores de decisiones clave",
                      "Soluciones innovadoras y sinergias de alto impacto",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3 text-gray-300 text-sm">
                        <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/construye-alianzas"
                    className="inline-flex items-center px-8 py-4 border-2 border-blue-400 text-base font-medium rounded-full text-blue-400 hover:bg-blue-400/10 transition-colors duration-200"
                  >
                    Ver planes Growth Alliance
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </motion.div>

                <motion.div variants={fadeUp} className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden">
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-gray-900/20 rounded-2xl blur-xl" />
                  <Image
                    src="/3.jpeg"
                    alt="Estrategias de Expansión Growth BDM"
                    fill
                    className="object-cover relative rounded-2xl"
                    priority
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── GROWTH ALLIANCE CTA ── */}
        <section className="w-full py-24 bg-white dark:bg-gray-950">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={stagger}
              className="max-w-4xl mx-auto"
            >
              <motion.div variants={fadeUp} className="text-center mb-14">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Construye Alianzas Estratégicas
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  Impulsa tu negocio a través de alianzas que generan valor y crecimiento sostenible en México
                </p>
              </motion.div>

              <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
                {[
                  { icon: Star,      title: "Growth Intro",    desc: "Primera consultoría sin costo. Conocemos tu proyecto y definimos el potencial en México.", href: "/construye-alianzas", cta: "Gratis" },
                  { icon: TrendingUp, title: "Growth Alliance", desc: "6 meses de acompañamiento on demand. Red de contactos, estrategia, LinkedIn y acercamiento a proyectos.", href: "/construye-alianzas", cta: "Desde $12K MXN/mes" },
                  { icon: Users,     title: "Ticket to Play",  desc: "Evento de networking diseñado para ti. Exposure total ante los actores clave de tu sector.", href: "/construye-alianzas", cta: "A convenir" },
                  { icon: Handshake, title: "Brokerage",       desc: "Conseguimos la propiedad ideal para tu negocio con seguridad jurídica y al mejor precio.", href: "/real-estate", cta: "Ver más" },
                ].map((plan) => (
                  <motion.div key={plan.title} variants={fadeUp}>
                    <Link
                      href={plan.href}
                      className="group flex flex-col h-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md transition-all duration-300"
                    >
                      <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center mb-3">
                        <plan.icon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1.5 text-sm">{plan.title}</h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed flex-1 mb-3">{plan.desc}</p>
                      <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">{plan.cta}</span>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div variants={fadeUp} className="text-center">
                <Link href="/construye-alianzas">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-10">
                    Ver todos los planes <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
