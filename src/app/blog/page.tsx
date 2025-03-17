import { BlogPostsPreview } from "@/components/BlogPostPreview";
import { BlogPostsPagination } from "@/components/BlogPostsPagination";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ParticleNetwork } from "@/components/ParticleNetwork";
import { wisp } from "@/lib/wisp";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Blog - Growth BDM',
  description: 'Descubre las últimas tendencias y estrategias en desarrollo de negocios inmobiliarios',
  openGraph: {
    title: 'Blog - Growth BDM',
    description: 'Descubre las últimas tendencias y estrategias en desarrollo de negocios inmobiliarios',
    type: 'website',
  },
};

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function BlogPage({ searchParams }: PageProps) {
  const page = searchParams.page ? Number.parseInt(searchParams.page as string, 10) : 1;
  const result = await wisp.getPosts({ limit: 6, page });
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="relative">
        {/* Hero Section */}
        <div className="relative overflow-hidden h-[500px]">
          <ParticleNetwork />
          <div className="relative px-4 py-24 sm:px-6 sm:py-32 lg:py-40 lg:px-8">
            <h1 className="text-center text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
              Publicación Growth
            </h1>
            <p className="mx-auto mt-6 max-w-lg text-center text-xl text-gray-600 dark:text-gray-300 sm:max-w-3xl">
              Descubre las últimas tendencias y estrategias en desarrollo de negocios inmobiliarios
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="relative">
            <BlogPostsPreview posts={result.posts} />
            <div className="mt-8">
              <BlogPostsPagination pagination={result.pagination} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
