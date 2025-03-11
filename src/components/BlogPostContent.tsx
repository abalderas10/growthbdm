import type { Post } from '@wisp-cms/client';
import { cn } from '@/lib/utils';
import sanitizeHtml from 'sanitize-html';

interface BlogPostContentProps {
  post: Post;
  className?: string;
}

export function BlogPostContent({ post, className }: BlogPostContentProps) {
  // Configuración de sanitización para HTML
  const sanitizeConfig = {
    allowedTags: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'a', 'ul', 'ol', 'li',
      'strong', 'em', 'code', 'pre', 'blockquote', 'img', 'figure',
      'figcaption', 'div', 'span', 'br'
    ],
    allowedAttributes: {
      'a': ['href', 'target', 'rel'],
      'img': ['src', 'alt', 'title'],
      '*': ['class']
    },
    allowedClasses: {
      '*': ['prose', 'dark:prose-invert', 'lg:prose-lg', 'max-w-none']
    }
  };

  // Sanitizar el contenido HTML
  const sanitizedContent = sanitizeHtml(post.content, sanitizeConfig);

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
      className
    )}>
      <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
    </article>
  );
}
