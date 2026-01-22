'use client';

import Image from 'next/image';
import { memo } from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { useTranslations } from 'next-intl';
import { useAppDispatch } from '@/lib/redux/hooks';
import { addToCart } from '@/lib/redux/cartSlice';
import { usePathname } from 'next/navigation';
import { useToast } from '@/components/ToastProvider';

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const t = useTranslations('Products');
  const tc = useTranslations('Common');
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const locale = pathname.split('/')[1];
  const { show } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(addToCart(product));
    show(tc('addedToCart'));
  };

  return (
    <Link href={`/${locale}/products/${product.id}`}>
      <div className="glass rounded-2xl overflow-hidden card-hover h-full flex flex-col border border-white/5">
        <div className="relative h-64 bg-gradient-to-br from-white/5 via-white/2 to-transparent">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-6 drop-shadow-xl"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        
        <div className="p-5 flex flex-col flex-grow">
          <span className="text-xs text-cyan-200 uppercase mb-2 tracking-widest">{product.category}</span>
          <h3 className="text-lg font-semibold mb-3 line-clamp-2 flex-grow text-white">{product.title}</h3>
          
          <div className="flex items-center mb-3 text-sm text-gray-200 space-x-2">
            <span className="text-yellow-300">★</span>
            <span>
              {product.rating.rate} ({product.rating.count})
            </span>
          </div>
          
          <div className="flex items-center justify-between mt-auto">
            <span className="text-2xl font-bold text-cyan-300">${product.price}</span>
            <button
              onClick={handleAddToCart}
              className="btn-primary px-4 py-2 rounded-lg text-sm focus-ring"
              aria-label={t('addToCart')}
            >
              {t('addToCart')}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default memo(ProductCard);
