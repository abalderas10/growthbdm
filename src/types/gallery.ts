export interface ImageProps {
  id: number;
  height: number;
  width: number;
  public_id: string;
  format: string;
}

export interface SharedModalProps {
  index: number;
  images: ImageProps[];
  changePhotoId: (newId: number) => void;
  closeModal: () => void;
  navigation: boolean;
  currentPhoto: ImageProps;
  direction?: number;
}
