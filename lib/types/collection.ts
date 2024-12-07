export interface Collection {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}