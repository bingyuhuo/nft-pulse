'use client';

import { Wallet } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { APP_CONFIG } from '@/lib/config/constants';

export function LandingHero() {
  const { isWalletConnected, setWalletConnected } = useAppStore();

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          Welcome to {APP_CONFIG.name}
        </h1>
        <p className="text-xl mb-8 text-gray-300">{APP_CONFIG.description}</p>
        <Button
          variant="gradient"
          size="lg"
          onClick={() => setWalletConnected(true)}
          className="mx-auto"
        >
          <Wallet className="w-5 h-5 mr-2" />
          Connect Wallet
        </Button>
      </div>
    </div>
  );
}