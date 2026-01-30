import { Minus, Plus, Trash2, ShoppingBag, CreditCard, Banknote, Smartphone, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import type { PaymentMethod } from '../types';
import { useState } from 'react';

interface CartProps {
  isDocked?: boolean;
  onToggleDock?: () => void;
  isExpanded?: boolean;
}

export default function Cart({ onToggleDock, isExpanded = true }: CartProps) {
  const { state, removeItem, updateQuantity, clearCart, completeSale, getSubtotal, getTax, getTotal } = useCart();
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>('cash');

  const handleCheckout = () => {
    if (state.items.length === 0) return;
    completeSale(selectedPayment);
    alert('Sale completed successfully!');
  };

  const paymentMethods = [
    { id: 'cash' as PaymentMethod, label: 'Cash', icon: Banknote },
    { id: 'card' as PaymentMethod, label: 'Card', icon: CreditCard },
    { id: 'mobile' as PaymentMethod, label: 'Mobile', icon: Smartphone },
  ];

  return (
    <div 
      className="flex flex-col h-full" 
      style={{ 
        width: '340px', 
        backgroundColor: 'white', 
        borderLeft: '1px solid #e5e7eb',
      }}
    >
      {/* Header */}
      <div style={{ padding: '20px', borderBottom: '1px solid #f3f4f6' }}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-bold" style={{ color: '#111827', fontSize: '16px', marginBottom: '2px' }}>Current Order</h2>
            <p style={{ color: '#9ca3af', fontSize: '13px' }}>{state.items.length} items in cart</p>
          </div>
          <div className="flex items-center" style={{ gap: '8px' }}>
            {onToggleDock && (
              <button
                onClick={onToggleDock}
                className="rounded-lg flex items-center justify-center transition-colors"
                style={{ 
                  width: '36px', 
                  height: '36px', 
                  backgroundColor: '#f3f4f6',
                }}
                title={isExpanded ? 'Collapse cart' : 'Expand cart'}
              >
                <ChevronRight style={{ width: '18px', height: '18px', color: '#6b7280' }} />
              </button>
            )}
            <div className="rounded-xl flex items-center justify-center" style={{ width: '44px', height: '44px', background: 'linear-gradient(135deg, #eef2ff, #e0e7ff)' }}>
              <ShoppingBag style={{ width: '22px', height: '22px', color: '#6366f1' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto" style={{ padding: '16px' }}>
        {state.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center" style={{ paddingTop: '48px', paddingBottom: '48px' }}>
            <div className="rounded-full flex items-center justify-center" style={{ width: '80px', height: '80px', backgroundColor: '#f3f4f6', marginBottom: '16px' }}>
              <ShoppingBag style={{ width: '40px', height: '40px', color: '#d1d5db' }} />
            </div>
            <p className="font-semibold" style={{ color: '#111827', fontSize: '15px' }}>Cart is empty</p>
            <p style={{ color: '#9ca3af', fontSize: '13px', marginTop: '4px' }}>Add items to get started</p>
          </div>
        ) : (
          <ul className="space-y-4">
            {state.items.map((item) => (
              <li 
                key={item.product.id} 
                className="flex gap-4 p-4 rounded-xl transition-colors"
                style={{ backgroundColor: '#f9fafb' }}
              >
                <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl" style={{ backgroundColor: 'white', border: '1px solid #e5e7eb' }}>
                  📦
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm" style={{ color: '#111827' }}>{item.product.name}</h4>
                  <p className="text-sm font-bold" style={{ color: '#6366f1' }}>
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center rounded-lg" style={{ backgroundColor: 'white', border: '1px solid #e5e7eb' }}>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1.5 hover:bg-gray-100 rounded-l-lg transition-colors"
                      >
                        <Minus className="w-3 h-3 text-gray-600" />
                      </button>
                      <span className="text-sm font-semibold w-8 text-center text-gray-900">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1.5 hover:bg-gray-100 rounded-r-lg transition-colors"
                      >
                        <Plus className="w-3 h-3 text-gray-600" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="p-1.5 hover:bg-red-100 rounded-lg text-red-500 ml-auto transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Payment Section */}
      <div style={{ backgroundColor: '#f9fafb', borderTop: '1px solid #e5e7eb', padding: '16px' }}>
        {/* Payment Method */}
        <div style={{ marginBottom: '14px' }}>
          <p className="font-semibold uppercase tracking-wider" style={{ color: '#9ca3af', fontSize: '11px', marginBottom: '10px' }}>Payment Method</p>
          <div className="grid grid-cols-3" style={{ gap: '8px' }}>
            {paymentMethods.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setSelectedPayment(id)}
                className="flex flex-col items-center rounded-lg font-medium transition-all duration-200"
                style={{
                  padding: '12px 8px',
                  gap: '6px',
                  ...(selectedPayment === id
                    ? { background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: 'white', boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)' }
                    : { backgroundColor: 'white', border: '1px solid #e5e7eb', color: '#6b7280' })
                }}
              >
                <Icon style={{ width: '20px', height: '20px' }} />
                <span style={{ fontSize: '11px', fontWeight: 600 }}>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Totals */}
        <div className="rounded-lg" style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', padding: '14px', marginBottom: '14px' }}>
          <div className="flex justify-between" style={{ fontSize: '13px', marginBottom: '8px' }}>
            <span style={{ color: '#9ca3af' }}>Subtotal</span>
            <span className="font-semibold" style={{ color: '#111827' }}>${getSubtotal().toFixed(2)}</span>
          </div>
          <div className="flex justify-between" style={{ fontSize: '13px', marginBottom: '10px' }}>
            <span style={{ color: '#9ca3af' }}>Tax (10%)</span>
            <span className="font-semibold" style={{ color: '#111827' }}>${getTax().toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold" style={{ borderTop: '1px solid #f3f4f6', paddingTop: '10px', fontSize: '15px' }}>
            <span style={{ color: '#111827' }}>Total</span>
            <span style={{ color: '#6366f1' }}>${getTotal().toFixed(2)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex" style={{ gap: '10px' }}>
          <button
            onClick={clearCart}
            className="flex-1 rounded-lg font-semibold transition-all"
            style={{ padding: '12px', backgroundColor: 'white', border: '1px solid #e5e7eb', color: '#374151', fontSize: '13px' }}
            disabled={state.items.length === 0}
          >
            Clear
          </button>
          <button
            onClick={handleCheckout}
            className="flex-1 rounded-lg font-semibold transition-all"
            style={{ 
              padding: '12px',
              fontSize: '13px',
              background: state.items.length === 0 ? '#d1d5db' : 'linear-gradient(135deg, #6366f1, #8b5cf6)', 
              color: 'white', 
              boxShadow: state.items.length === 0 ? 'none' : '0 4px 12px rgba(99, 102, 241, 0.3)' 
            }}
            disabled={state.items.length === 0}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
