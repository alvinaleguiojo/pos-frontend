import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface SettingsState {
  storeName: string;
  storeAddress: string;
  storePhone: string;
  storeEmail: string;
  currency: string;
  taxRate: number;
  theme: 'light' | 'dark';
  language: string;
  receiptFooter: string;
  lowStockThreshold: number;
  isLoading: boolean;
}

const initialState: SettingsState = {
  storeName: 'ArexPOS',
  storeAddress: '123 Main Street, City',
  storePhone: '+1 234 567 8900',
  storeEmail: 'contact@arexpos.com',
  currency: 'USD',
  taxRate: 10,
  theme: 'light',
  language: 'en',
  receiptFooter: 'Thank you for your purchase!',
  lowStockThreshold: 10,
  isLoading: false,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateSettings: (state, action: PayloadAction<Partial<SettingsState>>) => {
      return { ...state, ...action.payload };
    },
    setStoreName: (state, action: PayloadAction<string>) => {
      state.storeName = action.payload;
    },
    setStoreAddress: (state, action: PayloadAction<string>) => {
      state.storeAddress = action.payload;
    },
    setStorePhone: (state, action: PayloadAction<string>) => {
      state.storePhone = action.payload;
    },
    setStoreEmail: (state, action: PayloadAction<string>) => {
      state.storeEmail = action.payload;
    },
    setCurrency: (state, action: PayloadAction<string>) => {
      state.currency = action.payload;
    },
    setTaxRate: (state, action: PayloadAction<number>) => {
      state.taxRate = action.payload;
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    setReceiptFooter: (state, action: PayloadAction<string>) => {
      state.receiptFooter = action.payload;
    },
    setLowStockThreshold: (state, action: PayloadAction<number>) => {
      state.lowStockThreshold = action.payload;
    },
    resetSettings: () => initialState,
  },
});

export const {
  updateSettings,
  setStoreName,
  setStoreAddress,
  setStorePhone,
  setStoreEmail,
  setCurrency,
  setTaxRate,
  setTheme,
  setLanguage,
  setReceiptFooter,
  setLowStockThreshold,
  resetSettings,
} = settingsSlice.actions;

export default settingsSlice.reducer;
