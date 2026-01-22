'use client';

import { Product } from '@/types';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useAppDispatch } from '@/lib/redux/hooks';
import { addToCart } from '@/lib/redux/cartSlice';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useToast } from '@/components/ToastProvider';
import { getProductDescription } from '@/lib/translations';

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const t = useTranslations('ProductDetail');
  const tc = useTranslations('Common');
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const locale = pathname.split('/')[1];
  const [added, setAdded] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const { show } = useToast();

  const categoryMap: Record<string, string> = {
    "men's clothing": t('category.mensClothing'),
    "women's clothing": t('category.womensClothing'),
    "jewelery": t('category.jewelery'),
    "electronics": t('category.electronics'),
  };

  const localizedCategory = categoryMap[product.category] ?? product.category;
  const priceFormatter = new Intl.NumberFormat(locale, { style: 'currency', currency: 'USD' });

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
    show(tc('addedToCart'));
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <Link 
        href={`/${locale}/products`}
        className="text-cyan-300 hover:text-cyan-200 mb-6 inline-block text-sm"
      >
        ← {t('backToProducts')}
      </Link>

      {/* Image Zoom Modal */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setIsZoomed(false)}
        >
          <button
            className="absolute top-4 right-4 text-white text-5xl hover:text-gray-300 focus:outline-none z-10"
            onClick={() => setIsZoomed(false)}
            aria-label="Close"
          >
            ×
          </button>
          <div className="relative w-full h-full max-w-6xl max-h-[90vh] flex items-center justify-center">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain drop-shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div 
          className="relative h-96 md:h-[560px] glass rounded-2xl flex items-center justify-center overflow-hidden group cursor-zoom-in"
          onClick={() => setIsZoomed(true)}
        >
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-10 drop-shadow-2xl transition-transform duration-300 group-hover:scale-110"
            priority
          />
          <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM10.5 7.5v6m3-3h-6" />
            </svg>
            <span>Click to zoom</span>
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <span className="text-sm text-cyan-200 uppercase tracking-widest">{localizedCategory}</span>
          <h1 className="text-4xl font-bold text-white leading-tight">{product.title}</h1>
          
          <div className="flex items-center text-gray-200">
            <div className="flex items-center">
              <span className="text-yellow-300 text-2xl">★</span>
              <span className="ml-2 text-xl font-semibold">{product.rating.rate}</span>
            </div>
            <span className="ml-4 text-sm">({product.rating.count} {t('reviews')})</span>
          </div>

          <div className="text-4xl font-bold text-cyan-300">
            {priceFormatter.format(product.price)}
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-white">{t('description')}</h2>
            <p className="text-gray-200 leading-relaxed">{getProductDescription(product.id, locale) || product.description}</p>
          </div>

          <button
            onClick={handleAddToCart}
            className={`w-full md:w-auto px-8 py-4 rounded-lg font-semibold text-lg transition ${
              added 
                ? 'bg-green-500 text-[#0b1021] focus-ring' 
                : 'btn-primary focus-ring'
            }`}
          >
            {added ? t('addedCheck') : t('addToCart')}
          </button>
        </div>
      </div>
    </div>
  );
}
