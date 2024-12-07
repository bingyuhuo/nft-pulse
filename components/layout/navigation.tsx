'use client';

import { Menu, Bell } from 'lucide-react';
import { APP_CONFIG } from '@/lib/config/constants';
import { Button } from '@/components/ui/button';

interface NavigationProps {
  onMenuClick: () => void;
}

export function Navigation({ onMenuClick }: NavigationProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-800 border-b border-gray-700">
      <div className="px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onMenuClick}>
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold text-white">{APP_CONFIG.name}</h1>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
}