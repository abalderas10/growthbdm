import { useQuery } from '@tanstack/react-query';
import type { CloudinaryImage } from '@/lib/types/cloudinary';
import { cloudinaryConfig } from '@/lib/config/cloudinary';

// Función para construir la URL de la API de Cloudinary directamente
// Esta es una alternativa que no requiere credenciales en el servidor
function buildCloudinaryUrl() {
  const cloudName = 'de4dpzh9c'; // Hardcodeado para asegurar que funcione
  const folder = 'GrowthNetworking';
  const timestamp = new Date().getTime();
  
  // URL para acceder a la API de Cloudinary Resources directamente
  // Esta URL pública no requiere API key ni secret
  return `https://res.cloudinary.com/${cloudName}/image/list/${folder}.json?timestamp=${timestamp}`;
}

async function fetchCloudinaryImages(): Promise<CloudinaryImage[]> {
  try {
    console.log('Iniciando solicitud a Cloudinary');
    
    // Primero intentamos usar nuestra API
    try {
      const timestamp = new Date().getTime();
      const response = await fetch(`/api/cloudinary?t=${timestamp}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('Respuesta de API recibida:', {
          totalResources: data.resources?.length || 0
        });
        
        if (data.resources && Array.isArray(data.resources) && data.resources.length > 0) {
          return data.resources;
        }
      }
      
      // Si la API falla, lanzamos un error para pasar al método alternativo
      throw new Error('API interna no disponible');
    } catch (apiError) {
      console.log('Fallback a método alternativo de Cloudinary');
      
      // Método alternativo: usar la API pública de Cloudinary
      const cloudinaryUrl = buildCloudinaryUrl();
      const response = await fetch(cloudinaryUrl, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Error al cargar las imágenes: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Respuesta de Cloudinary directa recibida:', {
        totalResources: data.resources?.length || 0
      });
      
      // Transformar el formato de la respuesta para que coincida con el esperado
      if (data.resources && Array.isArray(data.resources)) {
        return data.resources.map((resource: {
          public_id: string;
          created_at?: string;
          width?: number;
          height?: number;
          format?: string;
        }) => ({
          public_id: resource.public_id,
          secure_url: `https://res.cloudinary.com/de4dpzh9c/image/upload/${resource.public_id}`,
          created_at: resource.created_at || new Date().toISOString(),
          width: resource.width || 800,
          height: resource.height || 600,
          format: resource.format || 'jpg'
        }));
      }
      
      throw new Error('Formato de respuesta inválido');
    }
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
