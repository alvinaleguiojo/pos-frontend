import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  Users, 
  FileText, 
  Settings,
  X,
  Store
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/pos', icon: ShoppingCart, label: 'POS Terminal' },
  { to: '/products', icon: Package, label: 'Products' },
  { to: '/customers', icon: Users, label: 'Customers' },
  { to: '/transactions', icon: FileText, label: 'Transactions' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const linkBaseStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '14px 16px',
    borderRadius: '12px',
    fontWeight: 500,
    fontSize: '14px',
    transition: 'all 0.2s ease',
  };

  const activeLinkStyle: React.CSSProperties = {
    ...linkBaseStyle,
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    color: 'white',
    boxShadow: '0 4px 14px rgba(99, 102, 241, 0.35)',
  };

  const inactiveLinkStyle: React.CSSProperties = {
    ...linkBaseStyle,
    color: '#9ca3af',
    backgroundColor: 'transparent',
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
        style={{ backgroundColor: '#111827' }}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-between p-6" style={{ borderBottom: '1px solid #1f2937' }}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 4px 14px rgba(99, 102, 241, 0.35)' }}>
              <Store className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">ArexPOS</h1>
              <p className="text-xs" style={{ color: '#6b7280' }}>Point of Sale System</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg lg:hidden" style={{ color: '#9ca3af' }}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-5 mt-2">
          <p className="text-xs font-semibold uppercase tracking-wider mb-4 px-3" style={{ color: '#6b7280' }}>Main Menu</p>
          <ul className="space-y-2">
            {navItems.map(({ to, icon: Icon, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  onClick={onClose}
                  style={({ isActive }) => isActive ? activeLinkStyle : inactiveLinkStyle}
                  onMouseEnter={(e) => {
                    const target = e.currentTarget;
                    if (!target.style.background?.includes('gradient')) {
                      target.style.backgroundColor = '#1f2937';
                      target.style.color = 'white';
                    }
                  }}
                  onMouseLeave={(e) => {
                    const target = e.currentTarget;
                    if (!target.style.background?.includes('gradient')) {
                      target.style.backgroundColor = 'transparent';
                      target.style.color = '#9ca3af';
                    }
                  }}
                >
                  <Icon className="w-5 h-5" />
                  <span>{label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom Section */}
        <div className="absolute bottom-0 left-0 right-0 p-5" style={{ borderTop: '1px solid #1f2937' }}>
          <div className="rounded-xl p-5" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 4px 14px rgba(99, 102, 241, 0.25)' }}>
            <p className="text-white font-semibold">Need Help?</p>
            <p className="text-sm mt-1" style={{ color: '#c7d2fe' }}>Check our documentation</p>
            <button 
              className="mt-4 w-full text-white text-sm py-2.5 rounded-lg font-medium transition-colors"
              style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
            >
              View Docs
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
