'use client';

import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { format, addMinutes, setHours, setMinutes } from 'date-fns';
import { es } from 'date-fns/locale';
import "react-datepicker/dist/react-datepicker.css";
import { supabase } from '@/lib/supabase';
import type { MeetingType } from '@/lib/supabase';

interface BookingCalendarProps {
  meetingTypes: MeetingType[];
  onTimeSlotSelect: (startTime: Date, endTime: Date, meetingTypeId: string) => void;
}

export function BookingCalendar({ meetingTypes, onTimeSlotSelect }: BookingCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedMeetingType, setSelectedMeetingType] = useState<string>('');
  const [availableSlots, setAvailableSlots] = useState<Date[]>([]);

  // Filtrar las horas disponibles basado en el tipo de reunión seleccionado
  const filterAvailableSlots = async (date: Date, meetingTypeId: string) => {
    const dayOfWeek = date.getDay();
    
    const { data: slots } = await supabase
      .from('available_slots')
      .select('*')
      .eq('day_of_week', dayOfWeek)
      .eq('meeting_type_id', meetingTypeId)
      .eq('is_available', true);

    if (slots) {
      const availableTimes = slots.map(slot => {
        const [hours, minutes] = slot.start_time.split(':');
        return setMinutes(setHours(date, parseInt(hours)), parseInt(minutes));
      });
      setAvailableSlots(availableTimes);
    }
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    if (date && selectedMeetingType) {
      filterAvailableSlots(date, selectedMeetingType);
    }
  };

  const handleMeetingTypeChange = (meetingTypeId: string) => {
    setSelectedMeetingType(meetingTypeId);
    if (selectedDate) {
      filterAvailableSlots(selectedDate, meetingTypeId);
    }
  };

  const handleTimeSlotSelect = (startTime: Date) => {
    const selectedType = meetingTypes.find(type => type.id === selectedMeetingType);
    if (selectedType) {
      const endTime = addMinutes(startTime, selectedType.duration);
      onTimeSlotSelect(startTime, endTime, selectedType.id);
    }
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-xl shadow-lg">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tipo de Reunión
        </label>
        <select
          value={selectedMeetingType}
          onChange={(e) => handleMeetingTypeChange(e.target.value)}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Selecciona un tipo de reunión</option>
          {meetingTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name} ({type.duration} minutos)
            </option>
          ))}
        </select>
      </div>

      {selectedMeetingType && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fecha
          </label>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            inline
            locale={es}
            minDate={new Date()}
            placeholderText="Selecciona una fecha"
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      )}

      {selectedDate && availableSlots.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Horarios Disponibles
          </label>
          <div className="grid grid-cols-3 gap-2">
            {availableSlots.map((slot, index) => (
              <button
                key={index}
                onClick={() => handleTimeSlotSelect(slot)}
                className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {format(slot, 'HH:mm')}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
