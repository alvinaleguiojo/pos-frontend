# POS Frontend

A modern Point of Sale (POS) frontend application built with React, TypeScript, Vite, and Tailwind CSS.

## Features

- **Dashboard**: View sales statistics and recent transactions
- **POS Terminal**: Add products to cart, apply payment methods, and complete sales
- **Product Management**: View and manage product inventory
- **Customer Management**: Track and manage customer information
- **Transaction History**: View all completed transactions
- **Settings**: Configure store information, tax rates, and receipt settings

## Tech Stack

- **React 19** - UI Library
- **TypeScript** - Type Safety
- **Vite 7** - Build Tool
- **Tailwind CSS 4** - Styling
- **React Router 6** - Navigation
- **Lucide React** - Icons

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:5173](http://localhost:5173) in your browser

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/      # Reusable UI components
│   ├── Cart.tsx
│   ├── Header.tsx
│   ├── ProductCard.tsx
│   └── Sidebar.tsx
├── context/         # React Context providers
│   └── CartContext.tsx
├── data/            # Sample data
│   └── sampleData.ts
├── pages/           # Page components
│   ├── CustomersPage.tsx
│   ├── Dashboard.tsx
│   ├── POSPage.tsx
│   ├── ProductsPage.tsx
│   ├── SettingsPage.tsx
│   └── TransactionsPage.tsx
├── types/           # TypeScript type definitions
│   └── index.ts
├── App.tsx          # Main application component
├── index.css        # Global styles with Tailwind
└── main.tsx         # Application entry point
```

## License

MIT