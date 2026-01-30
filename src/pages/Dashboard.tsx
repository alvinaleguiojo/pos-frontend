import { TrendingUp, ShoppingBag, DollarSign, Users, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useAppSelector } from '../store/hooks';
import { selectAllTransactions, selectTotalRevenue, selectCustomerCount } from '../store/selectors';

export default function Dashboard() {
  const transactions = useAppSelector(selectAllTransactions);
  const totalRevenue = useAppSelector(selectTotalRevenue);
  const customerCount = useAppSelector(selectCustomerCount);

  const stats = [
    {
      title: "Today's Sales",
      value: `$${totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      change: '+12.5%',
      isPositive: true,
      iconBg: '#dcfce7',
      iconColor: '#16a34a',
    },
    {
      title: 'Total Orders',
      value: transactions.length.toString(),
      icon: ShoppingBag,
      change: '+8.2%',
      isPositive: true,
      iconBg: '#dbeafe',
      iconColor: '#2563eb',
    },
    {
      title: 'Avg. Order Value',
      value: transactions.length > 0 
        ? `$${(totalRevenue / transactions.length).toFixed(2)}`
        : '$0.00',
      icon: TrendingUp,
      change: '+5.1%',
      isPositive: true,
      iconBg: '#ede9fe',
      iconColor: '#7c3aed',
    },
    {
      title: 'Active Customers',
      value: customerCount.toString(),
      icon: Users,
      change: '-2.4%',
      isPositive: false,
      iconBg: '#fef3c7',
      iconColor: '#d97706',
    },
  ];

  return (
    <div className="overflow-y-auto h-full" style={{ backgroundColor: '#f8fafc', padding: '28px 32px' }}>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4" style={{ gap: '20px', marginBottom: '24px' }}>
        {stats.map((stat) => (
          <div 
            key={stat.title} 
            className="rounded-xl transition-all duration-300"
            style={{ 
              backgroundColor: 'white', 
              border: '1px solid #e5e7eb', 
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              padding: '24px'
            }}
          >
            <div className="flex items-start justify-between">
              <div 
                className="rounded-lg flex items-center justify-center"
                style={{ backgroundColor: stat.iconBg, width: '44px', height: '44px' }}
              >
                <stat.icon style={{ width: '22px', height: '22px', color: stat.iconColor }} />
              </div>
              <div className="flex items-center font-semibold" style={{ fontSize: '13px', gap: '3px', color: stat.isPositive ? '#16a34a' : '#ef4444' }}>
                {stat.isPositive ? <ArrowUpRight style={{ width: '15px', height: '15px' }} /> : <ArrowDownRight style={{ width: '15px', height: '15px' }} />}
                {stat.change}
              </div>
            </div>
            <div style={{ marginTop: '20px' }}>
              <p className="font-bold" style={{ color: '#111827', fontSize: '28px', lineHeight: '1.2' }}>{stat.value}</p>
              <p style={{ color: '#9ca3af', fontSize: '13px', marginTop: '6px' }}>{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Transactions */}
      <div 
        className="rounded-xl" 
        style={{ 
          backgroundColor: 'white', 
          border: '1px solid #e5e7eb', 
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          padding: '24px'
        }}
      >
        <div className="flex items-center justify-between" style={{ marginBottom: '24px' }}>
          <div>
            <h2 className="font-bold" style={{ color: '#111827', fontSize: '17px' }}>Recent Transactions</h2>
            <p style={{ color: '#9ca3af', fontSize: '13px', marginTop: '4px' }}>Your latest sales activity</p>
          </div>
          <button className="font-semibold" style={{ fontSize: '13px', color: '#6366f1' }}>
            View All →
          </button>
        </div>
        {transactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center" style={{ padding: '48px 0' }}>
            <div className="rounded-full flex items-center justify-center" style={{ width: '64px', height: '64px', backgroundColor: '#f3f4f6', marginBottom: '16px' }}>
              <ShoppingBag style={{ width: '32px', height: '32px', color: '#9ca3af' }} />
            </div>
            <p className="font-semibold" style={{ color: '#111827', fontSize: '15px' }}>No transactions yet</p>
            <p style={{ color: '#9ca3af', fontSize: '13px', marginTop: '4px' }}>Start selling to see your transactions here</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <th className="text-left uppercase tracking-wider" style={{ paddingBottom: '14px', fontSize: '11px', fontWeight: 600, color: '#9ca3af' }}>Order ID</th>
                  <th className="text-left uppercase tracking-wider" style={{ paddingBottom: '14px', fontSize: '11px', fontWeight: 600, color: '#9ca3af' }}>Items</th>
                  <th className="text-left uppercase tracking-wider" style={{ paddingBottom: '14px', fontSize: '11px', fontWeight: 600, color: '#9ca3af' }}>Total</th>
                  <th className="text-left uppercase tracking-wider" style={{ paddingBottom: '14px', fontSize: '11px', fontWeight: 600, color: '#9ca3af' }}>Payment</th>
                  <th className="text-left uppercase tracking-wider" style={{ paddingBottom: '14px', fontSize: '11px', fontWeight: 600, color: '#9ca3af' }}>Time</th>
                </tr>
              </thead>
              <tbody>
                {transactions.slice(-5).reverse().map((transaction, index) => (
                  <tr key={transaction.id} style={{ borderBottom: index < transactions.slice(-5).length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                    <td style={{ padding: '16px 0' }}>
                      <span className="font-mono font-semibold" style={{ fontSize: '13px', color: '#111827' }}>#{transaction.id.slice(-6)}</span>
                    </td>
                    <td style={{ padding: '16px 0' }}>
                      <span style={{ fontSize: '13px', color: '#6b7280' }}>{transaction.items.length} items</span>
                    </td>
                    <td style={{ padding: '16px 0' }}>
                      <span className="font-bold" style={{ fontSize: '13px', color: '#111827' }}>${transaction.total.toFixed(2)}</span>
                    </td>
                    <td style={{ padding: '16px 0' }}>
                      <span 
                        className="inline-flex items-center rounded-full capitalize"
                        style={{
                          padding: '5px 12px',
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
                    <td style={{ padding: '16px 0' }}>
                      <span style={{ fontSize: '13px', color: '#9ca3af' }}>{transaction.createdAt.toLocaleTimeString()}</span>
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
