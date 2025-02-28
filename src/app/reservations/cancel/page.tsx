"use client";

import { XCircle } from 'lucide-react';
import Link from 'next/link';

export default function CancelPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
        <div className="text-center">
          <XCircle className="mx-auto h-12 w-12 text-red-500" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
            Reservación Cancelada
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Tu proceso de reservación ha sido cancelado.
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <div className="text-sm text-gray-500 dark:text-gray-400 text-center">
            Si tuviste algún problema durante el proceso, por favor contáctanos.
          </div>

          <div className="flex justify-center space-x-4">
            <Link
              href="/networking"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Intentar de nuevo
            </Link>
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
