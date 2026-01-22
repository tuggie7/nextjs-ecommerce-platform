'use client';

import Image from 'next/image';
import { memo } from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { useTranslations } from 'next-intl';
import { useAppDispatch } from '@/lib/redux/hooks';
import { addToCart } from '@/lib/redux/cartSlice';
import { usePathname } from 'next/navigation';

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const t = useTranslations('Products');
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const locale = pathname.split('/')[1];

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(addToCart(product));
  };

  return (
    <Link href={`/${locale}/products/${product.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
        <div className="relative h-64 bg-gray-100">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-4"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        
        <div className="p-4 flex flex-col flex-grow">
          <span className="text-xs text-gray-500 uppercase mb-2">{product.category}</span>
          <h3 className="text-lg font-semibold mb-2 line-clamp-2 flex-grow">{product.title}</h3>
          
          <div className="flex items-center mb-2">
            <span className="text-yellow-400">★</span>
            <span className="ml-1 text-sm text-gray-600">
              {product.rating.rate} ({product.rating.count})
            </span>
          </div>
          
          <div className="flex items-center justify-between mt-auto">
            <span className="text-2xl font-bold text-blue-600">${product.price}</span>
            <button
              onClick={handleAddToCart}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm"
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
