'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { User, UserBilling } from '@/types/user';
import { Loader2 } from 'lucide-react';

interface UserFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: User;
  onSubmit: (userData: Partial<User>) => Promise<void>;
}

export default function UserFormModal({ isOpen, onClose, user, onSubmit }: UserFormModalProps) {
  const [formData, setFormData] = useState<Partial<User>>(
    user || {
      name: '',
      email: '',
      position: '',
      company: '',
      project: '',
      status: 'pending',
      billing: {
        plan: 'basic',
        status: 'pending',
        amount: 0,
        nextBillingDate: new Date() // Usar un objeto Date en lugar de una cadena
      }
    }
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await onSubmit(formData);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar usuario');
    } finally {
      setLoading(false);
    }
  };

  // Función para manejar cambios en campos simples
  const handleChange = (field: string, value: string | number | Date) => {
    // Para campos simples (no anidados)
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Función específica para manejar cambios en campos de billing
  const handleBillingChange = (field: string, value: string | number | Date) => {
    setFormData(prev => {
      const currentBilling = prev.billing || {} as UserBilling;
      
      return {
        ...prev,
        billing: {
          ...currentBilling,
          [field]: field === 'amount' ? Number(value) : value
        }
      };
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{user ? 'Editar Usuario' : 'Crear Nuevo Usuario'}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {error && (
            <div className="bg-red-50 p-3 rounded-md text-red-600 text-sm mb-4">
              {error}
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input 
                id="name"
                value={formData.name || ''}
                onChange={(e) => handleChange('name', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email"
                type="email"
                value={formData.email || ''}
                onChange={(e) => handleChange('email', e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="position">Posición</Label>
              <Input 
                id="position"
                value={formData.position || ''}
                onChange={(e) => handleChange('position', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="company">Empresa</Label>
              <Input 
                id="company"
                value={formData.company || ''}
                onChange={(e) => handleChange('company', e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="project">Proyecto</Label>
            <Input 
              id="project"
              value={formData.project || ''}
              onChange={(e) => handleChange('project', e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="status">Estado</Label>
            <Select 
              value={formData.status || 'pending'}
              onValueChange={(value) => handleChange('status', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Activo</SelectItem>
                <SelectItem value="inactive">Inactivo</SelectItem>
                <SelectItem value="pending">Pendiente</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="border-t pt-4 mt-4">
            <h3 className="font-medium mb-3">Información de Facturación</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="billingPlan">Plan</Label>
                <Select 
                  value={formData.billing?.plan || 'basic'}
                  onValueChange={(value) => handleBillingChange('plan', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Básico</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                    <SelectItem value="enterprise">Empresarial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="billingStatus">Estado de facturación</Label>
                <Select 
                  value={formData.billing?.status || 'pending'}
                  onValueChange={(value) => handleBillingChange('status', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paid">Pagado</SelectItem>
                    <SelectItem value="pending">Pendiente</SelectItem>
                    <SelectItem value="overdue">Vencido</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="billingAmount">Monto</Label>
                <Input 
                  id="billingAmount"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.billing?.amount || 0}
                  onChange={(e) => handleBillingChange('amount', Number.parseFloat(e.target.value))}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="nextBillingDate">Próxima facturación</Label>
                <Input
                  id="nextBillingDate"
                  type="date"
                  value={formData.billing?.nextBillingDate instanceof Date 
                    ? formData.billing.nextBillingDate.toISOString().split('T')[0] 
                    : new Date().toISOString().split('T')[0]}
                  onChange={(e) => handleBillingChange('nextBillingDate', new Date(e.target.value))}
                  required
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {user ? 'Actualizar' : 'Crear'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
