'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import { CalendarDays, MapPin, Clock } from 'lucide-react';
import type { NetworkingEvent } from "@/lib/strapi";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

interface EventDetailsProps {
  eventDetails: NetworkingEvent | null;
}

export function EventDetails({ eventDetails }: EventDetailsProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className="mb-16"
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {eventDetails?.banner?.data?.attributes?.url ? (
          <div className="relative h-[400px]">
            <img
              src={eventDetails.banner.data.attributes.url}
              alt={eventDetails.title || "Event Banner"}
              className="object-cover w-full h-full"
            />
          </div>
        ) : null}
        
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            {eventDetails?.title || "Próximo Evento de Networking"}
          </h1>
          
          <div className="space-y-3 mb-6">
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <CalendarDays className="h-5 w-5 mr-2" />
              <span>{eventDetails?.date || "Por confirmar"}</span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <Clock className="h-5 w-5 mr-2" />
              <span>{eventDetails?.time || "Por confirmar"}</span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <MapPin className="h-5 w-5 mr-2" />
              <span>{eventDetails?.location || "Por confirmar"}</span>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-gray-600 dark:text-gray-300">
              {eventDetails?.description || "Más detalles próximamente"}
            </p>
          </div>

          {eventDetails?.price && (
            <div className="text-center mb-6">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                ${eventDetails.price.toFixed(2)}
              </span>
            </div>
          )}

          <div className="text-center">
            <Link
              href="/reservar"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Reservar mi lugar
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
