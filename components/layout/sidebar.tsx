'use client';

import { Home, LineChart, Zap, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  isOpen: boolean;
}

export function Sidebar({ isOpen }: SidebarProps) {
  const pathname = usePathname();

  const links = [
    { href: '/dashboard', label: 'Overview', icon: Home },
    { href: '/dashboard/trends', label: 'Trends', icon: LineChart },
    { href: '/dashboard/activity', label: 'Activity', icon: Zap },
    { href: '/dashboard/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className={cn(
      "fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-gray-800 transition-transform duration-300",
      !isOpen && "-translate-x-full"
    )}>
      <nav className="p-4">
        <ul className="space-y-2">
          {links.map(({ href, label, icon: Icon }) => (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  "flex items-center gap-3 px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors",
                  pathname === href && "bg-gray-700 text-white"
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}