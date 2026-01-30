import { useCart } from '../context/CartContext';
import { Search, FileText, Download } from 'lucide-react';
import { useState } from 'react';

export default function TransactionsPage() {
  const { state } = useCart();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="overflow-y-auto h-full" style={{ backgroundColor: '#f8fafc', padding: '28px 32px' }}>
      <div className="flex items-center justify-between" style={{ marginBottom: '24px', gap: '20px' }}>
        <div 
          className="relative flex-1 max-w-md"
          style={{ 
            backgroundColor: 'white', 
            borderRadius: '12px', 
            border: '1px solid #e5e7eb',
            boxShadow: '0 2px 4px rgba(0,0,0,0.04)'
          }}
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2" style={{ width: '18px', height: '18px', color: '#9ca3af' }} />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ 
              backgroundColor: 'transparent', 
              border: 'none', 
              borderRadius: '12px', 
              padding: '12px 16px 12px 44px', 
              width: '100%', 
              outline: 'none',
              fontSize: '14px'
            }}
          />
        </div>
        <button 
          className="flex items-center font-semibold rounded-lg transition-all"
          style={{ 
            gap: '8px',
            padding: '12px 20px',
            backgroundColor: 'white', 
            border: '1px solid #e5e7eb', 
            color: '#374151',
            boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
            fontSize: '14px'
          }}
        >
          <Download style={{ width: '18px', height: '18px' }} />
          Export
        </button>
      </div>

      {/* Transactions List */}
      <div 
        className="rounded-xl overflow-hidden" 
        style={{ 
          backgroundColor: 'white', 
          border: '1px solid #e5e7eb', 
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)' 
        }}
      >
        {state.transactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center" style={{ padding: '48px 0' }}>
            <div className="rounded-full flex items-center justify-center" style={{ width: '64px', height: '64px', backgroundColor: '#f3f4f6', marginBottom: '16px' }}>
              <FileText style={{ width: '32px', height: '32px', color: '#9ca3af' }} />
            </div>
            <p className="font-semibold" style={{ color: '#111827', fontSize: '15px' }}>No transactions yet</p>
            <p style={{ color: '#9ca3af', fontSize: '13px', marginTop: '4px' }}>Complete a sale to see it here</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                  <th className="text-left uppercase tracking-wider" style={{ padding: '14px 20px', fontSize: '11px', fontWeight: 600, color: '#9ca3af' }}>Order ID</th>
                  <th className="text-left uppercase tracking-wider" style={{ padding: '14px 20px', fontSize: '11px', fontWeight: 600, color: '#9ca3af' }}>Items</th>
                  <th className="text-left uppercase tracking-wider" style={{ padding: '14px 20px', fontSize: '11px', fontWeight: 600, color: '#9ca3af' }}>Subtotal</th>
                  <th className="text-left uppercase tracking-wider" style={{ padding: '14px 20px', fontSize: '11px', fontWeight: 600, color: '#9ca3af' }}>Tax</th>
                  <th className="text-left uppercase tracking-wider" style={{ padding: '14px 20px', fontSize: '11px', fontWeight: 600, color: '#9ca3af' }}>Total</th>
                  <th className="text-left uppercase tracking-wider" style={{ padding: '14px 20px', fontSize: '11px', fontWeight: 600, color: '#9ca3af' }}>Payment</th>
                  <th className="text-left uppercase tracking-wider" style={{ padding: '14px 20px', fontSize: '11px', fontWeight: 600, color: '#9ca3af' }}>Date & Time</th>
                </tr>
              </thead>
              <tbody>
                {state.transactions.slice().reverse().map((transaction, index) => (
                  <tr key={transaction.id} style={{ borderBottom: index < state.transactions.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                    <td style={{ padding: '16px 20px' }}>
                      <span className="font-mono font-semibold" style={{ fontSize: '13px', padding: '4px 8px', borderRadius: '6px', color: '#111827', backgroundColor: '#f3f4f6' }}>
                        #{transaction.id.slice(-8)}
                      </span>
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      <div className="max-w-xs truncate" style={{ fontSize: '13px', color: '#6b7280' }}>
                        {transaction.items.map((item, idx) => (
                          <span key={item.product.id}>
                            {item.product.name} ×{item.quantity}
                            {idx < transaction.items.length - 1 ? ', ' : ''}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td style={{ padding: '16px 20px', fontSize: '13px', color: '#6b7280' }}>
                      ${transaction.subtotal.toFixed(2)}
                    </td>
                    <td style={{ padding: '16px 20px', fontSize: '13px', color: '#6b7280' }}>
                      ${transaction.tax.toFixed(2)}
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      <span className="font-bold" style={{ fontSize: '13px', color: '#111827' }}>${transaction.total.toFixed(2)}</span>
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      <span 
                        className="inline-flex items-center rounded-full capitalize"
                        style={{
                          padding: '4px 10px',
                          fontSize: '11px',
                          fontWeight: 600,
                          ...(transaction.paymentMethod === 'cash' 
                            ? { backgroundColor: '#dcfce7', color: '#16a34a' }
                            : transaction.paymentMethod === 'card'
                            ? { backgroundColor: '#dbeafe', color: '#2563eb' }
                            : { backgroundColor: '#ede9fe', color: '#7c3aed' })
                        }}
                      >
                        {transaction.paymentMethod}
                      </span>
                    </td>
                    <td style={{ padding: '16px 20px', fontSize: '13px', color: '#9ca3af' }}>
                      {transaction.createdAt.toLocaleDateString()} {transaction.createdAt.toLocaleTimeString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
