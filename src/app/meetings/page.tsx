'use client';

import { useState, useEffect } from 'react';
import { BookingCalendar } from '@/components/Calendar/BookingCalendar';
import { MeetingForm } from '@/components/MeetingForm';
import { supabase } from '@/lib/supabase';
import type { MeetingType } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function MeetingsPage() {
  const router = useRouter();
  const [meetingTypes, setMeetingTypes] = useState<MeetingType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState<{
    startTime: Date;
    endTime: Date;
    meetingTypeId: string;
  } | null>(null);

  useEffect(() => {
    fetchMeetingTypes();
  }, []);

  async function fetchMeetingTypes() {
    try {
      const { data, error } = await supabase
        .from('meeting_types')
        .select('*')
        .order('duration');

      if (error) throw error;
      setMeetingTypes(data || []);
    } catch (error) {
      console.error('Error fetching meeting types:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleTimeSlotSelect = (startTime: Date, endTime: Date, meetingTypeId: string) => {
    setSelectedSlot({ startTime, endTime, meetingTypeId });
  };

  const handleSubmit = async (formData: any) => {
    try {
      if (!selectedSlot) throw new Error('No time slot selected');

      const meetingData = {
        ...formData,
        startTime: selectedSlot.startTime.toISOString(),
        endTime: selectedSlot.endTime.toISOString(),
        meetingTypeId: selectedSlot.meetingTypeId,
      };

      const response = await fetch('/api/meetings/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(meetingData),
      });

      if (!response.ok) {
        throw new Error('Error booking meeting');
      }

      router.push('/success');
    } catch (error) {
      console.error('Error submitting form:', error);
      throw error;
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Agenda una Reunión</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Selecciona un Horario</h2>
          <BookingCalendar
            meetingTypes={meetingTypes}
            onTimeSlotSelect={handleTimeSlotSelect}
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Detalles de la Reunión</h2>
          {selectedSlot ? (
            <MeetingForm
              onSubmit={handleSubmit}
              meetingTypes={meetingTypes}
            />
          ) : (
            <p className="text-gray-500">
              Por favor, selecciona un horario para la reunión
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
