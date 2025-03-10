import { useState, useEffect } from 'react';

// Tipos para las imágenes de la galería
export interface CloudinaryImage {
  id: string;
  url: string;
  alt: string;
  createdAt: string;
  location?: string;
  eventName?: string;
}

interface CloudinaryApiResponse {
  resources: CloudinaryImage[];
}

export function useCloudinaryGallery() {
  const [images, setImages] = useState<CloudinaryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch('/api/cloudinary');
        
        if (!response.ok) {
          const errorData = await response.text();
          console.error('Error al cargar imágenes:', {
            status: response.status,
            statusText: response.statusText,
            data: errorData
          });
          throw new Error(`Error al cargar las imágenes: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json() as CloudinaryApiResponse;
        
        if (!data.resources || !Array.isArray(data.resources)) {
          console.error('Respuesta inesperada:', data);
          throw new Error('Formato de respuesta inválido');
        }

        // Ordenar por fecha de creación (más recientes primero)
        const sortedImages = [...data.resources].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        console.log('Imágenes cargadas:', {
          total: sortedImages.length,
        });

        setImages(sortedImages);
      } catch (err) {
        console.error('Error detallado:', err);
        setError(err instanceof Error ? err : new Error('Error desconocido'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  return { images, isLoading, error };
}
