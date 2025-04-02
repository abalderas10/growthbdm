import { useQuery } from '@tanstack/react-query';
import type { CloudinaryImage } from '@/lib/types/cloudinary';
import { cloudinaryConfig } from '@/lib/config/cloudinary';

// Lista de imágenes hardcodeadas como último recurso
// Estas son URLs públicas que no requieren autenticación
const fallbackImages = [
  {
    id: "growth_networking_1",
    public_id: "GrowthNetworking/growth_networking_1",
    secure_url: "https://res.cloudinary.com/de4dpzh9c/image/upload/v1/GrowthNetworking/growth_networking_1",
    created_at: "2025-03-15T10:00:00Z",
    width: 1200,
    height: 800,
    format: "jpg"
  },
  {
    id: "growth_networking_2",
    public_id: "GrowthNetworking/growth_networking_2",
    secure_url: "https://res.cloudinary.com/de4dpzh9c/image/upload/v1/GrowthNetworking/growth_networking_2",
    created_at: "2025-03-16T10:00:00Z",
    width: 1200,
    height: 800,
    format: "jpg"
  },
  {
    id: "growth_networking_3",
    public_id: "GrowthNetworking/growth_networking_3",
    secure_url: "https://res.cloudinary.com/de4dpzh9c/image/upload/v1/GrowthNetworking/growth_networking_3",
    created_at: "2025-03-17T10:00:00Z",
    width: 1200,
    height: 800,
    format: "jpg"
  },
  {
    id: "growth_networking_4",
    public_id: "GrowthNetworking/growth_networking_4",
    secure_url: "https://res.cloudinary.com/de4dpzh9c/image/upload/v1/GrowthNetworking/growth_networking_4",
    created_at: "2025-03-18T10:00:00Z",
    width: 1200,
    height: 800,
    format: "jpg"
  },
  {
    id: "growth_networking_5",
    public_id: "GrowthNetworking/growth_networking_5",
    secure_url: "https://res.cloudinary.com/de4dpzh9c/image/upload/v1/GrowthNetworking/growth_networking_5",
    created_at: "2025-03-19T10:00:00Z",
    width: 1200,
    height: 800,
    format: "jpg"
  },
  {
    id: "growth_networking_6",
    public_id: "GrowthNetworking/growth_networking_6",
    secure_url: "https://res.cloudinary.com/de4dpzh9c/image/upload/v1/GrowthNetworking/growth_networking_6",
    created_at: "2025-03-20T10:00:00Z",
    width: 1200,
    height: 800,
    format: "jpg"
  }
];

async function fetchCloudinaryImages(): Promise<CloudinaryImage[]> {
  try {
    console.log('Iniciando solicitud a Cloudinary');
    
    // Primer método: API interna
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
        console.log('Respuesta de API interna recibida:', {
          totalResources: data.resources?.length || 0
        });
        
        if (data.resources && Array.isArray(data.resources) && data.resources.length > 0) {
          return data.resources;
        }
      }
      
      throw new Error('API interna no disponible');
    } catch (apiError) {
      console.log('Primer método falló, intentando segundo método');
      
      // Segundo método: API pública directa
      try {
        // Usar la API de transformación de Cloudinary para obtener imágenes por prefijo
        // Esta URL es pública y no requiere autenticación
        const cloudName = 'de4dpzh9c';
        const timestamp = new Date().getTime();
        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/resources/image/upload?prefix=GrowthNetworking&max_results=100&timestamp=${timestamp}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log('Respuesta de API pública recibida:', {
            totalResources: data.resources?.length || 0
          });
          
          if (data.resources && Array.isArray(data.resources) && data.resources.length > 0) {
            // Transformar los datos para asegurar que cumplen con la interfaz CloudinaryImage
            return data.resources.map((resource: {
              public_id: string;
              secure_url?: string;
              created_at?: string;
              width?: number;
              height?: number;
              format?: string;
            }) => ({
              id: resource.public_id.split('/').pop() || resource.public_id,
              public_id: resource.public_id,
              secure_url: resource.secure_url || `https://res.cloudinary.com/de4dpzh9c/image/upload/${resource.public_id}`,
              created_at: resource.created_at || new Date().toISOString(),
              width: resource.width || 800,
              height: resource.height || 600,
              format: resource.format || 'jpg'
            }));
          }
        }
        
        throw new Error(`Error en API pública: ${response.status}`);
      } catch (publicApiError) {
        console.log('Segundo método falló, usando imágenes de respaldo');
        
        // Tercer método: Usar imágenes hardcodeadas como último recurso
        console.log('Usando imágenes de respaldo hardcodeadas');
        return fallbackImages;
      }
    }
  } catch (error) {
    console.error('Error al cargar imágenes de Cloudinary:', error);
    
    // Si todo falla, devolver las imágenes de respaldo
    console.log('Usando imágenes de respaldo después de error general');
    return fallbackImages;
  }
}

export function useCloudinaryGallery() {
  const {
    data: images,
    isLoading,
    error,
    refetch
  } = useQuery<CloudinaryImage[], Error>({
    queryKey: ['cloudinaryImages', new Date().toISOString().slice(0, 10)],
    queryFn: fetchCloudinaryImages,
    staleTime: 1000 * 60 * 5, // 5 minutos
    refetchOnWindowFocus: false,
    retry: 3,
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
