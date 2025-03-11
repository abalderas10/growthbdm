import { wisp } from '@/lib/wisp';
import { BlogPostContent } from '@/components/BlogPostContent';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { Metadata, ResolvingMetadata } from 'next';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import Image from 'next/image';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import type { Post, WispPost, GetPostResult, GetPostsResult } from '@/lib/types/wisp';
import Link from 'next/link';

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const result = await wisp.getPost(params.slug);

  if (!result || !result.post) {
    return {
      title: 'Post no encontrado - Growth BDM',
      description: 'El artículo que buscas no existe o ha sido movido.',
    };
  }

  const previousImages = (await parent).openGraph?.images || [];
  const post = adaptWispPost(result.post as unknown as WispPost);

  return {
    title: `${post.title} - Growth BDM`,
    description: post.description || 'Artículo del blog de Growth BDM',
    openGraph: {
      title: post.title,
      description: post.description || 'Artículo del blog de Growth BDM',
      type: 'article',
      publishedTime: post.createdAt.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      images: post.image ? [post.image, ...previousImages] : previousImages,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description || 'Artículo del blog de Growth BDM',
      images: post.image ? [post.image] : [],
    },
  };
}

function PostHero({ post, formattedDate }: { post: Post; formattedDate: string }) {
  return (
    <div className="relative bg-background py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            {post.title}
          </h1>
          {post.description && (
            <p className="text-xl text-muted-foreground max-w-3xl">
              {post.description}
            </p>
          )}
          <div className="mt-8 text-muted-foreground">
            <time dateTime={post.createdAt.toISOString()}>{formattedDate}</time>
            {post.author?.name && (
              <>
                <span className="mx-2">•</span>
                <span>{post.author.name}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function PostContent({ post }: { post: Post }) {
  return (
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <BlogPostContent post={post} className="mt-8" />
      </div>
    </div>
  );
}

function RelatedPosts({ currentPost, posts }: { currentPost: Post; posts: Post[] }) {
  const relatedPosts = posts
    .filter(post => post.id !== currentPost.id)
    .slice(0, 3);

  if (relatedPosts.length === 0) return null;

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-foreground mb-8">Artículos relacionados</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedPosts.map(post => (
            <Link 
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group block"
            >
              <article className="space-y-4">
                {post.image && (
                  <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                )}
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary">
                  {post.title}
                </h3>
                {post.description && (
                  <p className="text-muted-foreground line-clamp-2">
                    {post.description}
                  </p>
                )}
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  const skeletonLines = [
    { id: 'title', width: 'w-3/4', height: 'h-4' },
    { id: 'subtitle', width: 'w-2/3', height: 'h-4' },
    { id: 'paragraph-1', width: 'w-full', height: 'h-4' },
    { id: 'paragraph-2', width: 'w-5/6', height: 'h-4' },
    { id: 'paragraph-3', width: 'w-4/5', height: 'h-4' },
  ] as const;

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto space-y-4">
        {skeletonLines.map(({ id, width, height }) => (
          <Skeleton 
            key={id}
            className={`${height} ${width}`} 
          />
        ))}
      </div>
    </div>
  );
}

function adaptWispPost(wispPost: WispPost): Post {
  return {
    id: wispPost.id,
    title: wispPost.title,
    description: wispPost.description,
    content: wispPost.content,
    image: wispPost.image,
    slug: wispPost.slug,
    createdAt: new Date(wispPost.createdAt),
    updatedAt: new Date(wispPost.updatedAt),
    publishedAt: wispPost.publishedAt ? new Date(wispPost.publishedAt) : null,
    teamId: wispPost.teamId,
    author: {
      name: wispPost.author.name,
      avatar: wispPost.author.avatar || null
    },
    metadata: {
      category: wispPost.tags[0]?.name,
      tags: wispPost.tags.map(tag => tag.name),
      ...wispPost.metadata
    }
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const [postResult, postsResult] = await Promise.all([
    wisp.getPost(params.slug),
    wisp.getPosts({ limit: 4 })
  ]);

  if (!postResult || !postResult.post) {
    notFound();
  }

  const post = adaptWispPost(postResult.post as unknown as WispPost);
  const relatedPosts = postsResult?.posts?.map(post => adaptWispPost(post as unknown as WispPost)) || [];
  const formattedDate = format(post.createdAt, "d 'de' MMMM, yyyy", { locale: es });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="relative">
        <Suspense fallback={
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto">
              <Skeleton className="h-12 w-3/4 mb-4" />
              <Skeleton className="h-6 w-2/4" />
            </div>
          </div>
        }>
          <PostHero post={post} formattedDate={formattedDate} />
        </Suspense>

        <Suspense fallback={<LoadingSkeleton />}>
          <PostContent post={post} />
        </Suspense>

        <Suspense fallback={null}>
          <RelatedPosts currentPost={post} posts={relatedPosts} />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
