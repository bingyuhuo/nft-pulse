export interface User {
  id: string;
  email: string;
  name?: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}