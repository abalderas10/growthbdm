"use client";

import { useQuery } from "@tanstack/react-query";
import { wisp } from "@/lib/wisp";
import { CommentForm } from "./CommentForm";
import { CommentList } from "./CommentList";
import { Skeleton } from "./ui/skeleton";

interface CommentSectionProps {
  slug: string;
}

export function CommentSection({ slug }: CommentSectionProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["comments", slug],
    queryFn: () => wisp.getComments({ slug, page: 1, limit: "all" }),
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-8 w-32 mt-8" />
        <div className="space-y-4 mt-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    );
  }

  if (!data?.config.enabled) {
    return null;
  }

  return (
    <div className="my-8">
      <h2 className="mb-8 text-2xl font-bold tracking-tight">Agregar Comentario</h2>
      <CommentForm slug={slug} config={data.config} />
      <h2 className="mb-8 mt-16 text-2xl font-bold tracking-tight">Comentarios</h2>
      <CommentList
        comments={data.comments}
        pagination={data.pagination}
        config={data.config}
        isLoading={isLoading}
      />
    </div>
  );
}
