'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { CalendarIcon, Clock, User } from 'lucide-react';

interface Meeting {
  id: string;
  title: string;
  date: Date;
  time: string;
  duration: number;
  attendee: {
    name: string;
    email: string;
  };
  type: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export default function MeetingsPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Calendario de Reuniones</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1">
          <div className="bg-white rounded-lg shadow p-4">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              locale={es}
              className="rounded-md border"
            />
          </div>

          <div className="mt-4 bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold mb-3">Resumen del Día</h2>
            <div className="space-y-3">
              <div className="flex items-center text-sm">
                <Clock className="w-4 h-4 mr-2 text-gray-500" />
                <span>5 reuniones programadas</span>
              </div>
              <div className="flex items-center text-sm">
                <User className="w-4 h-4 mr-2 text-gray-500" />
                <span>3 pendientes por confirmar</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-1 md:col-span-2">
          <div className="bg-white rounded-lg shadow">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Hora</TableHead>
                  <TableHead>Título</TableHead>
                  <TableHead>Asistente</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Ejemplo de datos - Reemplazar con datos reales */}
                <TableRow>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">10:00 AM</span>
                      <span className="text-sm text-gray-500">45 min</span>
                    </div>
                  </TableCell>
                  <TableCell>Consulta Inicial</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>María González</span>
                      <span className="text-sm text-gray-500">maria@empresa.com</span>
                    </div>
                  </TableCell>
                  <TableCell>Estrategia</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor('pending')}>
                      Pendiente
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-x-2">
                      <Button variant="outline" size="sm">
                        Confirmar
                      </Button>
                      <Button variant="ghost" size="sm">
                        Cancelar
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
