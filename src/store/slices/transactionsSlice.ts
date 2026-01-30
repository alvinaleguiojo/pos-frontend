import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Transaction, CartItem, PaymentMethod } from '../../types';

export interface TransactionsState {
  transactions: Transaction[];
  isLoading: boolean;
  error: string | null;
}

const initialState: TransactionsState = {
  transactions: [],
  isLoading: false,
  error: null,
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (
      state,
      action: PayloadAction<{
        items: CartItem[];
        paymentMethod: PaymentMethod;
        customerId?: string;
      }>
    ) => {
      const { items, paymentMethod, customerId } = action.payload;
      const subtotal = items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );
      const tax = subtotal * 0.1;
      const transaction: Transaction = {
        id: `TXN-${Date.now()}`,
        items: [...items],
        subtotal,
        tax,
        total: subtotal + tax,
        paymentMethod,
        customerId,
        createdAt: new Date(),
      };
      state.transactions.unshift(transaction);
    },
    deleteTransaction: (state, action: PayloadAction<string>) => {
      state.transactions = state.transactions.filter(
        (t) => t.id !== action.payload
      );
    },
    setTransactions: (state, action: PayloadAction<Transaction[]>) => {
      state.transactions = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  addTransaction,
  deleteTransaction,
  setTransactions,
  setLoading,
  setError,
} = transactionsSlice.actions;

export default transactionsSlice.reducer;
