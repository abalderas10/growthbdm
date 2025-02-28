"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const newsletterSchema = z.object({
  email: z.string().email("Email inválido"),
});

type NewsletterForm = z.infer<typeof newsletterSchema>;

interface MinimalNewsletterProps {
  variant?: 'footer' | 'blog';
}

export function MinimalNewsletter({ variant = 'footer' }: MinimalNewsletterProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NewsletterForm>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async (data: NewsletterForm) => {
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Error al suscribirse");
      
      reset();
      alert("¡Gracias por suscribirte!");
    } catch (error) {
      alert("Error al procesar tu suscripción");
    }
  };

  if (variant === 'blog') {
    return (
      <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl mb-8">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Suscríbete a nuestro Newsletter
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Recibe las últimas actualizaciones sobre crecimiento empresarial.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
          <div className="flex-1">
            <input
              type="email"
              placeholder="Tu email"
              {...register("email")}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-[#004b8d] text-white rounded-lg hover:bg-[#003366] disabled:opacity-50 transition-colors"
          >
            Suscribirse
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <h3 className="text-sm font-semibold text-gray-200 mb-2">
        Newsletter
      </h3>
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
        <div className="flex-1">
          <input
            type="email"
            placeholder="Tu email"
            {...register("email")}
            className="w-full px-3 py-2 text-sm rounded-md border border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:ring-1 focus:ring-blue-400"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 transition-colors"
        >
          Suscribirse
        </button>
      </form>
    </div>
  );
}
