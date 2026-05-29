'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { toast } from "sonner";
import Link from "next/link";
import {
  CheckCircle,
  ArrowRight,
  Wrench,
  Building2,
  Globe,
  TrendingUp,
  Landmark,
  ShieldCheck,
  Users,
  BarChart3,
  Handshake,
  EyeOff,
  MapPin,
  ChevronDown,
  Star,
} from "lucide-react";

export const dynamic = 'force-dynamic';

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const SERVICES = [
  {
    icon: Wrench,
    tag: "Consultoría técnica",
    title: "Tu consultor técnico en México",
    body: "Somos tu consultor técnico en México. Te ayudamos a identificar y seleccionar a los mejores proveedores, contratistas y aliados para tu tipo de proyecto — sin importar el sector. Nuestro conocimiento del mercado local te garantiza las decisiones correctas desde el inicio y evita errores costosos.",
    bullets: [
      "Selección de proveedores validados por sector",
      "Evaluación técnica y comercial de propuestas",
      "Supervisión y control de calidad en campo",
      "Conexión con especialistas locales de confianza",
    ],
    color: "blue",
  },
  {
    icon: Building2,
    tag: "Brokerage inmobiliario",
    title: "La propiedad ideal para tu negocio",
    body: "Conseguimos la propiedad o terreno ideal para instalar tu negocio en México. Con seguridad jurídica y legal completa, al mejor precio del mercado. Nuestro equipo de brokerage te acompaña desde la búsqueda hasta la escrituración — sin sorpresas ni intermediarios innecesarios.",
    bullets: [
      "Búsqueda en mercado abierto y off market",
      "Due diligence jurídico y técnico completo",
      "Negociación directa con propietarios",
      "Acompañamiento hasta firma y escrituración",
    ],
    color: "teal",
  },
  {
    icon: EyeOff,
    tag: "Oportunidades off market",
    title: "Inversiones que no encuentras en portales",
    body: "Contamos con oportunidades de inversión off market en diferentes sectores — activos que no se publican en portales convencionales. Si buscas rendimiento real con acceso exclusivo, Growth BDM es tu fuente directa. El acceso requiere registro previo y firma de NDA.",
    bullets: [
      "Portafolio exclusivo fuera de mercado público",
      "Industrial, comercial, residencial y turístico",
      "Acceso previo registro y firma de NDA",
      "Información confidencial protegida",
    ],
    color: "amber",
  },
  {
    icon: Handshake,
    tag: "Alianzas estratégicas",
    title: "Tu red de contactos en México desde el día uno",
    body: "A través de nuestra red de networking y eventos estratégicos, conectamos a nuestros clientes con los decisores correctos del sector relevante para su proyecto. No llegas solo — llegas con Growth BDM abriendo las puertas.",
    bullets: [
      "Acceso a eventos clave del sector",
      "Reuniones programadas con decisores",
      "Representación en eventos si no estás en México",
      "Introducción a inversionistas y socios potenciales",
    ],
    color: "purple",
  },
];

const WHY_NOW = [
  { icon: TrendingUp, stat: "#1", label: "Destino de nearshoring", desc: "en América según AT Kearney" },
  { icon: Globe, stat: "T-MEC", label: "Acceso preferencial", desc: "a mercado USA y Canadá" },
  { icon: Landmark, stat: "4ª", label: "Economía de Latinoamérica", desc: "con 130M consumidores" },
  { icon: BarChart3, stat: "+8%", label: "Crecimiento sector industrial", desc: "promedio anual últimos 3 años" },
];

const PROCESS = [
  { step: "01", title: "Primera reunión sin costo", desc: "Nos cuentas tu proyecto, tu capital disponible y tus objetivos. Nosotros te damos una radiografía honesta del mercado mexicano." },
  { step: "02", title: "Diagnóstico y plan", desc: "Diseñamos el plan de entrada: estructura legal, proveedores clave, propiedad o terreno, contactos estratégicos y cronograma." },
  { step: "03", title: "Ejecución acompañada", desc: "Growth BDM actúa como tu equipo en México. Negociamos, supervisamos, conectamos y resolvemos — tú tomas las decisiones." },
  { step: "04", title: "Operación y crecimiento", desc: "Una vez establecido tu negocio, seguimos contigo: expansión, nuevas oportunidades de inversión y acceso continuo a nuestra red." },
];

