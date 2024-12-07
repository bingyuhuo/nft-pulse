export interface NFT {
  id: string;
  tokenId: string;
  name: string;
  description?: string;
  imageUrl: string;
  price?: number;
  ownerId: string;
  collectionId: string;
  createdAt: Date;
  updatedAt: Date;
}