'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  FileText, 
  Settings, 
  LogOut 
} from 'lucide-react';

const menuItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard
  },
  {
    title: 'Usuarios',
    href: '/dashboard/users',
    icon: Users
  },
  {
    title: 'Calendario',
    href: '/dashboard/calendar',
    icon: Calendar
  },
  {
    title: 'Formularios',
    href: '/dashboard/forms',
    icon: FileText
  },
  {
    title: 'Configuración',
    href: '/dashboard/settings',
    icon: Settings
  }
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <div className="h-full px-3 py-4 overflow-y-auto">
        <div className="mb-10 px-4">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Growth BDM
          </h2>
        </div>
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center p-2 text-base rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                    isActive
                      ? 'bg-gray-100 dark:bg-gray-700 text-blue-600 dark:text-blue-500'
                      : 'text-gray-900 dark:text-white'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                  <span className="ml-3">{item.title}</span>
                </Link>
              </li>
            );
          })}
          <li className="mt-auto">
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="flex w-full items-center p-2 text-base text-gray-900 dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <LogOut className="w-6 h-6" />
              <span className="ml-3">Cerrar sesión</span>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