const FAQS = [
  {
    q: "¿Puede un extranjero adquirir propiedades en México?",
    a: "Sí. México permite la inversión extranjera en bienes raíces bajo diferentes figuras jurídicas. En zonas restringidas (franja fronteriza y costas), se utilizan fideicomisos bancarios con los mismos derechos que un propietario nacional. Growth BDM te guía en la estructura más adecuada para tu caso.",
  },
  {
    q: "¿Qué tipo de empresas o proyectos apoyan?",
    a: "Trabajamos con inversionistas individuales, fondos de capital, empresas que buscan establecer operaciones en México, desarrolladores inmobiliarios y emprendedores con capital que quieren validar e instalar su modelo de negocio en el mercado mexicano.",
  },
  {
    q: "¿Cuánto tiempo toma establecer una empresa en México?",
    a: "La constitución de una empresa (S.A. de C.V. o SAPI) puede completarse en 3 a 8 semanas dependiendo de la complejidad. Growth BDM coordina a los despachos jurídicos y contables de confianza para agilizar el proceso.",
  },
  {
    q: "¿Cómo accedo a las oportunidades off market?",
    a: "Las oportunidades fuera de mercado están disponibles previa firma de un Acuerdo de Confidencialidad (NDA). Puedes registrarte en nuestra sección de Real Estate y te enviamos el NDA por correo para firma digital. Una vez firmado, recibes el portafolio disponible.",
  },
];

