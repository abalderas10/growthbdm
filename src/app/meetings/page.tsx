'use client';

import { useState, useEffect } from 'react';
import { BookingCalendar } from '@/components/Calendar/BookingCalendar';
import { supabase } from '@/lib/supabase';
import type { MeetingType } from '@/lib/supabase';

export default function MeetingsPage() {
  const [meetingTypes, setMeetingTypes] = useState<MeetingType[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    notes: '',
  });

  useEffect(() => {
    async function fetchMeetingTypes() {
      const { data } = await supabase
        .from('meeting_types')
        .select('*')
        .eq('is_active', true);
      
      if (data) {
        setMeetingTypes(data);
      }
      setLoading(false);
    }

    fetchMeetingTypes();
  }, []);

  const handleTimeSlotSelect = async (startTime: Date, endTime: Date, meetingTypeId: string) => {
    try {
      const meetingType = meetingTypes.find(type => type.id === meetingTypeId);
      if (!meetingType) return;

      const { data, error } = await supabase
        .from('meetings')
        .insert({
          title: `Reunión: ${meetingType.name}`,
          description: formData.notes,
          start_time: startTime.toISOString(),
          end_time: endTime.toISOString(),
          attendee_email: formData.email,
          attendee_name: formData.name,
          meeting_type_id: meetingTypeId,
          status: 'pending'
        })
        .select()
        .single();

      if (error) throw error;

      // Aquí iría la lógica para crear el evento en Google Calendar
      // y actualizar el registro con el google_event_id

      alert('¡Reunión agendada con éxito!');
    } catch (error) {
      console.error('Error al agendar la reunión:', error);
      alert('Error al agendar la reunión. Por favor intenta de nuevo.');
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Agenda una Reunión</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notas (opcional)
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              rows={4}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <BookingCalendar
            meetingTypes={meetingTypes}
            onTimeSlotSelect={handleTimeSlotSelect}
          />
        </div>
      </div>
    </div>
  );
}
