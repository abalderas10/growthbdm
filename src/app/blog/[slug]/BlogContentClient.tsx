"use client";

import { BlogPostContent } from "@/components/BlogPostContent";
import { CommentSection } from "@/components/CommentSection";
import { RelatedPosts } from "@/components/RelatedPosts";
import type { Post } from "@wisp-cms/client";

interface BlogContentClientProps {
  post: Post;
  relatedPosts: Post[];
  slug: string;
}

export default function BlogContentClient({ post, relatedPosts, slug }: BlogContentClientProps) {
  return (
    <>
      <BlogPostContent post={post} />
      <RelatedPosts posts={relatedPosts} />
      <CommentSection slug={slug} />
    </>
  );
}
