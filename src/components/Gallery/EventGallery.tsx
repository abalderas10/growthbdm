'use client';

import { motion } from "framer-motion";
import { CldImage } from 'next-cloudinary';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const GALLERY_IMAGES = [
  { src: 'AI_chip_hg8jqt', alt: 'AI Networking Event' },
] as const;

export function EventGallery() {
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      transition={{ delay: 0.4 }}
      className="w-full bg-gray-100 dark:bg-gray-800 py-16 -mx-4"
    >
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Galería de Eventos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_IMAGES.map((image, index) => (
            <div key={image.src} className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
              <CldImage
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
                priority={index < 4}
              />
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
