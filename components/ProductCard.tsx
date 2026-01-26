'use client';

import Image from 'next/image';
import { memo, useState, useEffect } from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { useTranslations } from 'next-intl';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { addToCart } from '@/lib/redux/cartSlice';
import { toggleWishlist } from '@/lib/redux/wishlistSlice';
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
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsInWishlist(wishlistItems.some(item => item.id === product.id));
  }, [wishlistItems, product.id]);

  if (!mounted) {
    return (
      <Link href={`/${locale}/products/${product.id}`}>
        <div className="glass rounded-2xl overflow-hidden card-hover h-full flex flex-col border border-white/5 relative group">
          <button
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 backdrop-blur flex items-center justify-center hover:bg-black/80 transition focus-ring"
            aria-label="Wishlist"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
          </button>
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
              <span>{product.rating.rate} ({product.rating.count})</span>
            </div>
            <div className="flex items-center justify-between mt-auto">
              <span className="text-2xl font-bold text-cyan-300">${product.price}</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  const categoryMap: Record<string, string> = {
    "men's clothing": t('category.mensClothing'),
    "women's clothing": t('category.womensClothing'),
    "jewelery": t('category.jewelery'),
    "electronics": t('category.electronics'),
  };

  const localizedCategory = categoryMap[product.category] ?? product.category;
  const priceFormatter = new Intl.NumberFormat(locale, { style: 'currency', currency: 'USD' });

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(addToCart(product));
    show(tc('addedToCart'));
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(toggleWishlist(product));
    show(isInWishlist ? tc('removedFromWishlist') : tc('addedToWishlist'));
  };

  // Determine badge
  const getBadge = () => {
    if (product.rating.rate >= 4.5) {
      return { text: 'Popular', color: 'bg-gradient-to-r from-amber-500 to-orange-500' };
    }
    if (product.id <= 5) {
      return { text: 'New', color: 'bg-gradient-to-r from-cyan-500 to-blue-500' };
    }
    if (product.price < 50) {
      return { text: 'Best Price', color: 'bg-gradient-to-r from-green-500 to-emerald-500' };
    }
    return null;
  };

  const badge = getBadge();

  return (
    <Link href={`/${locale}/products/${product.id}`}>
      <div className="glass rounded-2xl overflow-hidden card-hover h-full flex flex-col border border-white/5 relative group">
        <button
          onClick={handleToggleWishlist}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 backdrop-blur flex items-center justify-center hover:bg-black/80 transition focus-ring"
          aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-5 h-5 ${isInWishlist ? 'text-red-400 fill-red-400' : 'text-white'}`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
          </svg>
        </button>
        <div className="relative h-64 bg-gradient-to-br from-white/5 via-white/2 to-transparent">
          {badge && (
            <div className={`absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg ${badge.color}`}>
              {badge.text}
            </div>
          )}
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-6 drop-shadow-xl"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        
        <div className="p-5 flex flex-col flex-grow">
          <span className="text-xs text-cyan-200 uppercase mb-2 tracking-widest">{localizedCategory}</span>
          <h3 className="text-lg font-semibold mb-3 line-clamp-2 flex-grow text-white">{product.title}</h3>
          
          <div className="flex items-center mb-3 text-sm text-gray-200 space-x-2">
            <span className="text-yellow-300">★</span>
            <span>
              {product.rating.rate} ({product.rating.count})
            </span>
          </div>
          
          <div className="flex items-center justify-between mt-auto">
            <span className="text-2xl font-bold text-cyan-300">{priceFormatter.format(product.price)}</span>
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
