export const APP_CONFIG = {
  name: 'NFT Pulse',
  description: 'Discover and collect extraordinary NFTs',
  networkId: process.env.NEXT_PUBLIC_NETWORK_ID || '1',
  rpcUrl: process.env.NEXT_PUBLIC_RPC_URL,
} as const;