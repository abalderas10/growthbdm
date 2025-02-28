import { Post } from "@wisp-cms/client";
import Image from "next/image";

export const BlogPostContent = ({ post }: { post: Post }) => {
  return (
    <article className="prose dark:prose-invert lg:prose-lg max-w-none">
      {post.image && (
        <div className="relative w-full h-[400px] mb-8">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover rounded-lg"
            priority
            sizes="100vw"
          />
        </div>
      )}
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
};
