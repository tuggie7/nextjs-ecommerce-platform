'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useAppSelector } from '@/lib/redux/hooks';

export default function Header() {
  const t = useTranslations('Common');
  const pathname = usePathname();
  const cartItems = useAppSelector((state) => state.cart.items);
  const locale = pathname.split('/')[1];
  
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const toggleLocale = () => {
    const newLocale = locale === 'tr' ? 'en' : 'tr';
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    return newPath;
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0b1021]/70 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href={`/${locale}`} className="text-2xl font-semibold text-white tracking-tight">
            ShopHub
          </Link>

          <nav className="hidden md:flex items-center space-x-6" aria-label="Primary">
            <Link href={`/${locale}`} className="text-sm text-gray-300 hover:text-white transition">
              {t('home')}
            </Link>
            <Link href={`/${locale}/products`} className="text-sm text-gray-300 hover:text-white transition">
              {t('products')}
            </Link>
          </nav>

          <div className="flex items-center space-x-3">
            <Link href={toggleLocale()} className="text-xs px-3 py-1 rounded-full border border-white/10 text-gray-200 hover:text-white hover:border-white/30" aria-label="Change language">
              {locale === 'tr' ? '🇬🇧 EN' : '🇹🇷 TR'}
            </Link>
            
            <Link href={`/${locale}/cart`} className="relative" aria-label={`Cart with ${cartItemCount} items`}>
              <div className="w-10 h-10 rounded-full glass flex items-center justify-center text-white card-hover">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
              </div>
              {cartItemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-xs rounded-full min-w-[20px] h-5 px-1 flex items-center justify-center" aria-live="polite">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
