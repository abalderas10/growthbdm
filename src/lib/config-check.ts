interface ConfigCheck {
  name: string;
  value: any;
  required: boolean;
  description: string;
}

interface ConfigValidation {
  isValid: boolean;
  missingVars: string[];
  message?: string;
}

export async function validateConfiguration(): Promise<ConfigValidation> {
  const missingVars = [];
  let message = '';

  // Validación de variables de entorno de Stripe
  if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.startsWith('pk_live_')) {
    missingVars.push('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY');
    message = 'La clave pública de Stripe debe ser una clave de producción (pk_live_)';
  }

  if (!process.env.STRIPE_SECRET_KEY?.startsWith('sk_live_')) {
    missingVars.push('STRIPE_SECRET_KEY');
    message = message || 'La clave secreta de Stripe debe ser una clave de producción (sk_live_)';
  }

  if (!process.env.NEXT_PUBLIC_STRIPE_NETWORKING_PRICE_ID?.startsWith('price_')) {
    missingVars.push('NEXT_PUBLIC_STRIPE_NETWORKING_PRICE_ID');
    message = message || 'El ID del precio debe comenzar con "price_"';
  }

  // Validación de URL base
  if (!process.env.NEXT_PUBLIC_BASE_URL) {
    missingVars.push('NEXT_PUBLIC_BASE_URL');
    message = message || 'La URL base es necesaria para las redirecciones después del pago';
  }

  // Validación adicional de Stripe
  if (missingVars.length === 0) {
    try {
      const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
      const price = await stripe.prices.retrieve(process.env.NEXT_PUBLIC_STRIPE_NETWORKING_PRICE_ID);
      
      if (!price) {
        missingVars.push('NEXT_PUBLIC_STRIPE_NETWORKING_PRICE_ID');
        message = 'El ID del precio proporcionado no existe en Stripe';
      }
    } catch (error) {
      missingVars.push('STRIPE_CONFIGURATION');
      message = error instanceof Error ? error.message : 'Error al validar la configuración de Stripe';
    }
  }

  return {
    isValid: missingVars.length === 0,
    missingVars,
    message: missingVars.length > 0 ? message : undefined
  };
}

export function checkConfiguration(): ConfigCheck[] {
  return [
    // Configuración básica
    {
      name: 'NEXT_PUBLIC_BASE_URL',
      value: process.env.NEXT_PUBLIC_BASE_URL,
      required: true,
      description: 'URL base para redirecciones después del pago',
    },
    
    // Stripe (Sistema de Reservaciones)
    {
      name: 'STRIPE_SECRET_KEY',
      value: process.env.STRIPE_SECRET_KEY?.substring(0, 10) + '...',
      required: true,
      description: 'Clave secreta de Stripe para procesar pagos',
    },
    {
      name: 'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
      value: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.substring(0, 10) + '...',
      required: true,
      description: 'Clave pública de Stripe para procesar pagos',
    },
    {
      name: 'NEXT_PUBLIC_STRIPE_NETWORKING_PRICE_ID',
      value: process.env.NEXT_PUBLIC_STRIPE_NETWORKING_PRICE_ID,
      required: true,
      description: 'ID del precio del evento de networking en Stripe',
    },
    
    // Cloudinary (opcional para desarrollo)
    {
      name: 'NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME',
      value: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      required: false,
      description: 'Nombre de la nube de Cloudinary para imágenes',
    }
  ];
}

export function isConfigValid(): boolean {
  return checkConfiguration()
    .filter(config => config.required)
    .every(config => Boolean(config.value));
}
