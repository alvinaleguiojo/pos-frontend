import type { Product, Category, Customer } from '../types';

// Sample categories
export const categories: Category[] = [
  { id: '1', name: 'All', icon: '📦' },
  { id: '2', name: 'Beverages', icon: '🥤' },
  { id: '3', name: 'Food', icon: '🍔' },
  { id: '4', name: 'Snacks', icon: '🍿' },
  { id: '5', name: 'Desserts', icon: '🍰' },
];

// Sample products
export const products: Product[] = [
  { id: '1', name: 'Coffee', price: 3.50, category: 'Beverages', stock: 100, barcode: '001' },
  { id: '2', name: 'Tea', price: 2.50, category: 'Beverages', stock: 80, barcode: '002' },
  { id: '3', name: 'Orange Juice', price: 4.00, category: 'Beverages', stock: 50, barcode: '003' },
  { id: '4', name: 'Burger', price: 8.99, category: 'Food', stock: 30, barcode: '004' },
  { id: '5', name: 'Pizza Slice', price: 3.99, category: 'Food', stock: 40, barcode: '005' },
  { id: '6', name: 'Sandwich', price: 6.50, category: 'Food', stock: 25, barcode: '006' },
  { id: '7', name: 'Chips', price: 1.99, category: 'Snacks', stock: 150, barcode: '007' },
  { id: '8', name: 'Popcorn', price: 2.99, category: 'Snacks', stock: 60, barcode: '008' },
  { id: '9', name: 'Chocolate Bar', price: 1.50, category: 'Snacks', stock: 200, barcode: '009' },
  { id: '10', name: 'Ice Cream', price: 4.50, category: 'Desserts', stock: 45, barcode: '010' },
  { id: '11', name: 'Cake Slice', price: 5.99, category: 'Desserts', stock: 20, barcode: '011' },
  { id: '12', name: 'Cookie', price: 1.25, category: 'Desserts', stock: 100, barcode: '012' },
];

// Sample customers
export const customers: Customer[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', phone: '+1 234-567-8901', address: '123 Main St, City' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', phone: '+1 234-567-8902', address: '456 Oak Ave, Town' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', phone: '+1 234-567-8903', address: '789 Pine Rd, Village' },
  { id: '4', name: 'Alice Brown', email: 'alice@example.com', phone: '+1 234-567-8904', address: '321 Elm St, City' },
  { id: '5', name: 'Charlie Wilson', email: 'charlie@example.com', phone: '+1 234-567-8905', address: '654 Maple Dr, Town' },
];
