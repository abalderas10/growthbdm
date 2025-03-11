'use client';

import Image from 'next/image';
import { useState } from 'react';

interface BannerImageProps {
  src: string;
  alt: string;
  className?: string;
}

const DEFAULT_IMAGE = 'https://res.cloudinary.com/de4dpzh9c/image/upload/v1741501148/AI_chip_hg8jqt';

export function BannerImage({ 
  src, 
  alt, 
  className = ''
}: BannerImageProps) {
  const [error, setError] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <Image
        src={error ? DEFAULT_IMAGE : src}
        alt={alt}
        fill
        className="object-cover"
        onError={() => setError(true)}
        quality={90}
        priority
        sizes="100vw"
      />
    </div>
  );
}
