export interface Profile {
  id: string;
  name: string;
  email: string;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
}

export type Transactions = Transaction[];

export interface User {
  id: string;
  username: string;
  password: string;
  role: string;
}