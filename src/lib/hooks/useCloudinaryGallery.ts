'use client';

import { useState, useEffect } from 'react';
import type { CloudinaryImage, CloudinaryResponse } from '@/lib/types/cloudinary';
import { useQuery } from '@tanstack/react-query';

async function fetchCloudinaryImages(): Promise<CloudinaryImage[]> {
  const response = await fetch('/api/cloudinary');
  if (!response.ok) {
    throw new Error('Error al cargar las imágenes');
  }
  const data: CloudinaryResponse = await response.json();
  return data.resources;
}

export function useCloudinaryGallery() {
  const {
    data: images = [],
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['cloudinaryImages'],
    queryFn: fetchCloudinaryImages,
    staleTime: 5 * 60 * 1000, // 5 minutos
    refetchOnWindowFocus: false,
  });

  return {
    images,
    isLoading,
    error,
    refetch
  };
}
