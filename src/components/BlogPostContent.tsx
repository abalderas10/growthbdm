'use client';

import type { Post } from '@/lib/types/wisp';
import { cn } from '@/lib/utils';
import sanitizeHtml from 'sanitize-html';
import { useEffect, useState } from 'react';

interface BlogPostContentProps {
  post: Post;
  className?: string;
}

interface SanitizeTagAttribs {
  href?: string;
  target?: string;
  rel?: string;
  src?: string;
  alt?: string;
  title?: string;
  width?: string;
  height?: string;
  loading?: string;
  decoding?: string;
  class?: string;
}

function transformImageToNextImage(content: string): string {
  if (typeof window === 'undefined') return content;

  const parser = new DOMParser();
  const doc = parser.parseFromString(content, 'text/html');
  const images = Array.from(doc.getElementsByTagName('img'));

  for (const img of images) {
    const src = img.getAttribute('src');
    const alt = img.getAttribute('alt') || '';
    const width = img.getAttribute('width');
    const height = img.getAttribute('height');

    if (src && img.parentNode) {
      const nextImageHtml = `<div class="relative w-full aspect-video my-8">
        <img
          src="${src}"
          alt="${alt}"
          width="${width || '1920'}"
          height="${height || '1080'}"
          class="next-image object-cover rounded-lg"
          loading="lazy"
          decoding="async"
        />
      </div>`;
      
      const wrapper = doc.createElement('div');
      wrapper.innerHTML = nextImageHtml;
      const newElement = wrapper.firstElementChild;
      if (newElement) {
        img.parentNode.replaceChild(newElement, img);
      }
    }
  }

  return doc.body.innerHTML;
}

export function BlogPostContent({ post, className }: BlogPostContentProps) {
  const [content, setContent] = useState(post.content);

  useEffect(() => {
    const transformedContent = transformImageToNextImage(post.content);
    setContent(transformedContent);
  }, [post.content]);

  // Configuración de sanitización para HTML
  const sanitizeConfig = {
    allowedTags: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'a', 'ul', 'ol', 'li',
      'strong', 'em', 'code', 'pre', 'blockquote', 'img', 'figure',
      'figcaption', 'div', 'span', 'br'
    ],
    allowedAttributes: {
      'a': ['href', 'target', 'rel'],
      'img': ['src', 'alt', 'title', 'width', 'height', 'loading', 'decoding', 'class'],
      'div': ['class'],
      '*': ['class']
    },
    allowedClasses: {
      '*': ['prose', 'dark:prose-invert', 'lg:prose-lg', 'max-w-none', 'relative', 'w-full', 'aspect-video', 'my-8', 'next-image', 'object-cover', 'rounded-lg'],
    },
    transformTags: {
      'a': (tagName: string, attribs: SanitizeTagAttribs) => ({
        tagName,
        attribs: {
          ...attribs,
          target: '_blank',
          rel: 'noopener noreferrer'
        }
      })
    }
  };

  // Sanitizar el contenido HTML
  const sanitizedContent = sanitizeHtml(content, sanitizeConfig);

  return (
    <article className={cn(
      'prose dark:prose-invert lg:prose-lg max-w-none',
      // Personalización de estilos de prosa
      'prose-headings:text-foreground',
      'prose-p:text-muted-foreground',
      'prose-a:text-primary hover:prose-a:text-primary/80',
      'prose-strong:text-foreground',
      'prose-code:text-primary',
      'prose-pre:bg-muted',
      'prose-blockquote:text-muted-foreground prose-blockquote:border-l-primary',
      '[&_.next-image]:rounded-lg [&_.next-image]:shadow-lg',
      className
    )}>
      <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
    </article>
  );
}
