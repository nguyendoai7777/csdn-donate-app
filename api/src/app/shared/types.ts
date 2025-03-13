export interface Donation {
  id?: number;
  uuid: string;
  name: string;
  amount: string;
  message: string;
  imageUrl: string;
  totalAmount: number;
  timestamp?: Date | string;
}
