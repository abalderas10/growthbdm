'use client';

import { motion } from "framer-motion";

interface BlogPostContentProps {
  post: {
    title: string;
    content: string;
    image?: string;
    author?: {
      name?: string;
    };
    publishedAt?: string;
    createdAt: string;
  };
}

export function BlogPostContent({ post }: BlogPostContentProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="my-16"
    >
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          {post.title}
        </h1>
        <div className="mt-4 flex items-center text-gray-500 dark:text-gray-400">
          {post.author?.name && (
            <span className="text-sm">Por {post.author.name}</span>
          )}
          <span className="mx-2">•</span>
          <time className="text-sm">
            {new Date(post.publishedAt || post.createdAt).toLocaleDateString(
              "es-ES",
              {
                year: "numeric",
                month: "long",
                day: "numeric",
              }
            )}
          </time>
        </div>
      </header>

      <div 
        className="prose prose-lg dark:prose-invert max-w-none prose-img:rounded-lg prose-img:w-full prose-img:aspect-[16/9] prose-img:object-cover"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </motion.article>
  );
}
