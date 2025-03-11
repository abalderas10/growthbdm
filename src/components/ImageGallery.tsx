'use client';

import { useState, useEffect, useCallback } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X, Calendar, MapPin } from 'lucide-react';
import { useCloudinaryGallery } from '@/lib/hooks/useCloudinaryGallery';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';
import { RefreshCw } from 'lucide-react';
import type { CloudinaryImage } from '@/lib/types/cloudinary';

interface ImageGalleryProps {
  images: CloudinaryImage[];
}

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
      <output className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4" aria-label="Cargando galería">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton
            key={`skeleton-${i}-${Date.now()}`}
            className="aspect-[4/3] rounded-xl bg-primary/5"
          />
        ))}
        <span className="sr-only">Cargando imágenes...</span>
      </output>
    );
  }

  if (error) {
    return (
      <output className="flex flex-col items-center justify-center p-8 rounded-xl bg-destructive/5 text-destructive" aria-live="polite">
        <p className="text-lg font-semibold mb-4">Error al cargar la galería</p>
        <Button
          variant="outline"
          onClick={() => refetch()}
          className="border-destructive/20 hover:bg-destructive/10"
        >
          <RefreshCw className="mr-2 h-4 w-4" aria-hidden="true" />
          Intentar de nuevo
        </Button>
      </output>
    );
  }

  if (!images || images.length === 0) {
    return (
      <output className="flex flex-col items-center justify-center p-8 rounded-xl bg-primary/5" aria-live="polite">
        <p className="text-lg font-semibold text-primary mb-2">
          No hay imágenes disponibles
        </p>
        <p className="text-muted-foreground text-center">
          Pronto compartiremos momentos de nuestros eventos.
        </p>
      </output>
    );
  }

  const handlePrevious = useCallback(() => {
    if (selectedImage === null) return;
    setSelectedImage(selectedImage === 0 ? images.length - 1 : selectedImage - 1);
  }, [selectedImage, images.length]);

  const handleNext = useCallback(() => {
    if (selectedImage === null) return;
    setSelectedImage(selectedImage === images.length - 1 ? 0 : selectedImage + 1);
  }, [selectedImage, images.length]);

  const handleKeyDown = useCallback((e: globalThis.KeyboardEvent) => {
    if (selectedImage === null) return;
    if (e.key === 'ArrowLeft') handlePrevious();
    if (e.key === 'ArrowRight') handleNext();
    if (e.key === 'Escape') setSelectedImage(null);
  }, [selectedImage, handlePrevious, handleNext]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <>
      <table className="w-full border-collapse" role="presentation">
        <tbody>
          <tr>
            <td>
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
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedImage(index);
                      }
                    }}
                    aria-label={`Ver imagen: ${image.context?.alt || 'Imagen de evento'}`}
                  >
                    <img
                      src={image.secure_url}
                      alt={image.context?.alt || 'Imagen de evento'}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
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
            </td>
          </tr>
        </tbody>
      </table>

      <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-7xl max-h-[90vh] p-0 bg-black/95">
          <Button
            variant="ghost"
            size="icon"
            type="button"
            className="absolute right-4 top-4 z-50 text-white hover:bg-white/20"
            onClick={() => setSelectedImage(null)}
            aria-label="Cerrar galería"
          >
            <X className="h-6 w-6" />
          </Button>
          
          {selectedImage !== null && (
            <div className="relative w-full h-[85vh]">
              <img
                src={images[selectedImage].secure_url}
                alt={images[selectedImage].context?.alt || `Imagen de evento ${selectedImage + 1}`}
                className="w-full h-full object-contain"
              />
              
              {/* Información de la imagen */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent text-white p-4">
                <div className="flex flex-col gap-2">
                  <p className="text-lg font-medium">{images[selectedImage].context?.caption || `Evento ${selectedImage + 1}`}</p>
                  <div className="flex flex-wrap gap-4 items-center text-sm opacity-90">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(images[selectedImage].created_at).toLocaleDateString('es-MX', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                type="button"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                onClick={handlePrevious}
                aria-label="Imagen anterior"
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                onClick={handleNext}
                aria-label="Siguiente imagen"
              >
                <ChevronRight className="h-8 w-8" />
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
