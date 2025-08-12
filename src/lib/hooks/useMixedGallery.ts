import { useState, useEffect } from 'react';
import { useCloudinaryGallery } from './useCloudinaryGallery';
import { fallbackGalleryImages } from '../data/fallbackGalleryImages';
import { CloudinaryImage } from '../types/cloudinary';

/**
 * Hook para obtener imágenes de galería con un enfoque mixto
 * Utiliza imágenes de Cloudinary cuando están disponibles
 * y recurre a imágenes locales de respaldo cuando hay errores
 */
export function useMixedGallery() {
  const { images: cloudinaryImages, isLoading, error, refetch } = useCloudinaryGallery();
  const [mixedImages, setMixedImages] = useState<CloudinaryImage[]>([]);
  const [isUsingFallback, setIsUsingFallback] = useState(false);

  useEffect(() => {
    // Si hay imágenes de Cloudinary y no hay errores, úsalas
    if (cloudinaryImages && cloudinaryImages.length > 0 && !error) {
      console.log('Usando imágenes de Cloudinary:', cloudinaryImages.length);
      setMixedImages(cloudinaryImages);
      setIsUsingFallback(false);
      return;
    }

    // Si hay un error o no hay imágenes, usa las imágenes de respaldo
    if (error || !cloudinaryImages || cloudinaryImages.length === 0) {
      console.log('Usando imágenes de respaldo debido a:', error ? 'error' : 'sin imágenes');
      // Transformar las imágenes de respaldo para que tengan la estructura correcta
      const fallbackImages = fallbackGalleryImages.map((image) => ({
        ...image,
        // Asegurarse de que la fecha sea actual
        created_at: new Date().toISOString(),
      }));
      
      setMixedImages(fallbackImages);
      setIsUsingFallback(true);
    }
  }, [cloudinaryImages, error]);

  return {
    images: mixedImages,
    isLoading,
    error,
    refetch,
    isUsingFallback
  };
}