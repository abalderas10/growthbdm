'use client';

import { useEffect, useState } from 'react';
import { checkConfiguration } from '@/lib/config-check';

export default function ConfigStatus() {
  const [config, setConfig] = useState<Array<{
    name: string;
    value: boolean;
    required: boolean;
  }>>([]);

  useEffect(() => {
    setConfig(checkConfiguration());
  }, []);

  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md">
      <h3 className="text-lg font-semibold mb-2">Estado de Configuración</h3>
      <div className="space-y-2">
        {config.map((item) => (
          <div key={item.name} className="flex items-center justify-between">
            <span className="text-sm font-mono">{item.name}</span>
            <span className={`text-sm ${
              item.value 
                ? 'text-green-600 dark:text-green-400' 
                : item.required
                  ? 'text-red-600 dark:text-red-400'
                  : 'text-yellow-600 dark:text-yellow-400'
            }`}>
              {item.value ? '✓' : item.required ? '✗' : '?'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
