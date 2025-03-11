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

export default function NetworkingPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { product, isLoading: productLoading, error: productError } = useStripeProduct(NETWORKING_EVENT.productId);
  const { images, isLoading: galleryLoading, error: galleryError } = useCloudinaryGallery();

  const handleCheckout = async () => {
    try {
      setIsLoading(true);
      const stripe = await stripePromise;
      if (!stripe) {
        console.error('Error: Stripe no está inicializado. Verifica NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY');
        throw new Error('Error al inicializar Stripe');
      }

      console.log('Iniciando checkout para evento de networking');
      
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: NETWORKING_EVENT.priceId,
          productId: NETWORKING_EVENT.productId,
          quantity: 1,
          mode: 'payment'
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        console.error('Error en la respuesta del servidor:', data);
        throw new Error(data.error || 'Error al crear la sesión de checkout');
      }

      if (!data.sessionId) {
        console.error('Respuesta inválida del servidor:', data);
        throw new Error('Respuesta inválida del servidor');
      }

      console.log('Redirigiendo a checkout con sessionId:', data.sessionId);
      
      const { error } = await stripe.redirectToCheckout({
        sessionId: data.sessionId
      });

      if (error) {
        console.error('Error en redirectToCheckout:', error);
        throw new Error(error.message);
      }
    } catch (error) {
      console.error('Error detallado al procesar el pago:', error);
      toast({
        title: "Error en el Proceso de Pago",
        description: error instanceof Error ? error.message : "Hubo un problema al procesar tu solicitud. Por favor, intenta de nuevo.",
        variant: "destructive",
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
      
      <main className="container mx-auto px-4">
        <div className="py-16 md:py-24 lg:py-32">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="mb-24"
          >
            <BannerImage
              src={product?.images?.[0] || "https://res.cloudinary.com/de4dpzh9c/image/upload/v1741501148/AI_chip_hg8jqt"}
              alt={product?.name || "Evento de Networking"}
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
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                {product?.name || 'Evento de Networking'}
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed">
                {product?.description}
              </p>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12"
            >
              <div className="flex flex-col items-center space-y-4 p-6 rounded-xl bg-secondary/10">
                <Calendar className="h-10 w-10 text-primary" />
                <span className="text-lg">{product?.metadata?.date || '8 de Mayo 2025'}</span>
              </div>
              <div className="flex flex-col items-center space-y-4 p-6 rounded-xl bg-secondary/10">
                <Clock className="h-10 w-10 text-primary" />
                <span className="text-lg">{product?.metadata?.time || '19:00 hrs'}</span>
              </div>
              <div className="flex flex-col items-center space-y-4 p-6 rounded-xl bg-secondary/10">
                <MapPin className="h-10 w-10 text-primary" />
                <span className="text-lg">{product?.metadata?.location || 'Torre Virreyes'}</span>
              </div>
              <div className="flex flex-col items-center space-y-4 p-6 rounded-xl bg-secondary/10">
                <Users className="h-10 w-10 text-primary" />
                <span className="text-lg">Cupo Limitado</span>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Button
                onClick={handleCheckout}
                disabled={isLoading}
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6 h-auto"
              >
                {isLoading ? 'Procesando...' : 'Reservar Lugar'}
              </Button>
            </motion.div>
          </motion.section>
        </div>

        <section className="py-24 lg:py-32">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
              Eventos Anteriores
            </h2>
            <div className="text-xl text-muted-foreground">
              Explora momentos memorables de nuestros eventos pasados
            </div>
          </motion.div>

          {galleryLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {Array.from({ length: 10 }, (_, i) => `skeleton-${i}`).map((id) => (
                <div
                  key={id}
                  className="aspect-square bg-secondary/10 animate-pulse rounded-xl"
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
