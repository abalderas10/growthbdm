'use client';

import { Post } from "@wisp-cms/client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface BlogPostsPreviewProps {
  posts: Post[];
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20
    }
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const BlogPostsPreview = ({ posts }: BlogPostsPreviewProps) => {
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-300">No hay publicaciones disponibles.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {posts.map((post) => (
        <motion.article
          key={post.id}
          variants={cardVariants}
          className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-200"
        >
          {post.image && (
            <div className="relative h-48 w-full">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
          )}
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <Link href={`/blog/${post.slug}`} className="hover:underline">
                {post.title}
              </Link>
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
              {post.description}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {new Date(post.publishedAt || post.createdAt).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
              <Link
                href={`/blog/${post.slug}`}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium inline-flex items-center group"
              >
                Leer más
                <svg 
                  className="ml-1 w-4 h-4 transform transition-transform group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </motion.article>
      ))}
    </motion.div>
  );
};
