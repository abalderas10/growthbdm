import { CldOptions } from 'next-cloudinary';

export const cloudinaryConfig: CldOptions = {
  uploadPreset: "growthbdm_preset",
};

export const CLOUDINARY_FOLDERS = {
  GALLERY: "GrowthBDM",
  EVENTS: "GrowthBDM/events",
  BLOG: "GrowthBDM/blog"
} as const;
