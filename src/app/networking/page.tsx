'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
// Importaciones absolutas para evitar problemas de resolución
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { BannerImage } from "../../components/BannerImage";
import { ImageGallery } from '../../components/ImageGallery';
import { Button } from "../../components/ui/button";
import { Calendar, MapPin, Users, Clock } from "lucide-react";
import { useToast } from "../../components/ui/use-toast";
import { useStripeProduct } from "../../lib/hooks/useStripeProduct";
import { loadStripe } from "@stripe/stripe-js";

// Marcar explícitamente como página dinámica
export const dynamic = 'force-dynamic';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

const NETWORKING_EVENT = {
  productId: 'prod_Rqxdf37ruTalZu',
  priceId: 'price_1QxFi6P1CcAYKMEzLi6VCkP0'
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function NetworkingPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { product, isLoading: productLoading, error: productError } = useStripeProduct(NETWORKING_EVENT.productId);

  const handleCheckout = async () => {
    try {
      setIsLoading(true);
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Error al inicializar Stripe');

      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId: NETWORKING_EVENT.priceId,
          productId: NETWORKING_EVENT.productId,
          quantity: 1,
          mode: 'payment'
        }),
      });

      const data = await response.json();
      
      if (!response.ok) throw new Error(data.error || 'Error al crear la sesión de checkout');
      
      // Verificar si tenemos una URL directa de Stripe
      if (data.url) {
        // Usar la URL directa proporcionada por Stripe (método más confiable)
        window.location.href = data.url;
      } else if (data.sessionId) {
        // Método de respaldo usando redirectToCheckout
        const { error } = await stripe.redirectToCheckout({ sessionId: data.sessionId });
        if (error) throw error;
      } else {
        throw new Error('Respuesta inválida del servidor');
      }
    } catch (error) {
      console.error('Error al procesar el pago:', error);
      toast({
        title: "Error en el Proceso de Pago",
        description: error instanceof Error ? error.message : "Hubo un problema al procesar tu solicitud.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (productLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  if (productError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center text-red-500">
          Error al cargar la información del evento. Por favor, intenta más tarde.
        </div>
      </div>
    );
  }

  // Valores predeterminados en caso de que el producto no se cargue correctamente
  const eventName = product?.name || 'Evento de Networking';
  const eventDescription = product?.description || 'Únete a nuestro exclusivo evento de networking para conectar con profesionales del sector inmobiliario.';
  
  // Extraer fecha y hora del campo event_date o usar valores predeterminados
  let eventDate = '8 de Mayo 2025';
  let eventTime = '19:00 hrs';
  
  // Mostrar todos los metadatos para depuración
  console.log('Todos los metadatos del producto:', product?.metadata);
  
  // Procesar la fecha y hora del evento
  if (product?.metadata?.event_date) {
    console.log('Valor original de event_date:', product.metadata.event_date);
    
    // Método directo: extraer manualmente la fecha y hora
    const dateParts = product.metadata.event_date.split('T');
    if (dateParts.length === 2) {
      // Extraer la fecha (YYYY-MM-DD)
      const [year, month, day] = dateParts[0].split('-').map(Number);
      
      // Nombres de los meses en español
      const monthNames = [
        'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
        'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
      ];
      
      if (year && month && day) {
        eventDate = `${day} de ${monthNames[month-1]} ${year}`;
        console.log('Fecha extraída manualmente:', eventDate);
      }
      
      // Extraer la hora (H:MM:SS)
      const timeParts = dateParts[1].split(':');
      if (timeParts.length >= 2) {
        const hours = parseInt(timeParts[0]);
        const minutes = parseInt(timeParts[1]);
        if (!isNaN(hours) && !isNaN(minutes)) {
          eventTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes} hrs`;
          console.log('Hora extraída manualmente:', eventTime);
        }
      }
    }
  } else if (product?.metadata?.date) {
    eventDate = product.metadata.date;
  }
  
  if (product?.metadata?.time && !product?.metadata?.event_date) {
    eventTime = product.metadata.time;
  }
  
  const eventLocation = product?.metadata?.location || 'Torre Virreyes';
  const eventImage = product?.images?.[0] || "https://res.cloudinary.com/de4dpzh9c/image/upload/v1741501148/AI_chip_hg8jqt";

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4">
        <div className="py-16 md:py-24 lg:py-32">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="mb-24"
          >
            <BannerImage
              src={eventImage}
              alt={eventName}
              className="w-full h-[500px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl"
            />
          </motion.div>

          <motion.section
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl mx-auto text-center space-y-12"
          >
            <motion.div variants={fadeInUp}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-foreground">
                {eventName}
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed">
                {eventDescription}
              </p>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12"
            >
              <div className="flex flex-col items-center space-y-4 p-6 rounded-xl bg-secondary/10">
                <Calendar className="h-10 w-10 text-primary" />
                <span className="text-lg">{eventDate}</span>
              </div>
              <div className="flex flex-col items-center space-y-4 p-6 rounded-xl bg-secondary/10">
                <Clock className="h-10 w-10 text-primary" />
                <span className="text-lg">{eventTime}</span>
              </div>
              <div className="flex flex-col items-center space-y-4 p-6 rounded-xl bg-secondary/10">
                <MapPin className="h-10 w-10 text-primary" />
                <span className="text-lg">{eventLocation}</span>
              </div>
              <div className="flex flex-col items-center space-y-4 p-6 rounded-xl bg-secondary/10">
                <Users className="h-10 w-10 text-primary" />
                <span className="text-lg">Cupo Limitado</span>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-8">
              <Button
                onClick={handleCheckout}
                disabled={isLoading}
                size="lg"
                className="bg-blue-800 text-white hover:bg-blue-900 dark:bg-blue-700 dark:hover:bg-blue-800 text-xl px-12 py-8 h-auto rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
              >
                {isLoading ? 'Procesando...' : 'Reservar Lugar'}
              </Button>
            </motion.div>
          </motion.section>

          {/* Sección de evento MIPIM - Save the Date */}
          <motion.section
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-5xl mx-auto mt-24 bg-gradient-to-br from-blue-100 via-blue-50 to-indigo-100 dark:from-blue-900/60 dark:via-blue-950/50 dark:to-indigo-900/60 p-12 rounded-3xl border border-blue-300 dark:border-blue-700 shadow-2xl overflow-hidden relative"
          >
            {/* Elementos decorativos animados */}
            <motion.div 
              animate={{ 
                rotate: 360,
                transition: { duration: 40, repeat: Infinity, ease: "linear" } 
              }}
              className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-200 to-blue-300/50 dark:from-blue-800/40 dark:to-blue-700/20 rounded-full -mr-20 -mt-20 z-0 opacity-60 blur-md"
            ></motion.div>
            <motion.div 
              animate={{ 
                rotate: -360,
                transition: { duration: 50, repeat: Infinity, ease: "linear" } 
              }}
              className="absolute bottom-0 left-0 w-56 h-56 bg-gradient-to-tr from-indigo-200 to-indigo-300/50 dark:from-indigo-800/40 dark:to-indigo-700/20 rounded-full -ml-20 -mb-20 z-0 opacity-60 blur-md"
            ></motion.div>
            <motion.div 
              animate={{ 
                y: [0, 15, 0],
                transition: { duration: 6, repeat: Infinity, ease: "easeInOut" } 
              }}
              className="absolute top-1/4 left-10 w-24 h-24 bg-blue-300/30 dark:bg-blue-700/30 rounded-full z-0 opacity-40"
            ></motion.div>
            <motion.div 
              animate={{ 
                y: [0, -15, 0],
                transition: { duration: 7, repeat: Infinity, ease: "easeInOut" } 
              }}
              className="absolute bottom-1/3 right-10 w-20 h-20 bg-indigo-300/30 dark:bg-indigo-700/30 rounded-full z-0 opacity-40"
            ></motion.div>
            
            <motion.div variants={fadeInUp} className="relative z-10">
              {/* Encabezado con estilo Save the Date mejorado */}
              <div className="text-center mb-12">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="inline-block bg-gradient-to-r from-blue-600/20 to-indigo-600/20 dark:from-blue-400/20 dark:to-indigo-400/20 px-8 py-3 rounded-full mb-6 border border-blue-300/50 dark:border-blue-500/30 shadow-inner"
                >
                  <h3 className="text-xl font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wider">Save the Date</h3>
                </motion.div>
                <motion.h2 
                  whileHover={{ scale: 1.02 }}
                  className="text-4xl md:text-6xl font-extrabold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-700 dark:from-blue-400 dark:via-indigo-300 dark:to-blue-400 drop-shadow-sm"
                >
                  Evento de Promoción MIPIM
                </motion.h2>
                <div className="w-48 h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500 mx-auto mb-8 rounded-full shadow-sm"></div>
              </div>
              
              {/* Fecha destacada mejorada con animación */}
              <motion.div 
                whileHover={{ scale: 1.03 }}
                className="bg-gradient-to-br from-white/90 to-blue-50/90 dark:from-gray-800/90 dark:to-blue-900/30 rounded-2xl p-10 shadow-xl text-center mb-12 transition-all duration-300 border border-blue-200 dark:border-blue-700/50 backdrop-blur-sm"
              >
                <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                  <motion.div 
                    whileHover={{ rotate: 10 }}
                    className="bg-gradient-to-br from-blue-100 to-blue-200/70 dark:from-blue-800/50 dark:to-blue-700/30 p-6 rounded-2xl w-24 h-24 flex items-center justify-center shadow-lg border border-blue-200/50 dark:border-blue-600/30 mb-4 md:mb-0"
                  >
                    <Calendar className="h-12 w-12 text-blue-700 dark:text-blue-300" />
                  </motion.div>
                  
                  <div className="text-center md:text-left">
                    <div className="inline-block bg-blue-100/50 dark:bg-blue-900/30 px-4 py-1 rounded-full mb-3">
                      <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Marca en tu calendario</span>
                    </div>
                    <h3 className="text-4xl font-extrabold text-blue-800 dark:text-blue-300 mb-3 drop-shadow-sm">10 de Septiembre, 2025</h3>
                    <p className="text-2xl text-blue-600 dark:text-blue-400 font-semibold flex items-center justify-center md:justify-start gap-2">
                      <Clock className="h-5 w-5" /> 8:30 a.m.
                    </p>
                  </div>
                </div>
              </motion.div>
              
              <div className="relative mb-10 p-6 bg-blue-50/70 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800 shadow-inner">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">Información del evento</div>
                <p className="text-lg text-center text-muted-foreground mb-8 leading-relaxed mt-4">
                  Te invitamos a conocer MIPIM, la principal feria inmobiliaria del mundo, que se llevará a cabo del 9 al 13 de marzo en Cannes, Francia.
                </p>
              
                <div className="flex justify-center mb-6">
                  <motion.a 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    href="https://www.mipim.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl text-lg flex items-center gap-3 group"
                  >
                    <span>Visitar sitio web de la feria MIPIM</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200"><path d="M7 17l9.2-9.2M17 17V7H7"></path></svg>
                  </motion.a>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-white/90 to-blue-50/90 dark:from-gray-800/90 dark:to-blue-900/20 backdrop-blur-sm p-8 rounded-2xl shadow-lg mb-10 border border-blue-100 dark:border-blue-800">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent to-blue-300 dark:to-blue-700"></div>
                  <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-300 px-4">Organizado por</h3>
                  <div className="h-px flex-1 bg-gradient-to-l from-transparent to-blue-300 dark:to-blue-700"></div>
                </div>
                
                <p className="text-lg text-center text-muted-foreground mb-8 font-medium">
                  Aliest-Growth y How2go
                </p>
                
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent to-blue-300 dark:to-blue-700"></div>
                  <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-300 px-4">Ponentes Destacados</h3>
                  <div className="h-px flex-1 bg-gradient-to-l from-transparent to-blue-300 dark:to-blue-700"></div>
                </div>
                
                <ul className="space-y-5 text-lg text-muted-foreground mb-6 list-none">
                  <motion.li 
                    whileHover={{ x: 5 }}
                    className="p-4 border-l-4 border-blue-400 dark:border-blue-600 bg-white/60 dark:bg-gray-800/60 rounded-r-lg shadow-sm flex items-start hover:shadow-md transition-all duration-200"
                  >
                    <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-full mr-4 mt-1 shadow-inner">
                      <div className="w-3 h-3 bg-blue-500 dark:bg-blue-400 rounded-full"></div>
                    </div>
                    <div>
                      <span className="font-semibold text-blue-700 dark:text-blue-300 text-lg">Luis Méndez Trillo</span>, Presidente de Coldwell Banker Commercial
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Mercado inmobiliario de oficinas e industrial y oportunidades de inversión</p>
                    </div>
                  </motion.li>
                  
                  <motion.li 
                    whileHover={{ x: 5 }}
                    className="p-4 border-l-4 border-blue-400 dark:border-blue-600 bg-white/60 dark:bg-gray-800/60 rounded-r-lg shadow-sm flex items-start hover:shadow-md transition-all duration-200"
                  >
                    <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-full mr-4 mt-1 shadow-inner">
                      <div className="w-3 h-3 bg-blue-500 dark:bg-blue-400 rounded-full"></div>
                    </div>
                    <div>
                      <span className="font-semibold text-blue-700 dark:text-blue-300 text-lg">Hines</span>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Trayectoria como desarrollador inmobiliario en México, retos y proyectos actuales</p>
                    </div>
                  </motion.li>
                  
                  <motion.li 
                    whileHover={{ x: 5 }}
                    className="p-4 border-l-4 border-blue-400 dark:border-blue-600 bg-white/60 dark:bg-gray-800/60 rounded-r-lg shadow-sm flex items-start hover:shadow-md transition-all duration-200"
                  >
                    <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-full mr-4 mt-1 shadow-inner">
                      <div className="w-3 h-3 bg-blue-500 dark:bg-blue-400 rounded-full"></div>
                    </div>
                    <div>
                      <span className="font-semibold text-blue-700 dark:text-blue-300 text-lg">Mtra. Diana León</span>, Titular de Energía de la Secretaría de Economía
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Proyectos energéticos en el país y su impacto en el crecimiento de la industria nacional</p>
                    </div>
                  </motion.li>
                  
                  <motion.li 
                    whileHover={{ x: 5 }}
                    className="p-4 border-l-4 border-blue-400 dark:border-blue-600 bg-white/60 dark:bg-gray-800/60 rounded-r-lg shadow-sm flex items-start hover:shadow-md transition-all duration-200"
                  >
                    <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-full mr-4 mt-1 shadow-inner">
                      <div className="w-3 h-3 bg-blue-500 dark:bg-blue-400 rounded-full"></div>
                    </div>
                    <div>
                      <span className="font-semibold text-blue-700 dark:text-blue-300 text-lg">Gobierno del Estado de Oaxaca</span>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Oportunidades de inversión del Corredor Interoceánico y desarrollo económico regional</p>
                    </div>
                  </motion.li>
                </ul>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex flex-col items-center space-y-3 p-5 rounded-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm shadow-md border border-blue-100 dark:border-blue-800 text-center">
                  <MapPin className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  <span className="text-lg font-medium text-blue-800 dark:text-blue-300">Sede</span>
                  <span className="text-base">Neuchatel, Av. Río San Joaquín 498, Col. Ampliación Granada, Delegación Miguel Hidalgo, Ciudad de México</span>
                </div>
              </div>
              
              <div className="bg-green-100 dark:bg-green-900/40 p-5 rounded-xl shadow-md mb-6 text-center border border-green-200 dark:border-green-800 transform hover:scale-105 transition-transform duration-300">
                <p className="text-xl font-medium text-green-800 dark:text-green-300">📩 Evento sin costo – Cupo limitado</p>
              </div>
              
              <div className="bg-blue-100 dark:bg-blue-900/40 p-5 rounded-xl shadow-md text-center border border-blue-200 dark:border-blue-800">
                <p className="text-base text-blue-800 dark:text-blue-300">
                  <span className="font-semibold block mb-2 text-lg">✔ Dirigido a</span>
                  Exclusivo C-Level de Constructoras, Desarrolladoras Inmobiliarias, Despachos de Arquitectura, Asociaciones del Sector Construcción/Inmobiliario, Gobierno Estatal, Municipal y Federal, Brokers, Inversionistas, Asset Managers, entre otros.
                </p>
              </div>
            </motion.div>
          </motion.section>
        </div>
      </main>

      {/* Sección de galería con ancho completo */}
      <section className="w-full bg-muted/30 border-y border-muted py-24 lg:py-32">
        <div className="container mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Galería de Eventos
            </h2>
            <p className="text-xl text-muted-foreground">
              Revive los mejores momentos de nuestros eventos anteriores
            </p>
          </motion.div>

          {/* Galería de imágenes específicas */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-10"
          >
            {[
              'PA100270',
              'PA100278',
              'PA100285',
              'PA100293',
              'PA100297',
              'PA100302',
              'PA100311',
              'PA100313'
            ].map((imageId, index) => (
              <motion.div
                key={imageId}
                variants={item}
                className="relative aspect-[4/3] group overflow-hidden rounded-xl"
              >
                <Image
                  src={`https://www.growthbdm.com/images/networking/${imageId}.jpg`}
                  alt={`Evento de networking Growth BDM ${index + 1}`}
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  priority={index < 4}
                  quality={85}
                  onError={(e) => {
                    // Ocultar el elemento padre cuando la imagen no carga
                    const target = e.target as HTMLImageElement;
                    if (target.parentElement) {
                      target.parentElement.style.display = 'none';
                    }
                  }}
                />
                <div 
                  className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  aria-hidden="true"
                >
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white text-sm truncate">
                      Workshop Networking
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Enlace a la galería completa (ahora con imagen) */}
          <motion.div
            variants={fadeInUp}
            className="flex justify-center"
          >
            <a 
              href="https://workshop.growthbdm.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="transition-all duration-300 hover:opacity-90 hover:scale-105 transform shadow-lg hover:shadow-xl rounded-xl overflow-hidden"
            >
              <div className="relative w-[300px] h-[150px] group">
                <Image 
                  src="/images/networking/PA100350.jpg" 
                  alt="WorkShop Inteligencia Artificial" 
                  fill 
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-center p-4">
                  <span className="text-white text-lg font-medium">WorkShop Inteligencia Artificial</span>
                </div>
              </div>
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
