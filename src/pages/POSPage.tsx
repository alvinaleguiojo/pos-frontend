import { useState } from 'react';
import { categories } from '../data/sampleData';
import ProductCard from '../components/ProductCard';
import Cart from '../components/Cart';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addItem } from '../store/slices/cartSlice';
import { setSelectedCategory } from '../store/slices/productsSlice';
import { selectFilteredProducts, selectSelectedCategory, selectCartItemCount } from '../store/selectors';
import { ShoppingBag, ChevronLeft } from 'lucide-react';
import type { Product } from '../types';

export default function POSPage() {
  const dispatch = useAppDispatch();
  const [isCartExpanded, setIsCartExpanded] = useState(true);
  
  const filteredProducts = useAppSelector(selectFilteredProducts);
  const selectedCategory = useAppSelector(selectSelectedCategory);
  const cartItemCount = useAppSelector(selectCartItemCount);

  const handleCategoryChange = (category: string) => {
    dispatch(setSelectedCategory(category));
  };

  const handleAddToCart = (product: Product) => {
    dispatch(addItem(product));
  };

  const handleToggleDock = () => {
    setIsCartExpanded(!isCartExpanded);
  };

  return (
    <div className="flex h-full relative">
      {/* Products Section */}
      <div className="flex-1 overflow-y-auto" style={{ backgroundColor: '#f8fafc', padding: '24px 28px' }}>
        {/* Categories */}
        <div className="flex overflow-x-auto" style={{ gap: '12px', paddingBottom: '20px', marginBottom: '24px' }}>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.name)}
              className="rounded-xl whitespace-nowrap font-semibold transition-all duration-200"
              style={{
                padding: '12px 20px',
                ...(
                  selectedCategory === category.name 
                    ? { 
                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', 
                        color: 'white',
                        boxShadow: '0 4px 14px rgba(99, 102, 241, 0.35)',
                        border: 'none'
                      } 
                    : { 
                        backgroundColor: 'white', 
                        border: '1px solid #e5e7eb', 
                        color: '#4b5563',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                      }
                )
              }}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5" style={{ gap: '20px' }}>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <p style={{ color: '#6b7280', fontSize: '18px' }}>No products found</p>
          </div>
        )}
      </div>

      {/* Cart Sidebar - Slides in/out from right */}
      <div 
        style={{ 
          width: isCartExpanded ? '340px' : '0px',
          transition: 'width 0.3s ease-in-out',
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        <div style={{ width: '340px', height: '100%' }}>
          <Cart isDocked={true} onToggleDock={handleToggleDock} isExpanded={isCartExpanded} />
        </div>
      </div>

      {/* Collapsed Cart Tab (when collapsed) */}
      {!isCartExpanded && (
        <button
          onClick={handleToggleDock}
          className="absolute top-1/2 right-0 flex items-center justify-center"
          style={{
            transform: 'translateY(-50%)',
            width: '48px',
            height: '96px',
            backgroundColor: 'white',
            borderRadius: '12px 0 0 12px',
            boxShadow: '-4px 0 12px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb',
            borderRight: 'none',
          }}
        >
          <div className="flex flex-col items-center" style={{ gap: '8px' }}>
            <ChevronLeft style={{ width: '20px', height: '20px', color: '#6366f1' }} />
            <ShoppingBag style={{ width: '22px', height: '22px', color: '#6366f1' }} />
            {cartItemCount > 0 && (
              <span 
                className="rounded-full flex items-center justify-center font-bold"
                style={{
                  width: '22px',
                  height: '22px',
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  color: 'white',
                  fontSize: '11px',
                }}
              >
                {cartItemCount}
              </span>
            )}
          </div>
        </button>
      )}
    </div>
  );
}
