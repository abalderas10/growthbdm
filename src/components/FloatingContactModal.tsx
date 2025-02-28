"use client";

import { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm';
import { X } from 'lucide-react';

interface FloatingContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
}

export function FloatingContactModal({ isOpen, onClose, title, subtitle }: FloatingContactModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setTimeout(() => setIsVisible(false), 300);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${
        isOpen ? 'opacity-100' : 'opacity-0'
      } transition-opacity duration-300`}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div 
        className={`relative bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-lg transform ${
          isOpen ? 'scale-100' : 'scale-95'
        } transition-transform duration-300`}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Content */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {subtitle}
          </p>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
