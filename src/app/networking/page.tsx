'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { toast } from "sonner";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  ArrowRight,
  Building2,
  Handshake,
  TrendingUp,
  Star,
  ExternalLink,
  CheckCircle,
  UserCheck,
  CalendarCheck,
  Globe,
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

const NEXT_EVENT = {
  date: "24 de Junio, 2026",
  time: "Por confirmar",
  venue: "Por confirmar",
  organizer: "CNEC — Cámara Nacional de Empresas de Consultoría",
  organizerUrl: "https://www.cnec.org.mx/",
  audience: "Empresas consultoras, desarrolladores, inversionistas, C-Level y tomadores de decisión del sector consultor en México.",
  description:
    "Growth BDM se une a la Cámara Nacional de Empresas de Consultoría para un evento estratégico de networking donde conectaremos a los actores más relevantes del sector consultor, inmobiliario y de inversión en México.",
};

const PAST_GALLERY = [
  'PA100270','PA100278','PA100285','PA100293',
  'PA100297','PA100302','PA100311','PA100313',
];

const SERVICE_CARDS = [
  {
    icon: CalendarCheck,
    title: "Accede a eventos clave",
    body: "Participa en los eventos de networking más relevantes del sector inmobiliario, consultor e inversión en México. Encuentra oportunidades reales en cada encuentro.",
  },
  {
    icon: UserCheck,
    title: "Growth te representa",
    body: "¿No puedes estar presente en México? Growth BDM asiste a los eventos estratégicos en tu nombre — acercándote leads, prospectos y oportunidades de negocio con las personas y empresas correctas.",
  },
  {
    icon: Handshake,
    title: "Reuniones programadas",
    body: "Más allá de los eventos, conectamos a nuestros clientes con las personas y compañías clave de su sector a través de reuniones programadas — directas, estratégicas y con propósito.",
  },
  {
    icon: Globe,
    title: "Red sin fronteras",
    body: "Conectamos a nacionales y extranjeros con los actores correctos del mercado mexicano. Si buscas socios, inversionistas o clientes en México, Growth abre esas puertas.",
  },
];

const AUDIENCE_TAGS = [
  "Inversionistas", "Desarrolladores inmobiliarios", "C-Level",
  "Consultores estratégicos", "Brokers", "Asset Managers",
  "Gobierno Estatal y Federal", "Despachos de arquitectura",
  "Empresas constructoras", "Emprendedores con capital",
];

