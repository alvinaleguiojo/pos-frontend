import { useState } from 'react';
import { Search, Menu, Bell, User, ChevronDown } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface HeaderProps {
  onMenuToggle?: () => void;
}

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  '/': { title: 'Welcome back! 👋', subtitle: "Here's what's happening today" },
  '/pos': { title: 'POS Terminal', subtitle: 'Process sales and manage orders' },
  '/products': { title: 'Products', subtitle: 'Manage your inventory' },
  '/customers': { title: 'Customers', subtitle: 'Manage customer relationships' },
  '/transactions': { title: 'Transactions', subtitle: 'View sales history' },
  '/settings': { title: 'Settings', subtitle: 'Configure your store' },
};

export default function Header({ onMenuToggle }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const pageInfo = pageTitles[location.pathname] || pageTitles['/'];

  return (
    <header style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', padding: '16px 32px', flexShrink: 0 }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuToggle}
            className="p-2 rounded-xl lg:hidden transition-colors"
            style={{ color: '#4b5563' }}
          >
            <Menu className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-xl font-bold" style={{ color: '#111827' }}>{pageInfo.title}</h2>
            <p className="text-sm" style={{ color: '#6b7280' }}>{pageInfo.subtitle}</p>
          </div>
        </div>

        <div className="flex-1 max-w-xl mx-10 hidden lg:block">
          <div 
            className="relative"
            style={{ 
              backgroundColor: '#f9fafb', 
              borderRadius: '14px', 
              border: '1px solid #e5e7eb'
            }}
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#9ca3af' }} />
            <input
              type="text"
              placeholder="Search products, orders, customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '14px 16px 14px 48px', 
                backgroundColor: 'transparent', 
                border: 'none', 
                borderRadius: '14px', 
                outline: 'none',
                fontSize: '15px',
                color: '#374151'
              }}
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            className="relative p-3 rounded-xl transition-colors"
            style={{ backgroundColor: '#f9fafb' }}
          >
            <Bell className="w-5 h-5" style={{ color: '#4b5563' }} />
            <span 
              className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: '#ef4444', border: '2px solid white' }}
            ></span>
          </button>
          
          <div className="flex items-center gap-3 pl-4" style={{ borderLeft: '1px solid #e5e7eb' }}>
            <div 
              className="w-11 h-11 rounded-xl flex items-center justify-center" 
              style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 4px 14px rgba(99, 102, 241, 0.3)' }}
            >
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-bold" style={{ color: '#111827' }}>Admin User</p>
              <p className="text-xs" style={{ color: '#6b7280' }}>Store Manager</p>
            </div>
            <ChevronDown className="w-4 h-4 hidden sm:block" style={{ color: '#9ca3af' }} />
          </div>
        </div>
      </div>
    </header>
  );
}
