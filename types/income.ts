export interface Income {
  amount: number;
  category: string;
  description: string;
  date: string;
}

export type IncomeResponse = {
  id?: string; // Firestore doc id
  amount: number;
  category: string;
  date: string;
  description: string;
  userId: string;
};
