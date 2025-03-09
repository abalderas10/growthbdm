'use client';

import { Dialog } from "@/components/ui/dialog";
import { useCallback, useEffect, useState } from "react";

export default function Modal({
  images,
  onClose,
  index,
  changePhotoId,
  currentPhoto,
  direction,
  visible,
}: {
  images?: any[];
  onClose?: any;
  index: number;
  changePhotoId?: (id: number) => void;
  currentPhoto?: any;
  direction?: number;
  visible: boolean;
}) {
  const [isOpen, setIsOpen] = useState(visible);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    onClose();
  }, [onClose]);

  useEffect(() => {
    setIsOpen(visible);
  }, [visible]);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <div className="fixed inset-0 z-50">
        <div className="absolute inset-0 bg-black backdrop-blur-2xl">
          <div className="mx-auto">
            <div className="transform rounded-lg">
              <div className="relative">
                {/* Contenido del modal aquí */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
