import Link from "next/link";
import { Pagination } from "@wisp-cms/client";

export const BlogPostsPagination = ({
  pagination,
}: {
  pagination: Pagination;
}) => {
  return (
    <div className="flex justify-center space-x-4">
      {pagination.currentPage > 1 && (
        <Link
          href={`/blog?page=${pagination.currentPage - 1}`}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-white border border-blue-300 rounded-md hover:bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-600 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Anterior
        </Link>
      )}
      {pagination.currentPage < pagination.totalPages && (
        <Link
          href={`/blog?page=${pagination.currentPage + 1}`}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-white border border-blue-300 rounded-md hover:bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-600 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          Siguiente
          <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      )}
    </div>
  );
};
