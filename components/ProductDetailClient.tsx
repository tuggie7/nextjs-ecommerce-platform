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
  const { show } = useToast();

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="relative h-96 md:h-[560px] glass rounded-2xl flex items-center justify-center">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-10 drop-shadow-2xl"
            priority
          />
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <span className="text-sm text-cyan-200 uppercase tracking-widest">{product.category}</span>
          <h1 className="text-4xl font-bold text-white leading-tight">{product.title}</h1>
          
          <div className="flex items-center text-gray-200">
            <div className="flex items-center">
              <span className="text-yellow-300 text-2xl">★</span>
              <span className="ml-2 text-xl font-semibold">{product.rating.rate}</span>
            </div>
            <span className="ml-4 text-sm">({product.rating.count} {t('reviews')})</span>
          </div>

          <div className="text-4xl font-bold text-cyan-300">
            ${product.price}
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-white">{t('description')}</h2>
            <p className="text-gray-200 leading-relaxed">{product.description}</p>
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
