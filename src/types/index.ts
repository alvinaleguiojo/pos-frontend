// Product type for inventory
export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  image?: string;
  barcode?: string;
}

// Cart item with quantity
export interface CartItem {
  product: Product;
  quantity: number;
}

// Customer information
export interface Customer {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
}

// Transaction/Sale record
export interface Transaction {
  id: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  paymentMethod: PaymentMethod;
  customerId?: string;
  createdAt: Date;
}

// Payment methods
export type PaymentMethod = 'cash' | 'card' | 'mobile';

// Category for products
export interface Category {
  id: string;
  name: string;
  icon?: string;
}
