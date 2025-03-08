'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [autoConfirm, setAutoConfirm] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-6">
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
                  className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                  defaultValue="America/Mexico_City"
                >
                  <option value="America/Mexico_City">Ciudad de México (GMT-6)</option>
                  <option value="America/New_York">Nueva York (GMT-5)</option>
                  <option value="Europe/Madrid">Madrid (GMT+1)</option>
                </select>
              </div>
            </div>
          </div>
        );
      case 'calendar':
        return (
          <div className="space-y-6">
            <div className="grid gap-4 py-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Confirmación Automática</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Confirmar automáticamente las reuniones con usuarios verificados
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={autoConfirm}
                  onChange={(e) => setAutoConfirm(e.target.checked)}
                  className="h-4 w-4"
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
          </div>
        );
      case 'notifications':
        return (
          <div className="space-y-6">
            <div className="grid gap-4 py-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notificaciones por Email</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Recibir notificaciones cuando se agende una nueva reunión
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                  className="h-4 w-4"
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
                    <input type="checkbox" id="reminder1" defaultChecked className="h-4 w-4" />
                    <Label htmlFor="reminder1">1 día antes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="reminder2" defaultChecked className="h-4 w-4" />
                    <Label htmlFor="reminder2">1 hora antes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="reminder3" defaultChecked className="h-4 w-4" />
                    <Label htmlFor="reminder3">15 minutos antes</Label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Configuración</h1>

      <div className="mb-6">
        <div className="flex space-x-2 border-b">
          {['general', 'calendar', 'notifications'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 -mb-px text-sm font-medium ${
                activeTab === tab
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <Card className="p-6">
        {renderTabContent()}
      </Card>

      <div className="mt-6 flex justify-end space-x-2">
        <Button variant="outline">Cancelar</Button>
        <Button>Guardar Cambios</Button>
      </div>
    </div>
  );
}
