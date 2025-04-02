'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useCloudinaryGallery } from '@/lib/hooks/useCloudinaryGallery';
import { motion, AnimatePresence } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';
import { RefreshCw } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

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

export function ImageGallery() {
  const { images, isLoading, error, refetch } = useCloudinaryGallery();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  if (isLoading) {
    return (
      <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4" aria-label="Cargando galería">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton
            key={`gallery-skeleton-${uuidv4()}`}
            className="aspect-[4/3] rounded-xl bg-primary/5"
          />
        ))}
        <span className="sr-only">Cargando imágenes...</span>
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex flex-col items-center justify-center p-8 rounded-xl bg-destructive/5 text-destructive" aria-label="Error de galería">
        <p className="text-lg font-semibold mb-4">Error al cargar la galería</p>
        <p className="text-sm text-center mb-4">
          {error instanceof Error ? error.message : 'No se pudieron cargar las imágenes. Por favor, intenta nuevamente.'}
        </p>
        <div className="flex gap-4 mt-2">
          <Button
            variant="outline"
            onClick={() => refetch()}
            className="border-destructive/20 hover:bg-destructive/10"
          >
            <RefreshCw className="mr-2 h-4 w-4" aria-hidden="true" />
            Intentar de nuevo
          </Button>
          <Button
            variant="default"
            onClick={() => window.location.reload()}
          >
            Recargar página
          </Button>
        </div>
      </section>
    );
  }

  if (!images || images.length === 0) {
    return (
      <section className="flex flex-col items-center justify-center p-8 rounded-xl bg-primary/5" aria-label="Galería vacía">
        <p className="text-lg font-semibold text-primary mb-2">
          No hay imágenes disponibles
        </p>
        <p className="text-muted-foreground text-center">
          Pronto compartiremos momentos de nuestros eventos.
        </p>
      </section>
    );
  }

  return (
    <>
      <section className="w-full" aria-label="Galería de imágenes">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {images.map((image, index) => (
            <motion.button
              key={image.public_id}
              variants={item}
              className="relative aspect-[4/3] group overflow-hidden rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              onClick={() => setSelectedImage(index)}
              aria-label={`Ver imagen: ${image.context?.alt || 'Imagen de evento'}`}
            >
              <Image
                src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_fill,g_auto,w_800,h_600,q_85/${image.public_id}.${image.format}`}
                alt={image.context?.alt || 'Imagen de evento'}
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                priority={index < 4}
                quality={85}
              />
              <div 
                className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-hidden="true"
              >
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white text-sm truncate">
                    {image.context?.caption || 'Evento'}
                  </p>
                  {image.created_at && (
                    <p className="text-white/80 text-xs mt-1">
                      {new Date(image.created_at).toLocaleDateString('es-MX', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  )}
                </div>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </section>

      <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-7xl max-h-[90vh] p-0 bg-black/95">
          <DialogTitle className="sr-only">Galería de imágenes de eventos</DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 z-50 text-white hover:bg-white/20"
            onClick={() => setSelectedImage(null)}
            aria-label="Cerrar galería"
          >
            <span className="sr-only">Cerrar galería</span>
            <X className="h-6 w-6" />
          </Button>
          
          {selectedImage !== null && (
            <div className="relative w-full h-[85vh]">
              <Image
                src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_fill,g_auto,w_1920,h_1080,q_90/${images[selectedImage].public_id}.${images[selectedImage].format}`}
                alt={images[selectedImage].context?.alt || `Imagen de evento ${selectedImage + 1}`}
                className="object-contain"
                fill
                priority
                quality={90}
                sizes="90vw"
              />
              
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent text-white p-4">
                <p className="text-lg font-medium">
                  {images[selectedImage].context?.caption || `Evento ${selectedImage + 1}`}
                </p>
                <p className="text-sm opacity-90 mt-1">
                  {new Date(images[selectedImage].created_at).toLocaleDateString('es-MX', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              
              {selectedImage > 0 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                  onClick={() => setSelectedImage(selectedImage - 1)}
                  aria-label="Imagen anterior"
                >
                  <span className="sr-only">Imagen anterior</span>
                  <ChevronLeft className="h-8 w-8" />
                </Button>
              )}
              
              {selectedImage < images.length - 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                  onClick={() => setSelectedImage(selectedImage + 1)}
                  aria-label="Siguiente imagen"
                >
                  <span className="sr-only">Siguiente imagen</span>
                  <ChevronRight className="h-8 w-8" />
                </Button>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
