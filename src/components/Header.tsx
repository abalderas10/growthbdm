"use client";

import { useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from 'lucide-react';
import { Button } from "./ui/button";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white/80 dark:bg-[#1e3a8a]/80 backdrop-blur-md fixed top-0 left-0 right-0 z-50 shadow-sm">
      <nav className="w-full border-b border-gray-100 dark:border-blue-900">
        <div className="w-full flex items-center justify-between px-4 md:px-8 py-4">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/growthSVG.png"
              alt="Growth BDM Logo"
              width={75}
              height={37}
              className="h-9 w-auto block dark:hidden"
            />
            <Image
              src="/Logo_white.png"
              alt="Growth BDM Logo"
              width={75}
              height={37}
              className="h-9 w-auto hidden dark:block"
            />
          </Link>
          
          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/blog"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white"
            >
              Publicación Growth
            </Link>
            <Link
              href="/networking"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white"
            >
              Networking
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white"
            >
              About
            </Link>
            <Button
              variant="default"
              className="bg-blue-600 hover:bg-blue-700"
              asChild
            >
              <Link href="/construye-alianzas">Construye Alianzas</Link>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                href="/blog"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white"
              >
                Publicación Growth
              </Link>
              <Link
                href="/networking"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white"
              >
                Networking
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white"
              >
                About
              </Link>
              <Button
                variant="default"
                className="w-full bg-blue-600 hover:bg-blue-700 mt-2"
                asChild
              >
                <Link href="/construye-alianzas">Construye Alianzas</Link>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
