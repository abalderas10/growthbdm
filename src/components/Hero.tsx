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
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-blue-600 dark:from-white dark:to-blue-500">
            Potencia tu Crecimiento con Growth Business Development
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12">
            Desarrollamos estrategias personalizadas para impulsar el crecimiento de tu negocio a través de alianzas estratégicas y networking efectivo.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link
              href="/construye-alianzas"
              className="inline-flex items-center px-8 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Comienza ahora
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="/networking"
              className="inline-flex items-center px-8 py-3 text-lg font-medium text-blue-600 bg-blue-100 rounded-lg hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Networking
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
