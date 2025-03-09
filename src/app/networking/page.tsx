'use client';

import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import BannerImage from '@/components/BannerImage/BannerImage';
import Gallery from "@/components/Gallery/Gallery";
import { useEffect, useState } from "react";
import { createCheckoutSession } from "@/lib/stripe-client";

interface NetworkingEvent {
  id: string;
  name: string;
  description: string;
  image: string;
  images: string[];
  metadata: {
    event_date: string;
    location: string;
    duration?: string;
    capacity?: string;
  };
  price: {
    id: string;
    currency: string;
    unit_amount: number;
    formatted_amount: string;
  };
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function NetworkingPage() {
  const [event, setEvent] = useState<NetworkingEvent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    async function fetchEvent() {
      try {
        const response = await fetch('/api/reservations/get-product');
        const data = await response.json();
        if (data.product) {
          const product = {
            ...data.product,
            images: [data.product.image],
          };
          setEvent(product);
        } else {
          console.error('Error al cargar el evento:', data.error);
        }
      } catch (error) {
        console.error('Error al obtener el evento:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchEvent();
  }, []);

  const handleReserveClick = async () => {
    if (!event?.price.id || isProcessing) return;
    
    setIsProcessing(true);
    try {
      const url = await createCheckoutSession(event.price.id);
      window.location.href = url;
    } catch (error) {
      console.error('Error al procesar la reservación:', error);
      setIsProcessing(false);
    }
  };

  if (isLoading || !event) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <main className="container mx-auto px-4 py-24 md:py-32">
          <div className="animate-pulse">
            <div className="aspect-video bg-gray-300 dark:bg-gray-700 rounded-xl mb-20 shadow-2xl" />
            <div className="h-8 bg-gray-300 dark:bg-gray-700 max-w-2xl rounded mb-4" />
            <div className="h-4 bg-gray-300 dark:bg-gray-700 max-w-xl rounded" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const eventDate = new Date(event.metadata.event_date);
  const formattedDate = new Intl.DateTimeFormat('es-MX', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }).format(eventDate);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="container mx-auto px-4 py-24 md:py-32">
        {/* Hero Section con Imagen Principal */}
        <section className="relative w-full max-w-6xl mx-auto mb-20 rounded-xl overflow-hidden shadow-2xl">
          <div className="aspect-video relative">
            <BannerImage
              alt={event.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1536px) 100vw, 1536px"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-between">
            <div className="p-8 max-w-3xl">
              <motion.h1 
                className="text-4xl md:text-5xl font-bold text-white mb-4"
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
              >
                {event.name}
              </motion.h1>
              <motion.div
                className="space-y-4"
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                transition={{ delay: 0.2 }}
              >
                <p className="text-xl text-gray-200">{event.description}</p>
                <div className="space-y-2">
                  <p className="text-lg text-gray-300">
                    <span className="font-semibold">Fecha:</span> {formattedDate}
                  </p>
                  <p className="text-lg text-gray-300">
                    <span className="font-semibold">Lugar:</span> {event.metadata.location}
                  </p>
                  {event.metadata.duration && (
                    <p className="text-lg text-gray-300">
                      <span className="font-semibold">Duración:</span> {event.metadata.duration}
                    </p>
                  )}
                </div>
              </motion.div>
            </div>
            <motion.div 
              className="p-8 self-end"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ delay: 0.4 }}
            >
              <button
                onClick={handleReserveClick}
                disabled={isProcessing}
                type="button"
                className={`
                  px-8 py-4
                  bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600
                  hover:from-blue-700 hover:via-blue-600 hover:to-blue-700
                  text-white font-semibold rounded-lg 
                  transform transition-all duration-200 
                  hover:scale-105 active:scale-95
                  disabled:opacity-50 disabled:cursor-not-allowed
                  flex items-center gap-3
                  shadow-xl shadow-blue-500/30
                  backdrop-blur-sm
                  border border-white/10
                  text-lg
                  relative
                  overflow-hidden
                  group
                `}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                {isProcessing ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Procesando...</span>
                  </>
                ) : (
                  <>
                    <span className="relative">Reserva ahora</span>
                    <span className="opacity-90 font-normal relative">
                      • {event.price.formatted_amount}
                    </span>
                  </>
                )}
              </button>
            </motion.div>
          </div>
        </section>

        {/* Galería de Eventos Anteriores */}
        <section className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-8">
          <Gallery />
        </section>
      </main>

      <Footer />
    </div>
  );
}
