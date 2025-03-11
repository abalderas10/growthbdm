'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BannerImage } from "@/components/BannerImage";
import { ImageGallery } from '@/components/ImageGallery';
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Clock } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useStripeProduct } from "@/lib/hooks/useStripeProduct";
import { useCloudinaryGallery } from "@/lib/hooks/useCloudinaryGallery";
import { loadStripe } from "@stripe/stripe-js";
import Image from 'next/image';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function NetworkingPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { product, isLoading: productLoading, error: productError } = useStripeProduct();
  const { images, isLoading: galleryLoading, error: galleryError } = useCloudinaryGallery();

  const handlePayment = async () => {
    try {
      setIsLoading(true);
      
      // 1. Crear la sesión de checkout
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: 'price_1QwDX6P1CcAYKMEzAHOPsdSD',
          successUrl: `${window.location.origin}/success`,
          cancelUrl: `${window.location.origin}/networking`,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al crear la sesión de checkout');
      }

      const { sessionId } = await response.json();
      
      // 2. Inicializar Stripe
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');
      if (!stripe) {
        throw new Error('Error al cargar Stripe');
      }

      // 3. Redirigir al checkout
      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) {
        throw error;
      }
    } catch (err) {
      console.error('Error en el proceso de pago:', err);
      toast({
        title: 'Error',
        description: 'Hubo un problema al procesar el pago. Por favor, intenta de nuevo.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Mostrar estado de carga mientras se obtiene la información del producto
  if (productLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  // Mostrar error si no se pudo cargar el producto
  if (productError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center text-red-500">
          Error al cargar la información del evento. Por favor, intenta más tarde.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mb-16"
        >
          <BannerImage
            src={product?.images?.[0] || "https://res.cloudinary.com/de4dpzh9c/image/upload/v1741501148/AI_chip_hg8jqt"}
            alt={product?.name || "Evento de Networking"}
            className="w-full h-[400px] rounded-xl overflow-hidden"
          />
        </motion.div>

        <section className="mb-16">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl font-bold mb-6">{product?.name || 'Evento de Networking'}</h1>
            <p className="text-xl text-muted-foreground mb-8">{product?.description}</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="flex flex-col items-center">
                <Calendar className="h-8 w-8 mb-2 text-primary" />
                <span>{product?.metadata?.date || '8 de Mayo 2025'}</span>
              </div>
              <div className="flex flex-col items-center">
                <Clock className="h-8 w-8 mb-2 text-primary" />
                <span>{product?.metadata?.time || '19:00 hrs'}</span>
              </div>
              <div className="flex flex-col items-center">
                <MapPin className="h-8 w-8 mb-2 text-primary" />
                <span>{product?.metadata?.location || 'Torre Virreyes'}</span>
              </div>
              <div className="flex flex-col items-center">
                <Users className="h-8 w-8 mb-2 text-primary" />
                <span>Cupo Limitado</span>
              </div>
            </div>

            <Button
              onClick={handlePayment}
              disabled={isLoading}
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isLoading ? 'Procesando...' : 'Reservar Lugar'}
            </Button>
          </motion.div>
        </section>

        <section className="container mx-auto py-16 px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-center"
          >
            <h2 className="text-4xl font-bold mb-8">
              Eventos Anteriores
            </h2>
            <div className="mb-4 text-center text-gray-600">
              Explora momentos memorables de nuestros eventos pasados
            </div>
          </motion.div>

          {galleryLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {Array.from({ length: 10 }, (_, i) => `skeleton-${i}`).map((id) => (
                <div
                  key={id}
                  className="aspect-square bg-gray-200 animate-pulse rounded-lg"
                />
              ))}
            </div>
          ) : galleryError ? (
            <div className="text-center text-red-500 min-h-[300px] flex items-center justify-center">
              <div>
                <p className="text-xl font-semibold mb-2">Error al cargar la galería</p>
                <p>Por favor, intenta más tarde</p>
              </div>
            </div>
          ) : (
            <ImageGallery images={images} />
          )}
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
