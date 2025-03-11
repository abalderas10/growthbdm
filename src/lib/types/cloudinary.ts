export interface CloudinaryImage {
  public_id: string;
  secure_url: string;
  created_at: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  context?: {
    alt?: string;
    caption?: string;
    location?: string;
  };
  tags?: string[];
}

export interface CloudinaryResponse {
  resources: CloudinaryImage[];
  next_cursor?: string;
  rate_limit_remaining?: number;
  rate_limit_reset_at?: string;
}
