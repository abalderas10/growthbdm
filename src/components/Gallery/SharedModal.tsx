'use client';

import { Dialog } from "@/components/ui/dialog";
import { useSwipeable } from 'react-swipeable';
import { CldImage } from 'next-cloudinary';
import { ArrowLeftIcon, ArrowRightIcon, XIcon } from 'lucide-react';
import type { SharedModalProps } from '@/types/gallery';

export default function SharedModal({
  index,
  images,
  changePhotoId,
  closeModal,
  navigation,
  currentPhoto,
  direction = 1,
}: SharedModalProps) {

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (index < images.length - 1) {
        changePhotoId(index + 1);
      }
    },
    onSwipedRight: () => {
      if (index > 0) {
        changePhotoId(index - 1);
      }
    },
    trackMouse: true
  });

  return (
    <Dialog.Content className="fixed inset-0 flex items-center justify-center bg-black/90">
      <div className="relative w-full h-full max-w-7xl mx-auto flex items-center">
        {/* Close button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 p-2 text-white/75 hover:text-white transition-colors"
        >
          <XIcon className="w-6 h-6" />
        </button>

        {/* Navigation arrows */}
        {navigation && (
          <>
            {index > 0 && (
              <button
                className="absolute left-4 p-2 text-white/75 hover:text-white transition-colors"
                onClick={() => changePhotoId(index - 1)}
              >
                <ArrowLeftIcon className="w-6 h-6" />
              </button>
            )}
            {index + 1 < images.length && (
              <button
                className="absolute right-4 p-2 text-white/75 hover:text-white transition-colors"
                onClick={() => changePhotoId(index + 1)}
              >
                <ArrowRightIcon className="w-6 h-6" />
              </button>
            )}
          </>
        )}

        {/* Main image */}
        <div
          {...handlers}
          className="w-full h-full flex items-center justify-center p-4 cursor-grab active:cursor-grabbing"
        >
          <div className="relative aspect-video max-h-[80vh] w-auto">
            <CldImage
              src={currentPhoto.public_id}
              alt={`Evento ${index + 1}`}
              width={1920}
              height={1080}
              className="object-contain w-full h-full"
              priority
            />
          </div>
        </div>
      </div>
    </Dialog.Content>
  );
}
