import { useQuery } from '@tanstack/react-query';
import type { CloudinaryImage } from '@/lib/types/cloudinary';

async function fetchCloudinaryImages(): Promise<CloudinaryImage[]> {
  try {
    console.log('Iniciando solicitud a API de Cloudinary');
    
    // Añadir timestamp para evitar el cacheo en el navegador
    const timestamp = new Date().getTime();
    const response = await fetch(`/api/cloudinary?t=${timestamp}`, {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
    
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
    queryKey: ['cloudinaryImages', new Date().toISOString().slice(0, 10)], // Incluir fecha para forzar refresco diario
    queryFn: fetchCloudinaryImages,
    staleTime: 1000 * 60 * 5, // 5 minutos
    refetchOnWindowFocus: false,
    retry: 3, // Aumentar el número de reintentos
    retryDelay: (attemptIndex) => Math.min(1000 * (2 ** attemptIndex), 10000),
    gcTime: 1000 * 60 * 10, // 10 minutos
  });

  return {
    images: images || [],
    isLoading,
    error,
    refetch
  };
}
