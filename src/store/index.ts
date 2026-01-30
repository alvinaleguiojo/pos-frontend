import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import productsReducer from './slices/productsSlice';
import customersReducer from './slices/customersSlice';
import transactionsReducer from './slices/transactionsSlice';
import settingsReducer from './slices/settingsSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    customers: customersReducer,
    transactions: transactionsReducer,
    settings: settingsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types for date serialization
        ignoredActions: ['transactions/addTransaction'],
        ignoredPaths: ['transactions.transactions'],
      },
    }),
});

// Infer types from the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
