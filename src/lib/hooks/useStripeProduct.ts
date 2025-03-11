import { useState, useEffect } from 'react';

interface StripeProduct {
  id: string;
  name: string;
  description: string | null;
  images: string[];
  metadata: {
    date: string;
    location: string;
    time: string;
  };
  price: {
    id: string;
    unit_amount: number;
    currency: string;
  };
}

export function useStripeProduct(productId?: string): { product: StripeProduct | null, isLoading: boolean, error: Error | null } {
  const [product, setProduct] = useState<StripeProduct | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const url = productId ? `/api/stripe/product/${productId}` : '/api/stripe/product';
        const response = await fetch(url);
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Error al cargar el producto');
        }
        
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        console.error('Error al obtener el producto:', err);
        setError(err instanceof Error ? err : new Error('Error desconocido'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  return { product, isLoading, error };
}
