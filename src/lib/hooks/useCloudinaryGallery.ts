import { useQuery } from '@tanstack/react-query';
import type { CloudinaryImage } from '@/lib/types/cloudinary';

async function fetchCloudinaryImages(): Promise<CloudinaryImage[]> {
  const response = await fetch('/api/cloudinary');
  if (!response.ok) {
    throw new Error('Error al cargar las imágenes');
  }
  const data = await response.json();
  return data.resources;
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
  });

  return {
    images: images || [],
    isLoading,
    error,
    refetch
  };
}
