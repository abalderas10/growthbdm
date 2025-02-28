'use client';

import { useEffect, useState } from 'react';
import { 
  Users, 
  Calendar, 
  FileText, 
  DollarSign 
} from 'lucide-react';

interface StatsCard {
  title: string;
  value: number | string;
  description: string;
  icon: React.ElementType;
  loading?: boolean;
}

function StatCard({ title, value, description, icon: Icon, loading = false }: StatsCard) {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </p>
          <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">
            {loading ? (
              <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            ) : (
              value
            )}
          </p>
        </div>
        <div className="p-3 bg-blue-500/10 rounded-full">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
      </div>
      <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        {description}
      </p>
    </div>
  );
}

export function DashboardStats() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    users: 0,
    meetings: 0,
    forms: 0,
    revenue: 0,
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch('/api/dashboard/stats');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  const cards: StatsCard[] = [
    {
      title: 'Total de Usuarios',
      value: stats.users,
      description: 'Usuarios registrados en la plataforma',
      icon: Users,
      loading,
    },
    {
      title: 'Reuniones',
      value: stats.meetings,
      description: 'Reuniones programadas este mes',
      icon: Calendar,
      loading,
    },
    {
      title: 'Formularios',
      value: stats.forms,
      description: 'Formularios completados',
      icon: FileText,
      loading,
    },
    {
      title: 'Ingresos',
      value: `$${stats.revenue.toLocaleString()}`,
      description: 'Ingresos totales',
      icon: DollarSign,
      loading,
    },
  ];

  return (
    <>
      {cards.map((card) => (
        <StatCard key={card.title} {...card} />
      ))}
    </>
  );
}
