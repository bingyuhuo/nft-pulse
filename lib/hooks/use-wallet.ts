'use client';

import { useState, useCallback } from 'react';
import { useAppStore } from '@/lib/store';

export function useWallet() {
  const [isConnecting, setIsConnecting] = useState(false);
  const { setWalletConnected } = useAppStore();

  const connectWallet = useCallback(async () => {
    if (!window.ethereum) {
      alert('Please install MetaMask to connect your wallet');
      return;
    }

    try {
      setIsConnecting(true);
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (accounts.length > 0) {
        setWalletConnected(true);
        return accounts[0];
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      throw error;
    } finally {
      setIsConnecting(false);
    }
  }, [setWalletConnected]);

  return {
    connectWallet,
    isConnecting,
  };
}