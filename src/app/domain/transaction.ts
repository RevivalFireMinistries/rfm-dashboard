export interface Transaction {
  id: number;
  date: string;
  type: string;
  amount: number;
  description: string;
  beneficiary: string;
}
