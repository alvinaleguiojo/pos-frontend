import { useState } from 'react';
import { Plus, Search, Mail, Phone, MoreVertical } from 'lucide-react';
import type { Customer } from '../types';

const sampleCustomers: Customer[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', phone: '555-0101' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', phone: '555-0102' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', phone: '555-0103' },
  { id: '4', name: 'Alice Brown', email: 'alice@example.com', phone: '555-0104' },
  { id: '5', name: 'Charlie Wilson', email: 'charlie@example.com', phone: '555-0105' },
  { id: '6', name: 'Diana Ross', email: 'diana@example.com', phone: '555-0106' },
];

const avatarGradients = [
  'linear-gradient(135deg, #6366f1, #a855f7)',
  'linear-gradient(135deg, #ec4899, #f43f5e)',
  'linear-gradient(135deg, #10b981, #14b8a6)',
  'linear-gradient(135deg, #f59e0b, #f97316)',
  'linear-gradient(135deg, #3b82f6, #06b6d4)',
  'linear-gradient(135deg, #8b5cf6, #d946ef)',
];

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCustomers = sampleCustomers.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            placeholder="Search customers..."
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
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', 
            color: 'white',
            boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
            fontSize: '14px'
          }}
        >
          <Plus style={{ width: '18px', height: '18px' }} />
          Add Customer
        </button>
      </div>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3" style={{ gap: '20px' }}>
        {filteredCustomers.map((customer, index) => (
          <div 
            key={customer.id} 
            className="rounded-xl transition-all duration-300 cursor-pointer"
            style={{ 
              backgroundColor: 'white', 
              border: '1px solid #e5e7eb', 
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              padding: '20px'
            }}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center" style={{ gap: '14px' }}>
                <div 
                  className="rounded-xl flex items-center justify-center"
                  style={{ width: '48px', height: '48px', background: avatarGradients[index % avatarGradients.length], boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
                >
                  <span className="text-white font-bold" style={{ fontSize: '15px' }}>
                    {customer.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="font-bold" style={{ color: '#111827', fontSize: '15px' }}>{customer.name}</h3>
                  <p style={{ color: '#9ca3af', fontSize: '13px', marginTop: '2px' }}>Regular Customer</p>
                </div>
              </div>
              <button className="rounded-lg transition-colors" style={{ padding: '6px', color: '#9ca3af' }}>
                <MoreVertical style={{ width: '16px', height: '16px' }} />
              </button>
            </div>
            <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #f3f4f6' }}>
              <div className="flex items-center" style={{ gap: '10px', marginBottom: '10px' }}>
                <div className="rounded-lg flex items-center justify-center" style={{ width: '32px', height: '32px', backgroundColor: '#f3f4f6' }}>
                  <Mail style={{ width: '14px', height: '14px', color: '#6b7280' }} />
                </div>
                <span style={{ color: '#6b7280', fontSize: '13px' }}>{customer.email}</span>
              </div>
              <div className="flex items-center" style={{ gap: '10px' }}>
                <div className="rounded-lg flex items-center justify-center" style={{ width: '32px', height: '32px', backgroundColor: '#f3f4f6' }}>
                  <Phone style={{ width: '14px', height: '14px', color: '#6b7280' }} />
                </div>
                <span style={{ color: '#6b7280', fontSize: '13px' }}>{customer.phone}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
