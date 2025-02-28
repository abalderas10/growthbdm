'use client';

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { addDays, setHours, setMinutes, format } from 'date-fns';
import { es } from 'date-fns/locale';
import Image from 'next/image';

interface SimpleMeetingSchedulerProps {
  onSuccess?: () => void;
}

const MEETING_TYPES = [
  {
    id: 'initial_consultation',
    title: 'Consulta Inicial',
    duration: 30,
    description: 'Primera reunión para conocer tu negocio y objetivos'
  },
  {
    id: 'strategy_session',
    title: 'Sesión de Estrategia',
    duration: 60,
    description: 'Desarrollo de estrategias específicas para tu negocio'
  },
  {
    id: 'followup',
    title: 'Seguimiento',
    duration: 45,
    description: 'Revisión de avances y ajuste de estrategias'
  }
];

const AVAILABLE_HOURS = [9, 10, 11, 12, 13, 14, 15, 16, 17];

export function SimpleMeetingScheduler({ onSuccess }: SimpleMeetingSchedulerProps) {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedType || !selectedDate || !name || !email) {
      setError('Por favor completa todos los campos requeridos');
      return;
    }

    setIsSubmitting(true);
    setError('');

    const meetingType = MEETING_TYPES.find(type => type.id === selectedType);
    const endTime = new Date(selectedDate.getTime() + (meetingType?.duration || 30) * 60000);

    try {
      const response = await fetch('/api/meetings/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: `${meetingType?.title || 'Reunión'} con ${name}`,
          description: notes,
          startTime: selectedDate.toISOString(),
          endTime: endTime.toISOString(),
          attendeeEmail: email,
          attendeeName: name,
          meetingType: selectedType,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        // Limpiar el formulario
        setSelectedType(null);
        setSelectedDate(null);
        setName('');
        setEmail('');
        setNotes('');
        // Llamar al callback de éxito si existe
        if (onSuccess) {
          setTimeout(() => {
            onSuccess();
          }, 2000);
        }
      } else {
        setError(data.error || 'Hubo un error al agendar la reunión');
      }
    } catch (err) {
      setError('Hubo un error al procesar tu solicitud');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filterAvailableTime = (time: Date) => {
    const hour = time.getHours();
    return AVAILABLE_HOURS.includes(hour);
  };

  return (
    <div className="bg-white">
      {success ? (
        <div className="bg-green-50 p-4 rounded-md">
          <p className="text-green-800">¡Tu reunión ha sido agendada con éxito! Revisa tu correo para más detalles.</p>
          <button
            onClick={() => setSuccess(false)}
            className="mt-4 text-green-600 hover:text-green-800"
          >
            Agendar otra reunión
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Logo */}
          <div className="flex justify-center mb-2">
            <Image
              src="/growthSVG.png"
              alt="Growth BDM Logo"
              width={75}
              height={37}
              className="h-auto w-auto"
              priority
            />
          </div>

          {/* Título */}
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-left">
            Agenda una Reunión
          </h2>

          {/* Tipo de Reunión */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Reunión *
            </label>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {MEETING_TYPES.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setSelectedType(type.id)}
                  className={`p-4 rounded-lg border-2 text-left transition-colors ${
                    selectedType === type.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-200'
                  }`}
                >
                  <h3 className="font-medium text-gray-900">{type.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{type.description}</p>
                  <p className="text-sm text-gray-400 mt-2">{type.duration} minutos</p>
                </button>
              ))}
            </div>
          </div>

          {/* Fecha y Hora */}
          {selectedType && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha y Hora *
              </label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                showTimeSelect
                timeIntervals={30}
                filterTime={filterAvailableTime}
                minDate={new Date()}
                maxDate={addDays(new Date(), 30)}
                dateFormat="MMMM d, yyyy h:mm aa"
                locale={es}
                placeholderText="Selecciona fecha y hora"
                className="w-full p-2 border border-gray-300 rounded-md"
                timeCaption="Hora"
                minTime={setHours(setMinutes(new Date(), 0), 9)}
                maxTime={setHours(setMinutes(new Date(), 0), 17)}
              />
            </div>
          )}

          {/* Información Personal */}
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nombre Completo *
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Correo Electrónico *
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                Cuéntanos sobre el servicio o producto que te gustaría impulsar en el Desarrollo de Negocios Inmobiliarios
              </label>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Describe tu proyecto o idea..."
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 p-4 rounded-md">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting || !selectedType || !selectedDate || !name || !email}
            className={`w-full py-3 px-4 rounded-md text-white font-medium ${
              isSubmitting || !selectedType || !selectedDate || !name || !email
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isSubmitting ? 'Agendando...' : 'Agendar Reunión'}
          </button>
        </form>
      )}
    </div>
  );
}
