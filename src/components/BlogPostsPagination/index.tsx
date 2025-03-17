'use client';

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

interface BlogPostsPaginationProps {
  pagination: Pagination;
  basePath?: string;
}

export const BlogPostsPagination = ({ 
  pagination,
  basePath = "/blog?page="
}: BlogPostsPaginationProps) => {
  // Si no hay paginación o solo hay una página, no mostrar nada
  if (!pagination) {
    return null;
  }

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

  // Generar array de páginas a mostrar
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Si hay 5 o menos páginas, mostrar todas
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Siempre incluir la primera página
      pages.push(1);
      
      // Calcular el rango de páginas alrededor de la página actual
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      
      // Ajustar si estamos cerca del inicio o final
      if (currentPage <= 2) {
        end = 4;
      } else if (currentPage >= totalPages - 1) {
        start = totalPages - 3;
      }
      
      // Agregar elipsis si es necesario
      if (start > 2) {
        pages.push('...');
      }
      
      // Agregar páginas del rango
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      // Agregar elipsis si es necesario
      if (end < totalPages - 1) {
        pages.push('...');
      }
      
      // Siempre incluir la última página
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <nav className="flex justify-center items-center space-x-2" aria-label="Paginación">
      <Link
        href={`${basePath}${currentPage - 1}`}
        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
          currentPage === 1
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
        aria-disabled={currentPage === 1}
        tabIndex={currentPage === 1 ? -1 : undefined}
      >
        Anterior
      </Link>

      <div className="flex items-center space-x-1">
        {getPageNumbers().map((page, index) => {
          if (page === '...') {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-3 py-2 text-gray-400 dark:text-gray-500"
              >
                ...
              </span>
            );
          }

          return (
            <Link
              key={page}
              href={`${basePath}${page}`}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentPage === page
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </Link>
          );
        })}
      </div>

      <Link
        href={`${basePath}${currentPage + 1}`}
        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
          currentPage === totalPages
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
        aria-disabled={currentPage === totalPages}
        tabIndex={currentPage === totalPages ? -1 : undefined}
      >
        Siguiente
      </Link>
    </nav>
  );
};
