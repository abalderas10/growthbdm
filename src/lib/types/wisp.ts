import type { GetPostResult, GetPostsResult } from '@wisp-cms/client';

export interface WispAuthor {
  id: string;
  name: string;
  email: string;
  avatar?: string | null;
}

export interface WispTag {
  id: string;
  name: string;
}

export interface WispPost {
  id: string;
  title: string;
  description: string | null;
  content: string;
  image: string | null;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  teamId: string;
  metadata: Record<string, unknown> | null;
  author: WispAuthor;
  tags: WispTag[];
}

export interface PostMetadata {
  category?: string;
  tags?: string[];
  readingTime?: number;
  [key: string]: unknown;
}

export interface PostAuthor {
  name: string | null;
  avatar: string | null;
}

export interface Post {
  id: string;
  title: string;
  description: string | null;
  content: string;
  image: string | null;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date | null;
  teamId?: string;
  metadata: PostMetadata | null;
  author: PostAuthor | null;
}

export type { GetPostResult, GetPostsResult };
