'use client';

import { useState } from 'react';
import { Navigation } from './navigation';
import { Sidebar } from './sidebar';
import { cn } from '@/lib/utils';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} />
        <main className={cn(
          "flex-1 p-6 transition-all duration-300",
          sidebarOpen ? "ml-64" : "ml-0"
        )}>
          {children}
        </main>
      </div>
    </div>
  );
}