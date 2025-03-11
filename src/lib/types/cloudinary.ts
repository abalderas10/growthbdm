export interface CloudinaryImage {
  id: string;
  height: number;
  width: number;
  public_id: string;
  format: string;
  blurDataUrl?: string;
  created_at: string;
  context?: {
    alt?: string;
    caption?: string;
    location?: string;
  };
}

export interface CloudinaryResponse {
  resources: CloudinaryImage[];
  next_cursor: string | null;
  total_count: number;
}
