import { useQuery } from '@tanstack/react-query';
import type { CloudinaryImage } from '@/lib/types/cloudinary';

async function fetchCloudinaryImages(): Promise<CloudinaryImage[]> {
  try {
    console.log('Iniciando solicitud a API de Cloudinary');
    const response = await fetch('/api/cloudinary');
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Error en la respuesta de Cloudinary:', {
        status: response.status,
        statusText: response.statusText,
        errorData
      });
      throw new Error(`Error al cargar las imágenes: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Respuesta de Cloudinary recibida:', {
      totalResources: data.resources?.length || 0,
      hasResources: !!data.resources,
      isArray: Array.isArray(data.resources)
    });
    
    if (!data.resources || !Array.isArray(data.resources)) {
      console.error('Formato de respuesta de Cloudinary inválido:', data);
      throw new Error('Formato de respuesta inválido');
    }
    
    return data.resources;
  } catch (error) {
    console.error('Error al cargar imágenes de Cloudinary:', error);
    throw error;
  }
}

export function useCloudinaryGallery() {
  const {
    data: images,
    isLoading,
    error,
    refetch
  } = useQuery<CloudinaryImage[], Error>({
    queryKey: ['cloudinaryImages'],
    queryFn: fetchCloudinaryImages,
    staleTime: 1000 * 60 * 5, // 5 minutos
    refetchOnWindowFocus: false,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * (2 ** attemptIndex), 10000),
  });

  return {
    images: images || [],
    isLoading,
    error,
    refetch
  };
}
