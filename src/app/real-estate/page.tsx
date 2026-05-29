'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { toast } from "sonner";
import {
  Building2,
  ShieldCheck,
  Lock,
  TrendingUp,
  MapPin,
  Eye,
  EyeOff,
  FileText,
  CheckCircle,
  ArrowRight,
  Landmark,
  BarChart3,
  Globe,
  Star,
} from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const WHY_MX = [
  { icon: TrendingUp, title: "Destino #1 de nearshoring", desc: "México lidera la atracción de inversión por su posición estratégica con el T-MEC y cercanía con el mercado norteamericano." },
  { icon: Globe, title: "4ª economía de Latinoamérica", desc: "Con más de 130 millones de consumidores y una clase media en expansión, el mercado interno es sólido y creciente." },
  { icon: Landmark, title: "Seguridad jurídica", desc: "Marcos legales robustos para inversión extranjera, fideicomisos y adquisición de bienes raíces en todo el territorio." },
  { icon: BarChart3, title: "Rendimientos reales", desc: "El sector inmobiliario en México ofrece rendimientos anuales superiores al promedio latinoamericano, especialmente en industrial y comercial." },
];

const PROPERTY_TYPES = [
  { label: "Terreno industrial", icon: "🏭" },
  { label: "Uso mixto", icon: "🏢" },
  { label: "Residencial premium", icon: "🏡" },
  { label: "Comercial / retail", icon: "🏪" },
  { label: "Desarrollo logístico", icon: "🚛" },
  { label: "Turístico / hotelero", icon: "🏨" },
];

