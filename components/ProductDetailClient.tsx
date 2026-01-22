'use client';

import { Product } from '@/types';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useAppDispatch } from '@/lib/redux/hooks';
import { addToCart } from '@/lib/redux/cartSlice';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const t = useTranslations('ProductDetail');
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const locale = pathname.split('/')[1];
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link 
        href={`/${locale}/products`}
        className="text-blue-600 hover:underline mb-6 inline-block"
      >
        ← {t('backToProducts')}
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="relative h-96 md:h-[600px] bg-gray-100 rounded-lg">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-8"
            priority
          />
        </div>

        {/* Product Details */}
        <div>
          <span className="text-sm text-gray-500 uppercase">{product.category}</span>
          <h1 className="text-4xl font-bold mt-2 mb-4">{product.title}</h1>
          
          <div className="flex items-center mb-6">
            <div className="flex items-center">
              <span className="text-yellow-400 text-2xl">★</span>
              <span className="ml-2 text-xl font-semibold">{product.rating.rate}</span>
            </div>
            <span className="ml-4 text-gray-600">({product.rating.count} reviews)</span>
          </div>

          <div className="text-4xl font-bold text-blue-600 mb-6">
            ${product.price}
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">{t('description')}</h2>
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>

          <button
            onClick={handleAddToCart}
            className={`w-full md:w-auto px-8 py-4 rounded-lg font-semibold text-lg transition ${
              added 
                ? 'bg-green-600 text-white' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {added ? '✓ Added to Cart' : t('addToCart')}
          </button>
        </div>
      </div>
    </div>
  );
}
