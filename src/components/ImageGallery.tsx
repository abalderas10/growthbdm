import { useState, useEffect, useCallback } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X, Calendar, MapPin } from 'lucide-react';
import type { CloudinaryImage } from '@/lib/hooks/useCloudinaryGallery';

interface ImageGalleryProps {
  images: CloudinaryImage[];
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Precarga de imágenes
  useEffect(() => {
    const imagePromises = images.map((image) => {
      return new Promise<void>((resolve, reject) => {
        const img = new window.Image();
        img.src = image.url;
        img.onload = () => resolve();
        img.onerror = (error) => reject(error);
      });
    });

    Promise.all(imagePromises)
      .then(() => setIsLoading(false))
      .catch((error) => console.error('Error al precargar imágenes:', error));
  }, [images]);

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

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {Array.from({ length: 10 }, (_, i) => `skeleton-${i}`).map((id) => (
          <div
            key={id}
            className="aspect-square bg-gray-200 animate-pulse rounded-lg"
          />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 py-16">
        {images.map((image, index) => (
          <button
            key={image.id}
            className="relative aspect-square overflow-hidden rounded-lg group focus:outline-none focus:ring-2 focus:ring-primary"
            onClick={() => setSelectedImage(index)}
            onKeyDown={(e: ReactKeyboardEvent<HTMLButtonElement>) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSelectedImage(index);
              }
            }}
            aria-label={`Ver ${image.alt}`}
          >
            <Image
              src={image.url}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
              quality={80}
            />
            <div 
              className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"
              aria-hidden="true"
            />
          </button>
        ))}
      </div>

      <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 bg-black/90">
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
            <div className="relative w-full h-[80vh]">
              <Image
                src={images[selectedImage].url}
                alt={images[selectedImage].alt}
                fill
                className="object-contain"
                quality={100}
                priority
              />
              
              {/* Información de la imagen */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4">
                <div className="flex flex-wrap gap-4 items-center text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(images[selectedImage].createdAt).toLocaleDateString('es-MX', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</span>
                  </div>
                  {images[selectedImage].location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{images[selectedImage].location}</span>
                    </div>
                  )}
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