export default function InviertePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState({ name: "", email: "", company: "", country: "", project: "" });
  const [contactLoading, setContactLoading] = useState(false);

  const handleContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    toast.success("¡Mensaje recibido! Te contactaremos dentro de las próximas 24 horas.");
    setContactForm({ name: "", email: "", company: "", country: "", project: "" });
    setContactLoading(false);
  };

  const colorMap: Record<string, string> = {
    blue: "bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400",
    teal: "bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400",
    amber: "bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400",
    purple: "bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400",
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* ── HERO ─────────────────────────────────────── */}
      <section className="relative w-full pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-teal-900" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff07_1px,transparent_1px),linear-gradient(to_bottom,#ffffff07_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 text-sm text-blue-100 mb-6">
              <Star className="h-3.5 w-3.5" />
              Para nacionales y extranjeros que quieren operar en México
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              México te espera.<br className="hidden md:block" /> Growth te lleva de la mano.
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-blue-100/85 mb-10 leading-relaxed">
              Ya seas mexicano o extranjero, Growth BDM es tu socio estratégico para establecer, operar y escalar tu negocio en México. Legal, fiscal, comercial y operativo — un solo equipo.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="#contacto">
                <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50 font-semibold px-8">
                  Hablar con un especialista <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
              <Link href="/real-estate">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8">
                  Ver oportunidades inmobiliarias
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── POR QUÉ MÉXICO AHORA ─────────────────────── */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            <motion.div variants={fadeInUp} className="text-center mb-10">
              <h2 className="text-3xl font-bold text-foreground mb-3">Por qué México — y por qué ahora</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                México es hoy el destino #1 de nearshoring en América. Con el T-MEC, una clase media en expansión y un ecosistema empresarial maduro, las oportunidades son reales — y nosotros sabemos cómo aprovecharlas.
              </p>
            </motion.div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {WHY_NOW.map(item => (
                <motion.div key={item.label} variants={fadeInUp} className="bg-card border border-border rounded-2xl p-5 text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">{item.stat}</div>
                  <div className="text-sm font-semibold text-foreground mb-1">{item.label}</div>
                  <div className="text-xs text-muted-foreground">{item.desc}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SERVICIOS ─────────────────────────────────── */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
          >
            <motion.div variants={fadeInUp} className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Cómo Growth BDM te acompaña
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Cubrimos todos los frentes para que tu inversión en México sea exitosa desde el primer día.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {SERVICES.map((svc) => (
                <motion.div
                  key={svc.tag}
                  variants={fadeInUp}
                  className="bg-card border border-border rounded-3xl p-8 hover:shadow-lg transition-shadow"
                >
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${colorMap[svc.color]}`}>
                    <svc.icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2 block">{svc.tag}</span>
                  <h3 className="text-lg font-bold text-foreground mb-3">{svc.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">{svc.body}</p>
                  <ul className="space-y-2">
                    {svc.bullets.map(b => (
                      <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PROCESO ───────────────────────────────────── */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-3">El proceso con Growth BDM</h2>
              <p className="text-muted-foreground">Simple, claro y sin sorpresas.</p>
            </motion.div>
            <div className="relative">
              <div className="absolute left-8 top-8 bottom-8 w-px bg-border hidden md:block" />
              <div className="space-y-6">
                {PROCESS.map((step, i) => (
                  <motion.div key={step.step} variants={fadeInUp} className="flex gap-6 items-start">
                    <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-lg font-bold shrink-0 relative z-10">
                      {step.step}
                    </div>
                    <div className="bg-card border border-border rounded-2xl p-6 flex-1">
                      <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────── */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
            className="max-w-3xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="text-center mb-10">
              <h2 className="text-3xl font-bold text-foreground mb-3">Preguntas frecuentes</h2>
              <p className="text-muted-foreground">Lo que los inversionistas nos preguntan antes de arrancar.</p>
            </motion.div>
            <div className="space-y-3">
              {FAQS.map((faq, i) => (
                <motion.div key={i} variants={fadeInUp} className="bg-card border border-border rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <span className="font-medium text-foreground text-sm pr-4">{faq.q}</span>
                    <ChevronDown className={`h-4 w-4 text-muted-foreground shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5">
                      <p className="text-sm text-muted-foreground leading-relaxed border-t border-border pt-4">{faq.a}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FORMULARIO DE CONTACTO ────────────────────── */}
      <section id="contacto" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
            className="max-w-2xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-3">
                Hablemos de tu proyecto
              </h2>
              <p className="text-muted-foreground">
                La primera reunión es sin costo. Cuéntanos qué tienes en mente y te damos una radiografía honesta del mercado mexicano.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-card border border-border rounded-3xl p-8">
              <form onSubmit={handleContact} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="inv-name" className="text-sm mb-1.5 block">Nombre completo *</Label>
                    <Input id="inv-name" placeholder="Tu nombre" value={contactForm.name}
                      onChange={e => setContactForm(f => ({ ...f, name: e.target.value }))} required />
                  </div>
                  <div>
                    <Label htmlFor="inv-email" className="text-sm mb-1.5 block">Correo electrónico *</Label>
                    <Input id="inv-email" type="email" placeholder="tu@empresa.com" value={contactForm.email}
                      onChange={e => setContactForm(f => ({ ...f, email: e.target.value }))} required />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="inv-company" className="text-sm mb-1.5 block">Empresa / Fondo</Label>
                    <Input id="inv-company" placeholder="Nombre de tu empresa" value={contactForm.company}
                      onChange={e => setContactForm(f => ({ ...f, company: e.target.value }))} />
                  </div>
                  <div>
                    <Label htmlFor="inv-country" className="text-sm mb-1.5 block">País de origen</Label>
                    <Input id="inv-country" placeholder="México, EUA, España…" value={contactForm.country}
                      onChange={e => setContactForm(f => ({ ...f, country: e.target.value }))} />
                  </div>
                </div>
                <div>
                  <Label htmlFor="inv-project" className="text-sm mb-1.5 block">¿En qué podemos ayudarte? *</Label>
                  <textarea
                    id="inv-project"
                    rows={4}
                    required
                    placeholder="Cuéntanos brevemente tu proyecto, sector, capital disponible y en qué etapa estás…"
                    value={contactForm.project}
                    onChange={e => setContactForm(f => ({ ...f, project: e.target.value }))}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                  />
                </div>
                <Button type="submit" disabled={contactLoading} className="w-full bg-blue-700 hover:bg-blue-800 text-white h-12 text-base font-medium">
                  {contactLoading ? "Enviando…" : "Solicitar reunión sin costo"}
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Respondemos dentro de las siguientes 24 horas hábiles.
                </p>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
