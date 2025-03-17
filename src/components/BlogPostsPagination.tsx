import Link from "next/link";

// Definir interfaz Pagination localmente en lugar de importarla
export interface Pagination {
  // Propiedades que pueden venir del cliente Wisp
  total?: number;
  limit?: number | "all"; // Puede ser un número o la cadena "all"
  page?: number;
  currentPage?: number;
  totalPages?: number;
  // Otras propiedades que pueden venir del cliente Wisp
  count?: number;
  pageCount?: number;
}

export const BlogPostsPagination = ({
  pagination,
  basePath = "/blog?page="
}: {
  pagination: Pagination;
  basePath?: string;
}) => {
  // Calcular currentPage y totalPages si no están presentes
  const currentPage = pagination.currentPage || pagination.page || 1;
  const totalPages = pagination.totalPages || 
                    (pagination.total && pagination.limit && pagination.limit !== "all"
                      ? Math.ceil(pagination.total / pagination.limit) 
                      : pagination.pageCount || 1);

  // Si solo hay una página, no mostrar la paginación
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex justify-center space-x-4">
      {currentPage > 1 && (
        <Link
          href={`${basePath}${currentPage - 1}`}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-white border border-blue-300 rounded-md hover:bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-600 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Anterior
        </Link>
      )}
      {currentPage < totalPages && (
        <Link
          href={`${basePath}${currentPage + 1}`}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-white border border-blue-300 rounded-md hover:bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-600 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          Siguiente
          <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      )}
    </div>
  );
};
