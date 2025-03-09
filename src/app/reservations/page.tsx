'use client';

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ReservationForm } from "@/components/Reservation/ReservationForm";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function ReservationsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="max-w-2xl mx-auto"
        >
          <h1 className="text-3xl font-bold text-center mb-8">
            Reserva tu lugar
          </h1>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <ReservationForm />
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
