'use client';

import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ReservationForm } from "@/components/Reservation/ReservationForm";
import { CldImage } from 'next-cloudinary';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function NetworkingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <section className="text-center mb-16">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            Networking Event
          </motion.h1>
          <motion.p 
            className="text-xl text-muted-foreground mb-8"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
          >
            5 de Marzo 2024 - Hotel Westin Santa Fe CDMX
          </motion.p>
          
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ delay: 0.3 }}
              className="relative aspect-video rounded-lg overflow-hidden shadow-lg"
            >
              <CldImage
                src="GrowthBDM/networking_event"
                alt="Networking Event"
                width={800}
                height={450}
                className="object-cover w-full h-full"
                priority
              />
            </motion.div>
            
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ delay: 0.4 }}
            >
              <ReservationForm />
            </motion.div>
          </div>
        </section>

        <section className="py-16">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.5 }}
            className="grid md:grid-cols-3 gap-8"
          >
            <div className="p-6 bg-card rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Networking Estratégico</h3>
              <p className="text-muted-foreground">
                Conecta con profesionales y empresarios de alto nivel en un ambiente exclusivo.
              </p>
            </div>
            
            <div className="p-6 bg-card rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Ubicación Premium</h3>
              <p className="text-muted-foreground">
                Hotel Westin Santa Fe, uno de los espacios más prestigiosos de la CDMX.
              </p>
            </div>
            
            <div className="p-6 bg-card rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Oportunidades Únicas</h3>
              <p className="text-muted-foreground">
                Genera conexiones valiosas y descubre nuevas oportunidades de negocio.
              </p>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
