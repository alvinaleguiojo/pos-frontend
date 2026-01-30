import type { Product } from '../types';
import { Plus } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div
      onClick={() => product.stock > 0 && onAddToCart(product)}
      className="rounded-2xl transition-all duration-300 group"
      style={{ 
        backgroundColor: 'white', 
        border: '1px solid #e5e7eb',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        cursor: product.stock > 0 ? 'pointer' : 'not-allowed',
        opacity: product.stock > 0 ? 1 : 0.6,
        padding: '16px'
      }}
    >
      <div 
        className="relative w-full rounded-xl flex items-center justify-center" 
        style={{ background: 'linear-gradient(145deg, #f8fafc, #f1f5f9)', height: '100px', marginBottom: '14px' }}
      >
        <span className="text-5xl">📦</span>
        {product.stock > 0 && (
          <div 
            className="absolute -bottom-3 -right-3 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110"
            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 4px 14px rgba(99, 102, 241, 0.4)' }}
          >
            <Plus className="w-5 h-5 text-white" />
          </div>
        )}
      </div>
      <h3 className="font-bold truncate" style={{ color: '#111827', fontSize: '14px', marginBottom: '4px' }}>{product.name}</h3>
      <p className="text-xs" style={{ color: '#9ca3af', marginBottom: '10px' }}>{product.category}</p>
      <div className="flex items-center justify-between">
        <span className="font-bold" style={{ color: '#6366f1', fontSize: '16px' }}>
          ${product.price.toFixed(2)}
        </span>
        <span 
          className="text-xs font-medium rounded-full"
          style={{
            padding: '4px 8px',
            ...(product.stock > 20 
              ? { backgroundColor: '#dcfce7', color: '#15803d' }
              : product.stock > 0 
              ? { backgroundColor: '#fef3c7', color: '#b45309' }
              : { backgroundColor: '#fee2e2', color: '#dc2626' })
          }}
        >
          {product.stock > 0 ? `${product.stock}` : 'Out'}
        </span>
      </div>
    </div>
  );
}
