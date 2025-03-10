'use client';

import { motion } from "framer-motion";
import { CldImage } from 'next-cloudinary';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  location?: string;
  date?: string;
}

interface GalleryProps {
  images: GalleryImage[];
  title?: string;
  className?: string;
  imageClassName?: string;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export function Gallery({ images, title, className = "", imageClassName = "" }: GalleryProps) {
  return (
    <section className={className}>
      {title && (
        <motion.h2
          className="text-3xl font-bold mb-8"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          {title}
        </motion.h2>
      )}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ delay: 0.4 }}
      >
        {images.map((image) => (
          <motion.div
            key={image.id}
            className="group relative overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <CldImage
              src={image.src}
              alt={image.alt}
              width={600}
              height={600}
              className={`object-cover w-full h-full ${imageClassName}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <h3 className="text-white text-lg font-semibold">{image.alt}</h3>
              {image.location && (
                <p className="text-white/90 text-sm mt-1">
                  {image.location}
                </p>
              )}
              {image.date && (
                <p className="text-white/80 text-sm">
                  {image.date}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