export default function NetworkingPage() {
  const [repForm, setRepForm] = useState({ name: "", email: "", company: "", sector: "", message: "" });
  const [repLoading, setRepLoading] = useState(false);
  const [rsvpForm, setRsvpForm] = useState({ name: "", email: "", company: "" });
  const [rsvpLoading, setRsvpLoading] = useState(false);

  const handleRepSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRepLoading(true);
    await new Promise(r => setTimeout(r, 900));
    toast.success("¡Solicitud recibida! Te contactaremos para coordinar tu representación.");
    setRepForm({ name: "", email: "", company: "", sector: "", message: "" });
    setRepLoading(false);
  };

  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRsvpLoading(true);
    await new Promise(r => setTimeout(r, 900));
    toast.success("¡Registro confirmado! Te enviaremos los detalles del evento.");
    setRsvpForm({ name: "", email: "", company: "" });
    setRsvpLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* ── HERO ─────────────────────────────────────── */}
      <section className="relative w-full pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-blue-700/40 border border-blue-500/40 rounded-full px-4 py-1.5 text-sm text-blue-200 mb-6">
              <Star className="h-3.5 w-3.5" />
              Networking estratégico en México
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Donde los negocios<br className="hidden md:block" /> se construyen en persona
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-blue-100/80 mb-10 leading-relaxed">
              Los eventos Growth BDM reúnen inversionistas, desarrolladores, empresarios y tomadores de decisión.
              Más que eventos — son el punto de entrada a una red de oportunidades de negocio reales.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="#proximo-evento">
                <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50 font-semibold px-8">
                  Ver próximo evento <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
              <a href="#representacion">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8">
                  Growth me representa
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── SERVICIOS DE NETWORKING ───────────────────── */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            <motion.div variants={fadeInUp} className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                El networking que trabaja para ti
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Conectamos personas, empresas y capital — con propósito y resultados medibles.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {SERVICE_CARDS.map((card) => (
                <motion.div
                  key={card.title}
                  variants={fadeInUp}
                  className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 group"
                >
                  <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center mb-4 group-hover:bg-blue-100 dark:group-hover:bg-blue-900 transition-colors">
                    <card.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 text-base">{card.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{card.body}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PRÓXIMO EVENTO ────────────────────────────── */}
      <section id="proximo-evento" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <span className="inline-block bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800 rounded-full px-4 py-1 text-sm font-medium mb-4">
                Próximo evento
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                Evento de Networking — CNEC
              </h2>
              <p className="text-muted-foreground text-lg">
                En colaboración con la Cámara Nacional de Empresas de Consultoría
              </p>
            </motion.div>

            {/* Tarjeta principal del evento */}
            <motion.div
              variants={fadeInUp}
              className="bg-card border border-border rounded-3xl overflow-hidden shadow-xl mb-10"
            >
              {/* Banner superior */}
              <div className="bg-gradient-to-r from-blue-800 to-blue-600 p-8 text-white">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div>
                    <p className="text-blue-200 text-sm font-medium uppercase tracking-wider mb-1">Save the date</p>
                    <h3 className="text-3xl md:text-4xl font-bold mb-1">{NEXT_EVENT.date}</h3>
                    <p className="text-blue-200">{NEXT_EVENT.time}</p>
                  </div>
                  <Link
                    href={NEXT_EVENT.organizerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-white/15 hover:bg-white/25 border border-white/20 rounded-xl px-4 py-3 text-sm font-medium transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Visitar CNEC
                  </Link>
                </div>
              </div>

              {/* Detalles del evento */}
              <div className="p-8">
                <p className="text-muted-foreground leading-relaxed mb-8 text-base">
                  {NEXT_EVENT.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/50">
                    <Calendar className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">Fecha</p>
                      <p className="text-sm font-medium text-foreground">{NEXT_EVENT.date}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/50">
                    <Clock className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">Horario</p>
                      <p className="text-sm font-medium text-foreground">{NEXT_EVENT.time}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/50">
                    <MapPin className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">Sede</p>
                      <p className="text-sm font-medium text-foreground">{NEXT_EVENT.venue}</p>
                    </div>
                  </div>
                </div>

                {/* Organizador */}
                <div className="flex items-center gap-3 p-4 rounded-xl border border-border mb-8">
                  <Building2 className="h-5 w-5 text-muted-foreground shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">Organizado por</p>
                    <p className="text-sm font-medium text-foreground">{NEXT_EVENT.organizer}</p>
                  </div>
                </div>

                {/* Dirigido a */}
                <div>
                  <p className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-500" /> Dirigido a
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {AUDIENCE_TAGS.map((tag) => (
                      <span key={tag} className="text-xs bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-900 rounded-full px-3 py-1">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Formulario RSVP */}
            <motion.div
              variants={fadeInUp}
              id="rsvp"
              className="bg-card border border-border rounded-3xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-green-50 dark:bg-green-950 flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Reservar mi lugar</h3>
                  <p className="text-sm text-muted-foreground">Cupo limitado — sin costo</p>
                </div>
              </div>
              <form onSubmit={handleRsvpSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="rsvp-name" className="text-sm mb-1.5 block">Nombre completo</Label>
                    <Input id="rsvp-name" placeholder="Tu nombre" value={rsvpForm.name}
                      onChange={e => setRsvpForm(f => ({ ...f, name: e.target.value }))} required />
                  </div>
                  <div>
                    <Label htmlFor="rsvp-email" className="text-sm mb-1.5 block">Correo electrónico</Label>
                    <Input id="rsvp-email" type="email" placeholder="tu@empresa.com" value={rsvpForm.email}
                      onChange={e => setRsvpForm(f => ({ ...f, email: e.target.value }))} required />
                  </div>
                </div>
                <div>
                  <Label htmlFor="rsvp-company" className="text-sm mb-1.5 block">Empresa / Organización</Label>
                  <Input id="rsvp-company" placeholder="Nombre de tu empresa" value={rsvpForm.company}
                    onChange={e => setRsvpForm(f => ({ ...f, company: e.target.value }))} required />
                </div>
                <Button type="submit" disabled={rsvpLoading} className="w-full bg-blue-700 hover:bg-blue-800 text-white h-11">
                  {rsvpLoading ? "Registrando..." : "Confirmar asistencia"}
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Los detalles finales del evento serán enviados a tu correo una vez confirmados.
                </p>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── REPRESENTACIÓN EN EVENTOS ─────────────────── */}
      <section id="representacion" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
            className="max-w-5xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Copy */}
              <motion.div variants={fadeInUp}>
                <span className="inline-block bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-900 rounded-full px-4 py-1 text-sm font-medium mb-5">
                  Servicio exclusivo
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-5">
                  Growth BDM en los eventos — aunque tú no estés
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Si no puedes asistir a México, nosotros te representamos. Vamos a los eventos estratégicos del sector en tu nombre, identificamos prospectos, iniciamos conversaciones y te acercamos oportunidades de negocio reales con las personas y empresas correctas.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    "Identificación previa de asistentes clave para tu perfil",
                    "Presencia activa de Growth en el evento en tu nombre",
                    "Reporte de contactos, leads y oportunidades detectadas",
                    "Seguimiento y agenda de reuniones post-evento",
                    "Reuniones programadas con los contactos más relevantes",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a href="#form-representacion">
                  <Button className="bg-blue-700 hover:bg-blue-800 text-white">
                    Quiero que Growth me represente <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </motion.div>

              {/* Formulario de representación */}
              <motion.div
                variants={fadeInUp}
                id="form-representacion"
                className="bg-card border border-border rounded-3xl p-8"
              >
                <h3 className="font-semibold text-foreground mb-1">Solicitar representación</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Cuéntanos sobre tu empresa y te contactamos para diseñar tu estrategia.
                </p>
                <form onSubmit={handleRepSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="rep-name" className="text-sm mb-1.5 block">Nombre</Label>
                      <Input id="rep-name" placeholder="Tu nombre" value={repForm.name}
                        onChange={e => setRepForm(f => ({ ...f, name: e.target.value }))} required />
                    </div>
                    <div>
                      <Label htmlFor="rep-email" className="text-sm mb-1.5 block">Email</Label>
                      <Input id="rep-email" type="email" placeholder="tu@empresa.com" value={repForm.email}
                        onChange={e => setRepForm(f => ({ ...f, email: e.target.value }))} required />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="rep-company" className="text-sm mb-1.5 block">Empresa</Label>
                    <Input id="rep-company" placeholder="Nombre de tu empresa" value={repForm.company}
                      onChange={e => setRepForm(f => ({ ...f, company: e.target.value }))} required />
                  </div>
                  <div>
                    <Label htmlFor="rep-sector" className="text-sm mb-1.5 block">Sector / Industria</Label>
                    <Input id="rep-sector" placeholder="Ej. Real Estate, Construcción, Tecnología…" value={repForm.sector}
                      onChange={e => setRepForm(f => ({ ...f, sector: e.target.value }))} />
                  </div>
                  <div>
                    <Label htmlFor="rep-message" className="text-sm mb-1.5 block">¿Qué tipo de oportunidades buscas?</Label>
                    <textarea
                      id="rep-message"
                      rows={3}
                      placeholder="Describe brevemente tus objetivos de networking…"
                      value={repForm.message}
                      onChange={e => setRepForm(f => ({ ...f, message: e.target.value }))}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                    />
                  </div>
                  <Button type="submit" disabled={repLoading} className="w-full bg-blue-700 hover:bg-blue-800 text-white h-11">
                    {repLoading ? "Enviando…" : "Solicitar representación"}
                  </Button>
                </form>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── REUNIONES PROGRAMADAS ─────────────────────── */}
      <section className="py-20 bg-gradient-to-br from-blue-950 to-blue-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div variants={fadeInUp}>
              <TrendingUp className="h-10 w-10 text-blue-300 mx-auto mb-5" />
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">
                Reuniones programadas con los contactos correctos
              </h2>
              <p className="text-blue-100/80 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
                El networking de Growth no se limita a los eventos. A través de reuniones programadas, conectamos a nuestros clientes directamente con las personas y compañías clave de su sector — de forma estratégica, sin perder tiempo en contactos irrelevantes.
              </p>
            </motion.div>
            <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {[
                { icon: UserCheck, label: "Perfil de tu empresa", desc: "Analizamos tu oferta de valor y definimos el perfil exacto de contactos que necesitas." },
                { icon: Handshake, label: "Conexión estratégica", desc: "Identificamos y presentamos a los decisores correctos dentro de nuestra red activa." },
                { icon: CalendarCheck, label: "Agenda y seguimiento", desc: "Coordinamos las reuniones, preparamos el contexto y damos seguimiento a los acuerdos." },
              ].map((step) => (
                <motion.div key={step.label} variants={fadeInUp} className="bg-white/10 border border-white/15 rounded-2xl p-6 text-left">
                  <step.icon className="h-6 w-6 text-blue-300 mb-3" />
                  <h3 className="font-semibold text-white mb-2">{step.label}</h3>
                  <p className="text-sm text-blue-100/70 leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Link href="/construye-alianzas">
                <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50 font-semibold px-8">
                  Ver planes Growth Alliance <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── GALERÍA ───────────────────────────────────── */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Eventos anteriores
              </h2>
              <p className="text-muted-foreground text-lg">
                Momentos que se convirtieron en oportunidades de negocio
              </p>
            </motion.div>

            <motion.div
              variants={stagger}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
            >
              {PAST_GALLERY.map((id, i) => (
                <motion.div
                  key={id}
                  variants={fadeInUp}
                  className="relative aspect-[4/3] group overflow-hidden rounded-xl"
                >
                  <Image
                    src={`https://www.growthbdm.com/images/networking/${id}.jpg`}
                    alt={`Evento Growth BDM ${i + 1}`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    priority={i < 4}
                    quality={80}
                    onError={(e) => {
                      const t = e.target as HTMLImageElement;
                      if (t.parentElement) t.parentElement.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-blue-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={fadeInUp} className="flex justify-center mt-10">
              <a
                href="https://workshop.growthbdm.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl rounded-xl overflow-hidden block"
              >
                <div className="relative w-[280px]">
                  <Image
                    src="/workshop_click.png"
                    alt="Workshop Inteligencia Artificial"
                    width={280}
                    height={140}
                    className="object-contain rounded-xl"
                  />
                </div>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA FINAL ─────────────────────────────────── */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div variants={fadeInUp} className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border border-blue-100 dark:border-blue-800 rounded-3xl p-10 md:p-14">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                ¿Listo para conectar con las personas correctas?
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Ya sea que quieras asistir a un evento, que Growth te represente, o que busques reuniones programadas con decisores clave — el primer paso es el mismo.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/construye-alianzas">
                  <Button size="lg" className="bg-blue-700 hover:bg-blue-800 text-white px-8">
                    Ver planes Growth Alliance
                  </Button>
                </Link>
                <a href="#rsvp">
                  <Button size="lg" variant="outline" className="px-8">
                    Reservar lugar — evento 24 jun
                  </Button>
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
