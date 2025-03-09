import { CldImage } from 'next-cloudinary';
import type { ImageProps } from '@/types/gallery';

export async function getCloudinaryImages(prefix: string = 'GrowthBDM/'): Promise<ImageProps[]> {
  // For now, return static images since we can't use the Cloudinary API directly in the browser
  return [
    {
      id: 0,
      height: 1080,
      width: 1920,
      public_id: 'GrowthBDM/networking_banner',
      format: 'jpg'
    },
    {
      id: 1,
      height: 1080,
      width: 1920,
      public_id: 'GrowthBDM/event_1',
      format: 'jpg'
    },
    {
      id: 2,
      height: 1080,
      width: 1920,
      public_id: 'GrowthBDM/event_2',
      format: 'jpg'
    },
    {
      id: 3,
      height: 1080,
      width: 1920,
      public_id: 'GrowthBDM/event_3',
      format: 'jpg'
    }
  ];
}
