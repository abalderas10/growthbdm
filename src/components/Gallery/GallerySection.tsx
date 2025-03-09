'use client';

import { useState } from 'react';
import { CldImage } from 'next-cloudinary';
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface Image {
  id: string;
  title: string;
  description: string;
  width: number;
  height: number;
}

interface GallerySectionProps {
  images: Image[];
}

export function GallerySection({ images }: GallerySectionProps) {
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Eventos Anteriores</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((image) => (
            <div
              key={image.id}
              className="group relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg cursor-pointer bg-gray-100 dark:bg-gray-800"
              onClick={() => setSelectedImage(image)}
            >
              <CldImage
                src={`GrowthBDM/${image.id}`}
                alt={image.title}
                width={600}
                height={450}
                className="object-cover w-full h-full transform transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 flex items-end">
                <div className="p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-lg font-semibold mb-1">{image.title}</h3>
                  <p className="text-sm line-clamp-2">{image.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-4xl p-0 overflow-hidden bg-transparent border-none">
            {selectedImage && (
              <div className="relative rounded-lg overflow-hidden">
                <CldImage
                  src={`GrowthBDM/${selectedImage.id}`}
                  alt={selectedImage.title}
                  width={selectedImage.width}
                  height={selectedImage.height}
                  className="w-full h-auto"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                  <h2 className="text-2xl font-bold mb-2">{selectedImage.title}</h2>
                  <p className="text-lg">{selectedImage.description}</p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
