"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const newsletterSchema = z.object({
  email: z.string().email("Email inválido"),
});

type NewsletterForm = z.infer<typeof newsletterSchema>;

export function Newsletter() {
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

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 rounded-xl shadow-lg">
      <h3 className="text-2xl font-bold text-white mb-4">
        Mantente Informado
      </h3>
      <p className="text-blue-100 mb-6">
        Suscríbete para recibir las últimas noticias y actualizaciones sobre crecimiento empresarial.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            type="email"
            placeholder="Tu email"
            {...register("email")}
            className="w-full px-4 py-3 rounded-md border-2 border-transparent bg-white/10 text-white placeholder-blue-200 focus:border-white focus:ring-0 backdrop-blur-sm"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-300">{errors.email.message}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-6 py-3 bg-white text-blue-600 rounded-md hover:bg-blue-50 disabled:opacity-50 font-medium transition-colors duration-200"
        >
          {isSubmitting ? "Procesando..." : "Suscribirse al Newsletter"}
        </button>
      </form>
    </div>
  );
}
