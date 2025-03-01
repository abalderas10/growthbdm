'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Calendar } from 'lucide-react';

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [autoConfirm, setAutoConfirm] = useState(false);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Configuración</h1>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="calendar">Calendario</TabsTrigger>
          <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="company">Nombre de la Empresa</Label>
              <Input id="company" defaultValue="Growth BDM" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email de Contacto</Label>
              <Input id="email" type="email" defaultValue="contacto@growthbdm.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Zona Horaria</Label>
              <select
                id="timezone"
                className="w-full p-2 border rounded-md"
                defaultValue="America/Mexico_City"
              >
                <option value="America/Mexico_City">Ciudad de México (GMT-6)</option>
                <option value="America/New_York">Nueva York (GMT-5)</option>
                <option value="Europe/Madrid">Madrid (GMT+1)</option>
              </select>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-6">
          <div className="grid gap-4 py-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Confirmación Automática</Label>
                <p className="text-sm text-gray-500">
                  Confirmar automáticamente las reuniones con usuarios verificados
                </p>
              </div>
              <Switch
                checked={autoConfirm}
                onCheckedChange={setAutoConfirm}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Horarios Disponibles</Label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startTime">Hora de Inicio</Label>
                  <Input
                    id="startTime"
                    type="time"
                    defaultValue="09:00"
                  />
                </div>
                <div>
                  <Label htmlFor="endTime">Hora de Fin</Label>
                  <Input
                    id="endTime"
                    type="time"
                    defaultValue="18:00"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Duración de Reuniones</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="minDuration">Mínima (minutos)</Label>
                  <Input
                    id="minDuration"
                    type="number"
                    defaultValue="30"
                    min="15"
                    step="15"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxDuration">Máxima (minutos)</Label>
                  <Input
                    id="maxDuration"
                    type="number"
                    defaultValue="120"
                    min="30"
                    step="15"
                  />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <div className="grid gap-4 py-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Notificaciones por Email</Label>
                <p className="text-sm text-gray-500">
                  Recibir notificaciones cuando se agende una nueva reunión
                </p>
              </div>
              <Switch
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notificationEmail">Email para Notificaciones</Label>
              <Input
                id="notificationEmail"
                type="email"
                defaultValue="notificaciones@growthbdm.com"
              />
            </div>

            <div className="space-y-2">
              <Label>Recordatorios</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="reminder1" defaultChecked />
                  <Label htmlFor="reminder1">1 día antes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="reminder2" defaultChecked />
                  <Label htmlFor="reminder2">1 hora antes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="reminder3" defaultChecked />
                  <Label htmlFor="reminder3">15 minutos antes</Label>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-6 flex justify-end space-x-2">
        <Button variant="outline">Cancelar</Button>
        <Button>Guardar Cambios</Button>
      </div>
    </div>
  );
}
