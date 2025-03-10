'use client';

import { motion } from "framer-motion";
import { CldImage } from 'next-cloudinary';

interface BannerImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export function BannerImage({ src, alt, width, height, priority = false }: BannerImageProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      transition={{ delay: 0.3 }}
      className="relative aspect-video rounded-lg overflow-hidden shadow-lg mx-auto max-w-4xl mb-16"
    >
      <CldImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="object-cover w-full h-full"
        priority={priority}
      />
    </motion.div>
  );
}