export default function RealEstatePage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [ndaAccepted, setNdaAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    country: "",
    investmentRange: "",
    propertyType: "",
    message: "",
    ndaSigned: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ndaAccepted) {
      toast.error("Debes aceptar el NDA para continuar.");
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    toast.success("¡Registro completado! En breve te contactaremos con las oportunidades disponibles.");
    setStep(3);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* ── HERO ─────────────────────────────────────── */}
      <section className="relative w-full pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 text-sm text-slate-200 mb-6">
              <Lock className="h-3.5 w-3.5" />
              Oportunidades exclusivas — acceso restringido
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Terrenos y activos<br className="hidden md:block" /> inmobiliarios en México
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed">
              Desde lotes industriales hasta desarrollos comerciales y turísticos.
              Growth BDM te conecta con los activos correctos — incluyendo oportunidades <em>off market</em> — con seguridad jurídica y al mejor precio del mercado.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="#registro-nda">
                <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 font-semibold px-8">
                  Acceder a oportunidades <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
              <Link href="/invierte-en-mexico">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8">
                  Quiero invertir en México
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── OFF MARKET HIGHLIGHT ──────────────────────── */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="max-w-5xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

              {/* Off Market */}
              <motion.div
                variants={fadeInUp}
                className="relative bg-gradient-to-br from-slate-900 to-blue-950 rounded-3xl p-8 text-white overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full -mr-16 -mt-16" />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <EyeOff className="h-5 w-5 text-blue-300" />
                    <span className="text-sm font-medium text-blue-300 uppercase tracking-wider">Off Market</span>
                  </div>
                  <h2 className="text-2xl font-bold mb-3">
                    Oportunidades que no encuentras en portales
                  </h2>
                  <p className="text-slate-300 leading-relaxed text-sm mb-6">
                    Contamos con un portafolio de activos inmobiliarios <em>fuera de mercado</em> en diferentes sectores — accesibles únicamente a través de Growth BDM, previa firma de un Acuerdo de Confidencialidad (NDA). Si buscas rendimiento real con acceso exclusivo, somos tu fuente directa.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {PROPERTY_TYPES.map(pt => (
                      <span key={pt.label} className="text-xs bg-white/10 border border-white/15 rounded-full px-3 py-1.5">
                        {pt.icon} {pt.label}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Brokerage */}
              <motion.div
                variants={fadeInUp}
                className="bg-card border border-border rounded-3xl p-8"
              >
                <div className="flex items-center gap-2 mb-4">
                  <ShieldCheck className="h-5 w-5 text-blue-500" />
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wider">Brokerage</span>
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-3">
                  La propiedad ideal para tu proyecto
                </h2>
                <p className="text-muted-foreground leading-relaxed text-sm mb-6">
                  Nuestro equipo de brokerage consigue la propiedad o terreno perfecto para instalar tu negocio en México. Te acompañamos desde la búsqueda hasta la escrituración — con seguridad jurídica y legal completa, al mejor precio del mercado. Sin sorpresas.
                </p>
                <ul className="space-y-2.5">
                  {[
                    "Análisis de necesidades y perfil de propiedad",
                    "Búsqueda activa en mercado abierto y off market",
                    "Due diligence jurídico y técnico",
                    "Negociación al mejor precio del mercado",
                    "Acompañamiento hasta escrituración",
                  ].map(item => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── POR QUÉ INVERTIR EN MX ───────────────────── */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
          >
            <motion.div variants={fadeInUp} className="text-center mb-10">
              <h2 className="text-3xl font-bold text-foreground mb-3">Por qué invertir en bienes raíces en México</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">El momento es ahora — y nosotros conocemos el terreno.</p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
              {WHY_MX.map(item => (
                <motion.div key={item.title} variants={fadeInUp} className="bg-card border border-border rounded-2xl p-5 hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center mb-3">
                    <item.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-semibold text-foreground text-sm mb-1.5">{item.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── REGISTRO NDA ──────────────────────────────── */}
      <section id="registro-nda" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
            className="max-w-2xl mx-auto"
          >
            {step === 3 ? (
              /* ── SUCCESS STATE ── */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center bg-card border border-border rounded-3xl p-12"
              >
                <div className="w-16 h-16 rounded-full bg-green-50 dark:bg-green-950 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-3">¡Registro completado!</h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Tu solicitud fue recibida. Un especialista de Growth BDM te contactará en las próximas 24 horas con las oportunidades disponibles que coincidan con tu perfil.
                </p>
                <div className="text-sm text-muted-foreground bg-muted/50 rounded-xl p-4">
                  El acceso a las oportunidades <em>off market</em> requiere la firma del NDA. Te enviaremos el documento por correo para su firma digital.
                </div>
              </motion.div>
            ) : (
              /* ── FORM ── */
              <motion.div variants={fadeInUp}>
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 rounded-full px-4 py-1.5 text-sm text-amber-700 dark:text-amber-300 mb-4">
                    <Star className="h-3.5 w-3.5" />
                    Acceso a inversionistas calificados
                  </div>
                  <h2 className="text-3xl font-bold text-foreground mb-3">
                    Recibe oportunidades exclusivas
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Los activos <em>off market</em> no se publican en portales convencionales. Regístrate, firma el NDA y te enviamos las oportunidades que coincidan con tu perfil de inversión.
                  </p>
                </div>

                {/* NDA explainer */}
                <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-2xl p-5 mb-8">
                  <div className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-amber-800 dark:text-amber-300 mb-1">Acuerdo de Confidencialidad (NDA)</p>
                      <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
                        Para proteger la información de nuestros clientes y propietarios, el acceso al portafolio <em>off market</em> requiere la firma de un NDA. Al registrarte, recibirás el documento por correo para su firma digital — rápido y sin complicaciones.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-3xl p-8">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="re-name" className="text-sm mb-1.5 block">Nombre completo *</Label>
                        <Input id="re-name" placeholder="Tu nombre" value={form.name}
                          onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
                      </div>
                      <div>
                        <Label htmlFor="re-email" className="text-sm mb-1.5 block">Correo electrónico *</Label>
                        <Input id="re-email" type="email" placeholder="tu@empresa.com" value={form.email}
                          onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="re-phone" className="text-sm mb-1.5 block">Teléfono / WhatsApp</Label>
                        <Input id="re-phone" placeholder="+52 55 0000 0000" value={form.phone}
                          onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                      </div>
                      <div>
                        <Label htmlFor="re-country" className="text-sm mb-1.5 block">País de origen</Label>
                        <Input id="re-country" placeholder="México, EUA, España…" value={form.country}
                          onChange={e => setForm(f => ({ ...f, country: e.target.value }))} />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="re-company" className="text-sm mb-1.5 block">Empresa / Fondo de inversión</Label>
                      <Input id="re-company" placeholder="Nombre de tu empresa o fondo" value={form.company}
                        onChange={e => setForm(f => ({ ...f, company: e.target.value }))} />
                    </div>
                    <div>
                      <Label htmlFor="re-range" className="text-sm mb-1.5 block">Rango de inversión aproximado</Label>
                      <select
                        id="re-range"
                        value={form.investmentRange}
                        onChange={e => setForm(f => ({ ...f, investmentRange: e.target.value }))}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <option value="">Seleccionar…</option>
                        <option value="500k-2m">$500K – $2M USD</option>
                        <option value="2m-10m">$2M – $10M USD</option>
                        <option value="10m-50m">$10M – $50M USD</option>
                        <option value="50m+">$50M+ USD</option>
                      </select>
                    </div>
                    <div>
                      <Label className="text-sm mb-2 block">Tipo de activo de interés</Label>
                      <div className="flex flex-wrap gap-2">
                        {PROPERTY_TYPES.map(pt => (
                          <button
                            key={pt.label}
                            type="button"
                            onClick={() => setForm(f => ({ ...f, propertyType: pt.label }))}
                            className={`text-xs rounded-full px-3 py-1.5 border transition-colors ${
                              form.propertyType === pt.label
                                ? "bg-blue-600 border-blue-600 text-white"
                                : "bg-background border-border text-muted-foreground hover:border-blue-300"
                            }`}
                          >
                            {pt.icon} {pt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="re-message" className="text-sm mb-1.5 block">¿Qué buscas específicamente? (opcional)</Label>
                      <textarea
                        id="re-message"
                        rows={3}
                        placeholder="Zona geográfica, uso de suelo, superficie, cronograma de inversión…"
                        value={form.message}
                        onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                      />
                    </div>

                    {/* NDA checkbox */}
                    <div className="flex items-start gap-3 bg-muted/50 rounded-xl p-4">
                      <input
                        type="checkbox"
                        id="nda-accept"
                        checked={ndaAccepted}
                        onChange={e => setNdaAccepted(e.target.checked)}
                        className="mt-1 rounded border-border"
                      />
                      <label htmlFor="nda-accept" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                        Acepto recibir el Acuerdo de Confidencialidad (NDA) por correo electrónico y me comprometo a firmarlo como condición para acceder al portafolio <em>off market</em> de Growth BDM. Entiendo que la información compartida es estrictamente confidencial.
                      </label>
                    </div>

                    <Button
                      type="submit"
                      disabled={loading || !ndaAccepted}
                      className="w-full bg-blue-700 hover:bg-blue-800 text-white h-12 text-base font-medium disabled:opacity-50"
                    >
                      {loading ? "Enviando solicitud…" : "Registrarme y recibir NDA"}
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      Tu información es confidencial y nunca será compartida con terceros sin tu autorización.
                    </p>
                  </form>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── CTA BROKERAGE ─────────────────────────────── */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div variants={fadeInUp}>
              <MapPin className="h-10 w-10 text-blue-500 mx-auto mb-4" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                ¿Tienes un proyecto y necesitas el terreno ideal?
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Cuéntanos qué necesitas — superficie, zona, uso de suelo, cronograma — y nuestro equipo de brokerage activa la búsqueda de inmediato en mercado abierto y fuera de mercado.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/invierte-en-mexico">
                  <Button size="lg" className="bg-blue-700 hover:bg-blue-800 text-white px-8">
                    Hablar con un especialista
                  </Button>
                </Link>
                <Link href="/construye-alianzas">
                  <Button size="lg" variant="outline" className="px-8">
                    Ver planes Growth Alliance
                  </Button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
