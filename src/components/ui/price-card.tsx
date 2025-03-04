'use client';

import { Button } from "./button";
import { CheckIcon } from "lucide-react";

interface PriceCardProps {
  title: string;
  price: string;
  period?: string;
  features: string[];
  buttonText: string;
  onSubscribe: () => void;
  loading?: boolean;
  featured?: boolean;
}

export function PriceCard({
  title,
  price,
  period,
  features,
  buttonText,
  onSubscribe,
  loading,
  featured = false,
}: PriceCardProps) {
  return (
    <div className={`relative rounded-2xl ${
      featured 
        ? 'bg-gradient-to-b from-blue-600 to-blue-800 text-white shadow-xl border-2 border-blue-400' 
        : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
    } p-8 h-full flex flex-col`}>
      {featured && (
        <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
          <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
            Recomendado
          </span>
        </div>
      )}
      
      <div className="mb-8">
        <h3 className={`text-2xl font-bold mb-4 ${featured ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
          {title}
        </h3>
        <div className="flex items-baseline">
          <span className={`text-4xl font-bold ${featured ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
            {price}
          </span>
          {period && (
            <span className={`ml-2 text-lg ${featured ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'}`}>
              {period}
            </span>
          )}
        </div>
      </div>

      <ul className="mb-8 space-y-4 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <CheckIcon className={`w-5 h-5 mr-3 mt-1 flex-shrink-0 ${
              featured ? 'text-blue-200' : 'text-green-500 dark:text-green-400'
            }`} />
            <span className={featured ? 'text-blue-50' : 'text-gray-600 dark:text-gray-300'}>
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <Button
        onClick={onSubscribe}
        disabled={loading}
        className={`w-full ${
          featured
            ? 'bg-white text-blue-600 hover:bg-blue-50'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        {loading ? 'Procesando...' : buttonText}
      </Button>
    </div>
  );
}
