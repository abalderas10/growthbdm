"use client";

import { useState } from 'react';
import { Button } from './ui/button';
import { toast } from 'sonner';

interface ImageUploaderProps {
  onUploadSuccess: (imageUrl: string) => void;
}

export function ImageUploader({ onUploadSuccess }: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/cloudinary/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error al subir la imagen');
      }

      const data = await response.json();
      onUploadSuccess(data.secure_url);
      toast.success('Imagen subida exitosamente');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Error al subir la imagen');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id="image-upload"
      />
      <label htmlFor="image-upload">
        <Button
          variant="outline"
          disabled={isUploading}
          className="cursor-pointer"
          asChild
        >
          <span>
            {isUploading ? 'Subiendo...' : 'Seleccionar imagen'}
          </span>
        </Button>
      </label>
    </div>
  );
}
