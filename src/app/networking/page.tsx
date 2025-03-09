'use client';

import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CldImage } from 'next-cloudinary';
import EventDetails from "@/components/Reservation/EventDetails";
import Gallery from "@/components/Gallery/Gallery";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function NetworkingPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section con Imagen Principal */}
        <section className="relative w-full max-w-6xl mx-auto mb-16 rounded-xl overflow-hidden">
          <div className="aspect-video relative">
            <CldImage
              src="AI_chip_hg8jqt"
              alt="AI Networking Event"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
            <div className="p-8 w-full">
              <motion.h1 
                className="text-4xl md:text-5xl font-bold text-white mb-4"
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
              >
                Networking Event - Marzo 2024
              </motion.h1>
              <motion.p 
                className="text-xl text-gray-200 max-w-2xl"
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                transition={{ delay: 0.2 }}
              >
                Conecta con profesionales y empresarios en un ambiente exclusivo
              </motion.p>
            </div>
          </div>
        </section>

        {/* Sección de Detalles y Reservación */}
        <section className="mb-16">
          <EventDetails product={{
            id: 'prod_Rqxdf37ruTalZu',
            name: 'Networking Event - Marzo 2024',
            description: 'Evento de Networking - 5 de Marzo 2024, 19:00 hrs, Hotel Westin Santa Fe CDMX',
            images: [],
            metadata: {
              event_date: '2024-03-05T19:00:00',
              location: 'Hotel Westin Santa Fe CDMX'
            },
            price: {
              currency: 'MXN',
              unit_amount: 50000
            }
          }} />
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
