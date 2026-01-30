import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Customer } from '../../types';
import { customers as sampleCustomers } from '../../data/sampleData';

export interface CustomersState {
  customers: Customer[];
  selectedCustomer: Customer | null;
  searchQuery: string;
  isLoading: boolean;
  error: string | null;
}

const initialState: CustomersState = {
  customers: sampleCustomers,
  selectedCustomer: null,
  searchQuery: '',
  isLoading: false,
  error: null,
};

const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    setCustomers: (state, action: PayloadAction<Customer[]>) => {
      state.customers = action.payload;
    },
    addCustomer: (state, action: PayloadAction<Customer>) => {
      state.customers.push(action.payload);
    },
    updateCustomer: (state, action: PayloadAction<Customer>) => {
      const index = state.customers.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) {
        state.customers[index] = action.payload;
      }
    },
    deleteCustomer: (state, action: PayloadAction<string>) => {
      state.customers = state.customers.filter((c) => c.id !== action.payload);
    },
    selectCustomer: (state, action: PayloadAction<Customer | null>) => {
      state.selectedCustomer = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
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
  setCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer,
  selectCustomer,
  setSearchQuery,
  setLoading,
  setError,
} = customersSlice.actions;

export default customersSlice.reducer;
