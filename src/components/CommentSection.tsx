"use client";

interface CommentSectionProps {
  slug: string;
}

export function CommentSection({ slug }: CommentSectionProps) {
  return (
    <div className="my-8">
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <p className="text-blue-600 dark:text-blue-400 text-center">
          Los comentarios estarán disponibles próximamente.
        </p>
      </div>
    </div>
  );
}
