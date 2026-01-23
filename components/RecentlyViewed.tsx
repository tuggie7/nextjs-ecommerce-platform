'use client';

import { useEffect, useState } from 'react';
import { Product } from '@/types';
import ProductCard from '@/components/ProductCard';
import { useTranslations } from 'next-intl';

interface RecentlyViewedProps {
  currentProductId?: number;
}

const RECENTLY_VIEWED_KEY = 'recently_viewed_products';
const MAX_RECENTLY_VIEWED = 6;

export default function RecentlyViewed({ currentProductId }: RecentlyViewedProps) {
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  const t = useTranslations('ProductDetail');

  useEffect(() => {
    const storedProducts = localStorage.getItem(RECENTLY_VIEWED_KEY);
    if (storedProducts) {
      try {
        const products: Product[] = JSON.parse(storedProducts);
        // Filter out current product if viewing a product
        const filtered = currentProductId 
          ? products.filter(p => p.id !== currentProductId)
          : products;
        setRecentProducts(filtered.slice(0, MAX_RECENTLY_VIEWED));
      } catch (error) {
        console.error('Failed to parse recently viewed products:', error);
      }
    }
  }, [currentProductId]);

  if (recentProducts.length === 0) {
    return null;
  }

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold text-white mb-6">{t('recentlyViewed')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {recentProducts.map((product, index) => (
          <div 
            key={product.id}
            className="fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}

// Helper function to add a product to recently viewed
export function addToRecentlyViewed(product: Product) {
  try {
    const storedProducts = localStorage.getItem(RECENTLY_VIEWED_KEY);
    let products: Product[] = storedProducts ? JSON.parse(storedProducts) : [];
    
    // Remove product if it already exists
    products = products.filter(p => p.id !== product.id);
    
    // Add product to beginning
    products.unshift(product);
    
    // Keep only MAX_RECENTLY_VIEWED items
    products = products.slice(0, MAX_RECENTLY_VIEWED);
    
    localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(products));
  } catch (error) {
    console.error('Failed to save recently viewed product:', error);
  }
}
