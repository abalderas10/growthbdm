"use client";

import { FunctionComponent } from "react";
import Link from 'next/link';
import Image from 'next/image';

export const Hero: FunctionComponent = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center overflow-hidden pt-[80px]">
      {/* Background with gradient and pattern */}
      <div className="absolute inset-0 w-full bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gray-900/20 rounded-full filter blur-3xl"></div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
            Growth Business{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-gray-900">
              Development
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mx-auto leading-relaxed max-w-3xl">
            Impulsamos el crecimiento de tu negocio a través de estrategias innovadoras y soluciones tecnológicas de vanguardia.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-full shadow-sm text-white bg-gradient-to-r from-blue-600 to-gray-900 hover:opacity-90 transition-opacity"
            >
              Comienza Ahora
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center px-8 py-4 border-2 border-gray-300 dark:border-gray-700 text-lg font-medium rounded-full text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200"
            >
              Explorar Servicios
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
