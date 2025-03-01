"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

const meetingSchema = z.object({
  name: z.string().min(2, "El nombre es muy corto"),
  email: z.string().email("Email inválido"),
  company: z.string().optional(),
  notes: z.string().optional(),
  meetingTypeId: z.string().min(1, "Selecciona un tipo de reunión"),
  startTime: z.date(),
  endTime: z.date(),
});

type MeetingForm = z.infer<typeof meetingSchema>;

interface MeetingFormProps {
  onSubmit: (data: MeetingForm) => Promise<void>;
  meetingTypes: Array<{ id: string; name: string; duration: number }>;
}

export function MeetingForm({ onSubmit, meetingTypes }: MeetingFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<MeetingForm>({
    resolver: zodResolver(meetingSchema),
  });

  const handleFormSubmit = async (data: MeetingForm) => {
    try {
      await onSubmit(data);
      toast.success("Reunión agendada exitosamente");
    } catch (error) {
      console.error("Error al agendar la reunión:", error);
      toast.error("Error al agendar la reunión");
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nombre
        </label>
        <input
          type="text"
          id="name"
          {...register("name")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          {...register("email")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-medium text-gray-700">
          Empresa (opcional)
        </label>
        <input
          type="text"
          id="company"
          {...register("company")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
          Notas (opcional)
        </label>
        <textarea
          id="notes"
          {...register("notes")}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="meetingType" className="block text-sm font-medium text-gray-700">
          Tipo de Reunión
        </label>
        <select
          id="meetingType"
          {...register("meetingTypeId")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Selecciona un tipo</option>
          {meetingTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name} ({type.duration} minutos)
            </option>
          ))}
        </select>
        {errors.meetingTypeId && (
          <p className="mt-1 text-sm text-red-600">{errors.meetingTypeId.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {isSubmitting ? "Agendando..." : "Agendar Reunión"}
      </button>
    </form>
  );
}
