import { Save, Store, Receipt, Percent } from 'lucide-react';

export default function SettingsPage() {
  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 14px',
    backgroundColor: '#f9fafb',
    border: '1px solid #e5e7eb',
    borderRadius: '10px',
    outline: 'none',
    fontSize: '14px',
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: 'white',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    padding: '24px',
    marginBottom: '20px',
  };

  return (
    <div className="overflow-y-auto h-full" style={{ backgroundColor: '#f8fafc', padding: '28px 32px' }}>
      <div className="max-w-2xl mx-auto">
        {/* Store Settings */}
        <div style={cardStyle}>
          <div className="flex items-center" style={{ gap: '14px', marginBottom: '20px' }}>
            <div className="rounded-lg flex items-center justify-center" style={{ width: '44px', height: '44px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 4px 12px rgba(99, 102, 241, 0.25)' }}>
              <Store style={{ width: '22px', height: '22px', color: 'white' }} />
            </div>
            <h2 className="font-bold" style={{ color: '#111827', fontSize: '17px' }}>Store Information</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label className="block font-semibold" style={{ color: '#374151', fontSize: '13px', marginBottom: '8px' }}>
                Store Name
              </label>
              <input
                type="text"
                defaultValue="My POS Store"
                style={inputStyle}
              />
            </div>
            <div>
              <label className="block font-semibold" style={{ color: '#374151', fontSize: '13px', marginBottom: '8px' }}>
                Address
              </label>
              <input
                type="text"
                placeholder="Enter store address"
                style={inputStyle}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: '16px' }}>
              <div>
                <label className="block font-semibold" style={{ color: '#374151', fontSize: '13px', marginBottom: '8px' }}>
                  Phone
                </label>
                <input
                  type="tel"
                  placeholder="555-000-0000"
                  style={inputStyle}
                />
              </div>
              <div>
                <label className="block font-semibold" style={{ color: '#374151', fontSize: '13px', marginBottom: '8px' }}>
                  Email
                </label>
                <input
                  type="email"
                  placeholder="store@example.com"
                  style={inputStyle}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tax Settings */}
        <div style={cardStyle}>
          <div className="flex items-center" style={{ gap: '14px', marginBottom: '20px' }}>
            <div className="rounded-lg flex items-center justify-center" style={{ width: '44px', height: '44px', background: 'linear-gradient(135deg, #10b981, #059669)', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.25)' }}>
              <Percent style={{ width: '22px', height: '22px', color: 'white' }} />
            </div>
            <h2 className="font-bold" style={{ color: '#111827', fontSize: '17px' }}>Tax Settings</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label className="block font-semibold" style={{ color: '#374151', fontSize: '13px', marginBottom: '8px' }}>
                Tax Rate (%)
              </label>
              <input
                type="number"
                defaultValue="10"
                min="0"
                max="100"
                style={{ ...inputStyle, width: '160px' }}
              />
            </div>
            <div className="flex items-center" style={{ gap: '10px' }}>
              <input 
                type="checkbox" 
                id="taxIncluded" 
                defaultChecked
                style={{ width: '18px', height: '18px', accentColor: '#6366f1', cursor: 'pointer' }}
              />
              <label htmlFor="taxIncluded" className="font-medium cursor-pointer" style={{ color: '#374151', fontSize: '13px' }}>
                Enable tax calculation
              </label>
            </div>
          </div>
        </div>

        {/* Receipt Settings */}
        <div style={cardStyle}>
          <div className="flex items-center" style={{ gap: '14px', marginBottom: '20px' }}>
            <div className="rounded-lg flex items-center justify-center" style={{ width: '44px', height: '44px', background: 'linear-gradient(135deg, #f59e0b, #d97706)', boxShadow: '0 4px 12px rgba(245, 158, 11, 0.25)' }}>
              <Receipt style={{ width: '22px', height: '22px', color: 'white' }} />
            </div>
            <h2 className="font-bold" style={{ color: '#111827', fontSize: '17px' }}>Receipt Settings</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label className="block font-semibold" style={{ color: '#374151', fontSize: '13px', marginBottom: '8px' }}>
                Receipt Footer Message
              </label>
              <textarea
                rows={3}
                defaultValue="Thank you for shopping with us!"
                style={{ ...inputStyle, resize: 'none' }}
              />
            </div>
            <div className="flex items-center" style={{ gap: '10px' }}>
              <input 
                type="checkbox" 
                id="printReceipt" 
                defaultChecked
                style={{ width: '18px', height: '18px', accentColor: '#6366f1', cursor: 'pointer' }}
              />
              <label htmlFor="printReceipt" className="font-medium cursor-pointer" style={{ color: '#374151', fontSize: '13px' }}>
                Auto-print receipt after sale
              </label>
            </div>
          </div>
        </div>

        <button 
          className="flex items-center font-semibold rounded-lg transition-all"
          style={{ 
            gap: '10px',
            padding: '12px 24px',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', 
            color: 'white',
            boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
            fontSize: '14px'
          }}
        >
          <Save style={{ width: '18px', height: '18px' }} />
          Save Settings
        </button>
      </div>
    </div>
  );
}
