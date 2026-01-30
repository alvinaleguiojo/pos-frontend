import type { RootState } from './index';

// ============= Cart Selectors =============
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartIsLoading = (state: RootState) => state.cart.isLoading;

export const selectCartItemCount = (state: RootState) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);

export const selectSubtotal = (state: RootState) =>
  state.cart.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

export const selectTax = (state: RootState) => {
  const subtotal = state.cart.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  return subtotal * 0.1; // 10% tax
};

export const selectTotal = (state: RootState) => {
  const subtotal = state.cart.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  return subtotal * 1.1; // subtotal + 10% tax
};

// ============= Products Selectors =============
export const selectAllProducts = (state: RootState) => state.products.products;
export const selectSelectedCategory = (state: RootState) => state.products.selectedCategory;
export const selectProductsSearchQuery = (state: RootState) => state.products.searchQuery;
export const selectProductsIsLoading = (state: RootState) => state.products.isLoading;
export const selectProductsError = (state: RootState) => state.products.error;

export const selectFilteredProducts = (state: RootState) => {
  const { products, selectedCategory, searchQuery } = state.products;
  return products.filter((product) => {
    const matchesCategory =
      selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
};

export const selectProductById = (productId: string) => (state: RootState) =>
  state.products.products.find((p) => p.id === productId);

export const selectLowStockProducts = (state: RootState) =>
  state.products.products.filter((p) => p.stock < 10);

// ============= Customers Selectors =============
export const selectAllCustomers = (state: RootState) => state.customers.customers;
export const selectSelectedCustomer = (state: RootState) => state.customers.selectedCustomer;
export const selectCustomersSearchQuery = (state: RootState) => state.customers.searchQuery;
export const selectCustomersIsLoading = (state: RootState) => state.customers.isLoading;
export const selectCustomersError = (state: RootState) => state.customers.error;
export const selectCustomerCount = (state: RootState) => state.customers.customers.length;

export const selectFilteredCustomers = (state: RootState) => {
  const { customers, searchQuery } = state.customers;
  if (!searchQuery) return customers;
  const query = searchQuery.toLowerCase();
  return customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(query) ||
      customer.email?.toLowerCase().includes(query) ||
      customer.phone?.includes(query)
  );
};

export const selectCustomerById = (customerId: string) => (state: RootState) =>
  state.customers.customers.find((c) => c.id === customerId);

// ============= Transactions Selectors =============
export const selectAllTransactions = (state: RootState) => state.transactions.transactions;
export const selectTransactionsIsLoading = (state: RootState) => state.transactions.isLoading;
export const selectTransactionsError = (state: RootState) => state.transactions.error;
export const selectTransactionCount = (state: RootState) => state.transactions.transactions.length;

export const selectRecentTransactions = (state: RootState) =>
  state.transactions.transactions.slice(0, 10);

export const selectTransactionById = (transactionId: string) => (state: RootState) =>
  state.transactions.transactions.find((t) => t.id === transactionId);

export const selectTodayTransactions = (state: RootState) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return state.transactions.transactions.filter((t) => {
    const txDate = new Date(t.createdAt);
    txDate.setHours(0, 0, 0, 0);
    return txDate.getTime() === today.getTime();
  });
};

export const selectTodayRevenue = (state: RootState) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return state.transactions.transactions
    .filter((t) => {
      const txDate = new Date(t.createdAt);
      txDate.setHours(0, 0, 0, 0);
      return txDate.getTime() === today.getTime();
    })
    .reduce((sum, t) => sum + t.total, 0);
};

export const selectTotalRevenue = (state: RootState) =>
  state.transactions.transactions.reduce((sum, t) => sum + t.total, 0);

// ============= Settings Selectors =============
export const selectStoreName = (state: RootState) => state.settings.storeName;
export const selectStoreAddress = (state: RootState) => state.settings.storeAddress;
export const selectStorePhone = (state: RootState) => state.settings.storePhone;
export const selectStoreEmail = (state: RootState) => state.settings.storeEmail;
export const selectCurrency = (state: RootState) => state.settings.currency;
export const selectTaxRate = (state: RootState) => state.settings.taxRate;
export const selectTheme = (state: RootState) => state.settings.theme;
export const selectLanguage = (state: RootState) => state.settings.language;
export const selectReceiptFooter = (state: RootState) => state.settings.receiptFooter;
export const selectLowStockThreshold = (state: RootState) => state.settings.lowStockThreshold;
export const selectAllSettings = (state: RootState) => state.settings;
