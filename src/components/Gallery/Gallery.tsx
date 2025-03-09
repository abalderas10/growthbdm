'use client';

import { useState } from 'react';
import { CldImage } from 'next-cloudinary';

const images = [
  {
    id: 'sala_1',
    src: 'GrowthBDM/networking_event',
    alt: 'Sala de Juntas - Evento de Networking',
  },
  {
    id: 'grupo_1',
    src: 'GrowthBDM/event_1',
    alt: 'Networking Grupal',
  },
  {
    id: 'tech_1',
    src: 'AI_chip_hg8jqt',
    alt: 'Tecnología e Innovación',
  },
  {
    id: 'networking_1',
    src: 'GrowthBDM/networking_banner',
    alt: 'Networking y Conexiones',
  }
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div>
      <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
        Galería de Eventos Anteriores
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {images.map((image) => (
          <div
            key={image.id}
            className="relative aspect-[4/3] overflow-hidden rounded-lg cursor-pointer transform hover:scale-105 transition-transform duration-300"
            onClick={() => setSelectedImage(image.src)}
          >
            <CldImage
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
              <p className="absolute bottom-3 left-3 text-white text-sm font-medium">
                {image.alt}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-full max-w-6xl aspect-[4/3]">
            <CldImage
              src={selectedImage}
              alt="Imagen ampliada del evento"
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
            <button
              className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 rounded-full p-2 transition-all duration-300"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
