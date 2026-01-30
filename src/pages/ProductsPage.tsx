import { useState } from 'react';
import { products as initialProducts, categories } from '../data/sampleData';
import { Plus, Edit, Trash2, Search, Package, X } from 'lucide-react';
import type { Product } from '../types';

interface ProductFormData {
  name: string;
  category: string;
  price: string;
  stock: string;
  barcode: string;
}

const emptyForm: ProductFormData = {
  name: '',
  category: 'Beverages',
  price: '',
  stock: '',
  barcode: '',
};

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [productsList, setProductsList] = useState<Product[]>(initialProducts);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<ProductFormData>(emptyForm);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const filteredProducts = productsList.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categoryOptions = categories.filter(c => c.name !== 'All').map(c => c.name);

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData(emptyForm);
    setShowModal(true);
  };

  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      stock: product.stock.toString(),
      barcode: product.barcode || '',
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProduct(null);
    setFormData(emptyForm);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price || !formData.stock) {
      alert('Please fill in all required fields');
      return;
    }

    const productData: Product = {
      id: editingProduct?.id || Date.now().toString(),
      name: formData.name,
      category: formData.category,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      barcode: formData.barcode || undefined,
    };

    if (editingProduct) {
      setProductsList(prev => prev.map(p => p.id === editingProduct.id ? productData : p));
    } else {
      setProductsList(prev => [...prev, productData]);
    }

    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    setProductsList(prev => prev.filter(p => p.id !== id));
    setShowDeleteConfirm(null);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 14px',
    backgroundColor: '#f9fafb',
    border: '1px solid #e5e7eb',
    borderRadius: '10px',
    outline: 'none',
    fontSize: '14px',
  };

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
            placeholder="Search products..."
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
          onClick={handleOpenAdd}
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
          Add Product
        </button>
      </div>

      {/* Products Table */}
      <div 
        className="rounded-xl overflow-hidden" 
        style={{ 
          backgroundColor: 'white', 
          border: '1px solid #e5e7eb', 
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)' 
        }}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                <th className="text-left uppercase tracking-wider" style={{ padding: '14px 20px', fontSize: '11px', fontWeight: 600, color: '#9ca3af' }}>Product</th>
                <th className="text-left uppercase tracking-wider" style={{ padding: '14px 20px', fontSize: '11px', fontWeight: 600, color: '#9ca3af' }}>Category</th>
                <th className="text-left uppercase tracking-wider" style={{ padding: '14px 20px', fontSize: '11px', fontWeight: 600, color: '#9ca3af' }}>Price</th>
                <th className="text-left uppercase tracking-wider" style={{ padding: '14px 20px', fontSize: '11px', fontWeight: 600, color: '#9ca3af' }}>Stock</th>
                <th className="text-left uppercase tracking-wider" style={{ padding: '14px 20px', fontSize: '11px', fontWeight: 600, color: '#9ca3af' }}>Barcode</th>
                <th className="text-left uppercase tracking-wider" style={{ padding: '14px 20px', fontSize: '11px', fontWeight: 600, color: '#9ca3af' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: '48px 20px', textAlign: 'center' }}>
                    <div className="flex flex-col items-center">
                      <div className="rounded-full flex items-center justify-center" style={{ width: '64px', height: '64px', backgroundColor: '#f3f4f6', marginBottom: '16px' }}>
                        <Package style={{ width: '32px', height: '32px', color: '#9ca3af' }} />
                      </div>
                      <p className="font-semibold" style={{ color: '#111827', fontSize: '15px' }}>No products found</p>
                      <p style={{ color: '#9ca3af', fontSize: '13px', marginTop: '4px' }}>Try a different search or add a new product</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product, index) => (
                  <tr key={product.id} style={{ borderBottom: index < filteredProducts.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                    <td style={{ padding: '16px 20px' }}>
                      <div className="flex items-center" style={{ gap: '12px' }}>
                        <div className="rounded-lg flex items-center justify-center" style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #f8fafc, #f1f5f9)', border: '1px solid #e5e7eb' }}>
                          <Package style={{ width: '18px', height: '18px', color: '#9ca3af' }} />
                        </div>
                        <span className="font-semibold" style={{ color: '#111827', fontSize: '14px' }}>{product.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '16px 20px', color: '#6b7280', fontSize: '14px' }}>{product.category}</td>
                    <td style={{ padding: '16px 20px', fontWeight: 700, color: '#111827', fontSize: '14px' }}>${product.price.toFixed(2)}</td>
                    <td style={{ padding: '16px 20px' }}>
                      <span 
                        className="inline-flex items-center rounded-full"
                        style={{
                          padding: '4px 10px',
                          fontSize: '12px',
                          fontWeight: 600,
                          ...(product.stock > 20 
                            ? { backgroundColor: '#dcfce7', color: '#16a34a' }
                            : product.stock > 0
                            ? { backgroundColor: '#fef3c7', color: '#b45309' }
                            : { backgroundColor: '#fee2e2', color: '#dc2626' })
                        }}
                      >
                        {product.stock} units
                      </span>
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      <span className="font-mono" style={{ fontSize: '13px', padding: '4px 8px', borderRadius: '6px', color: '#6b7280', backgroundColor: '#f3f4f6' }}>
                        {product.barcode || '-'}
                      </span>
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      <div className="flex" style={{ gap: '4px' }}>
                        <button 
                          onClick={() => handleOpenEdit(product)}
                          className="rounded-lg transition-colors"
                          style={{ padding: '8px', color: '#6b7280' }}
                        >
                          <Edit style={{ width: '16px', height: '16px' }} />
                        </button>
                        <button 
                          onClick={() => setShowDeleteConfirm(product.id)}
                          className="rounded-lg transition-colors"
                          style={{ padding: '8px', color: '#6b7280' }}
                        >
                          <Trash2 style={{ width: '16px', height: '16px' }} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div 
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={handleCloseModal}
        >
          <div 
            className="rounded-xl"
            style={{ 
              backgroundColor: 'white', 
              width: '100%', 
              maxWidth: '480px', 
              padding: '24px',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
            }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between" style={{ marginBottom: '24px' }}>
              <h2 className="font-bold" style={{ color: '#111827', fontSize: '18px' }}>
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button onClick={handleCloseModal} style={{ padding: '8px', color: '#6b7280' }}>
                <X style={{ width: '20px', height: '20px' }} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label className="block font-semibold" style={{ color: '#374151', fontSize: '13px', marginBottom: '8px' }}>
                    Product Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter product name"
                    style={inputStyle}
                    required
                  />
                </div>
                
                <div>
                  <label className="block font-semibold" style={{ color: '#374151', fontSize: '13px', marginBottom: '8px' }}>
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    style={inputStyle}
                  >
                    {categoryOptions.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                
                <div className="grid grid-cols-2" style={{ gap: '16px' }}>
                  <div>
                    <label className="block font-semibold" style={{ color: '#374151', fontSize: '13px', marginBottom: '8px' }}>
                      Price ($) *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.price}
                      onChange={e => setFormData(prev => ({ ...prev, price: e.target.value }))}
                      placeholder="0.00"
                      style={inputStyle}
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-semibold" style={{ color: '#374151', fontSize: '13px', marginBottom: '8px' }}>
                      Stock *
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.stock}
                      onChange={e => setFormData(prev => ({ ...prev, stock: e.target.value }))}
                      placeholder="0"
                      style={inputStyle}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block font-semibold" style={{ color: '#374151', fontSize: '13px', marginBottom: '8px' }}>
                    Barcode (optional)
                  </label>
                  <input
                    type="text"
                    value={formData.barcode}
                    onChange={e => setFormData(prev => ({ ...prev, barcode: e.target.value }))}
                    placeholder="Enter barcode"
                    style={inputStyle}
                  />
                </div>
              </div>
              
              <div className="flex justify-end" style={{ gap: '12px', marginTop: '24px' }}>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="font-semibold rounded-lg"
                  style={{ 
                    padding: '12px 20px', 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb', 
                    color: '#374151',
                    fontSize: '14px'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="font-semibold rounded-lg"
                  style={{ 
                    padding: '12px 20px',
                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', 
                    color: 'white',
                    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
                    fontSize: '14px'
                  }}
                >
                  {editingProduct ? 'Save Changes' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div 
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={() => setShowDeleteConfirm(null)}
        >
          <div 
            className="rounded-xl"
            style={{ 
              backgroundColor: 'white', 
              width: '100%', 
              maxWidth: '400px', 
              padding: '24px',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
            }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-center" style={{ marginBottom: '16px' }}>
              <div className="rounded-full flex items-center justify-center" style={{ width: '56px', height: '56px', backgroundColor: '#fee2e2' }}>
                <Trash2 style={{ width: '28px', height: '28px', color: '#dc2626' }} />
              </div>
            </div>
            <h2 className="font-bold text-center" style={{ color: '#111827', fontSize: '18px', marginBottom: '8px' }}>
              Delete Product?
            </h2>
            <p className="text-center" style={{ color: '#6b7280', fontSize: '14px', marginBottom: '24px' }}>
              Are you sure you want to delete this product? This action cannot be undone.
            </p>
            <div className="flex" style={{ gap: '12px' }}>
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 font-semibold rounded-lg"
                style={{ 
                  padding: '12px 20px', 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb', 
                  color: '#374151',
                  fontSize: '14px'
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(showDeleteConfirm)}
                className="flex-1 font-semibold rounded-lg"
                style={{ 
                  padding: '12px 20px',
                  backgroundColor: '#dc2626', 
                  color: 'white',
                  fontSize: '14px'
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
