import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../../types';
import { products as sampleProducts } from '../../data/sampleData';

export interface ProductsState {
  products: Product[];
  selectedCategory: string;
  searchQuery: string;
  isLoading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: sampleProducts,
  selectedCategory: 'All',
  searchQuery: '',
  isLoading: false,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },
    updateStock: (
      state,
      action: PayloadAction<{ productId: string; quantity: number }>
    ) => {
      const product = state.products.find(
        (p) => p.id === action.payload.productId
      );
      if (product) {
        product.stock -= action.payload.quantity;
      }
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
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
  setProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  updateStock,
  setSelectedCategory,
  setSearchQuery,
  setLoading,
  setError,
} = productsSlice.actions;

export default productsSlice.reducer;
