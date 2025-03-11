import { wisp } from '@/lib/wisp';
import { BlogPostContent } from '@/components/BlogPostContent';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ParticleNetwork } from '@/components/ParticleNetwork';
import type { Metadata, ResolvingMetadata } from 'next';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

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
  const post = result.post;

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

export default async function BlogPostPage({ params }: PageProps) {
  const result = await wisp.getPost(params.slug);

  if (!result || !result.post) {
    notFound();
  }

  const post = result.post;
  const formattedDate = format(post.createdAt, "d 'de' MMMM, yyyy", { locale: es });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="relative">
        {/* Hero Section con imagen de portada */}
        <div className="relative overflow-hidden h-[400px] md:h-[500px]">
          {post.image ? (
            <div className="absolute inset-0">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50" />
            </div>
          ) : (
            <ParticleNetwork />
          )}
          
          <div className="relative h-full flex items-center">
            <div className="container mx-auto px-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-6">
                {post.title}
              </h1>
              {post.description && (
                <p className="text-xl text-gray-200 text-center max-w-3xl mx-auto">
                  {post.description}
                </p>
              )}
              <div className="text-center mt-8 text-gray-300">
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

        {/* Contenido del Post */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <BlogPostContent post={post} className="mt-8" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
