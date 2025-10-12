import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
};

interface TransactionsState {
  items: Transaction[];
};

const initialState: TransactionsState = {
  items: [],
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setTransactions(
      state: TransactionsState, 
      action: PayloadAction<Transaction[]>
    ) {
      state.items = action.payload;
    },
    clearTransactions(state: TransactionsState) {
      state.items = [];
    },
  },
});

export const { setTransactions, clearTransactions } = transactionsSlice.actions;
export const selectTransactions = (state: RootState) => state.transactions.items;
export const selectTransaction = (state: RootState, id: string) =>
  state.transactions.items.find(transaction => transaction.id === id);
export default transactionsSlice.reducer;
