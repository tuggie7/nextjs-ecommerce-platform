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
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href={`/${locale}`} className="text-2xl font-bold text-blue-600">
            ShopHub
          </Link>

          <nav className="hidden md:flex space-x-8" aria-label="Primary">
            <Link href={`/${locale}`} className="text-gray-700 hover:text-blue-600 transition">
              {t('home')}
            </Link>
            <Link href={`/${locale}/products`} className="text-gray-700 hover:text-blue-600 transition">
              {t('products')}
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link href={toggleLocale()} className="text-sm text-gray-600 hover:text-blue-600" aria-label="Change language">
              {locale === 'tr' ? '🇬🇧 EN' : '🇹🇷 TR'}
            </Link>
            
            <Link href={`/${locale}/cart`} className="relative" aria-label={`Cart with ${cartItemCount} items`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-700 hover:text-blue-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center" aria-live="polite">
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
