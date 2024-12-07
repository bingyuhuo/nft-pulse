import { create } from 'zustand'

interface AppState {
  isWalletConnected: boolean
  setWalletConnected: (status: boolean) => void
}

export const useAppStore = create<AppState>((set) => ({
  isWalletConnected: false,
  setWalletConnected: (status) => set({ isWalletConnected: status }),
}))