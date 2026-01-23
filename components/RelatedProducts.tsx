'use client';

import { Product } from '@/types';
import ProductCard from '@/components/ProductCard';
import { useTranslations } from 'next-intl';

interface RelatedProductsProps {
  products: Product[];
  currentProduct: Product;
  maxItems?: number;
}

export default function RelatedProducts({ products, currentProduct, maxItems = 4 }: RelatedProductsProps) {
  const t = useTranslations('ProductDetail');
  
  // Get products from the same category (excluding current product)
  const relatedProducts = products
    .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
    .slice(0, maxItems);

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold text-white mb-6">{t('relatedProducts')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product, index) => (
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
