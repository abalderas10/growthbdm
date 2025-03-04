"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock } from 'lucide-react';
import { CldImage } from 'next-cloudinary';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import ReservationForm from '@/components/Reservation/ReservationForm';
import Image from 'next/image';

interface StripeProduct {
  id: string;
  name: string;
  description: string;
  images: string[];
  metadata: {
    event_date: string;
    location: string;
    type: string;
  };
}

export default function Networking() {
  const [product, setProduct] = useState<StripeProduct | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<Array<{
    id: string;
    src: string;
    title: string;
  }>>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        setError(null);
        console.log('Fetching product data...');
        
        const response = await fetch('/api/reservations/get-product', {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache'
          }
        });

        if (!response.ok) {
          throw new Error('Error al obtener información del evento');
        }

        const data = await response.json();
        console.log('Product data received:', data);

        if (!data.product) {
          throw new Error('No se recibió información del producto');
        }

        if (!data.product.images || data.product.images.length === 0) {
          console.warn('El producto no tiene imágenes');
        }

        setProduct(data.product);
      } catch (error) {
        console.error('Error:', error);
        setError(error instanceof Error ? error.message : 'Error desconocido');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/api/cloudinary/list-images');
        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }
        const resources = await response.json();
        
        setGalleryImages(
          resources.map((resource: any) => ({
            id: resource.asset_id,
            src: resource.public_id,
            title: resource.public_id.split('/').pop()?.replace(/-/g, ' ') || 'Networking Event'
          }))
        );
      } catch (error) {
        console.error('Error loading images:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              {product?.name || 'Eventos de Networking'}
            </h1>
            
            {/* Descripción principal */}
            <p className="text-gray-600 dark:text-gray-300 mb-12 text-lg text-center">
              {product?.description || 'En Growth Business Development, creemos que el crecimiento empresarial no solo se trata de estrategia y tecnología, sino también de conexiones poderosas.'}
            </p>

            {/* Estado de carga y errores */}
            {isLoading && (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-300">Cargando información del evento...</p>
              </div>
            )}

            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-12">
                <p className="text-red-600 dark:text-red-400 text-center">{error}</p>
              </div>
            )}

            {/* Imagen y Detalles del Evento */}
            {!isLoading && product && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-12">
                {product.images?.[0] && (
                  <div className="relative w-full aspect-video mb-8">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                    />
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-6 w-6 text-blue-500" />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Fecha</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {new Date(product.metadata.event_date).toLocaleDateString('es-MX', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-6 w-6 text-blue-500" />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Hora</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {new Date(product.metadata.event_date).toLocaleTimeString('es-MX', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-6 w-6 text-blue-500" />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Ubicación</h3>
                      <p className="text-gray-600 dark:text-gray-300">{product.metadata.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Formulario de Reserva */}
            {!isLoading && !error && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                  Reserva tu lugar
                </h2>
                <ReservationForm />
              </div>
            )}
          </div>
        </div>

        {/* Galería de imágenes - Ancho completo */}
        <div className="w-full bg-gray-100 dark:bg-gray-800 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Galería de Eventos Anteriores
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {galleryImages.map((image) => (
                <div key={image.id} className="relative aspect-square">
                  <CldImage
                    src={image.src}
                    alt={image.title}
                    fill
                    className="object-cover rounded-lg cursor-pointer transition-transform hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
