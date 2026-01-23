'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/lib/redux/hooks';

export default function Header() {
  const t = useTranslations('Common');
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartItems = useAppSelector((state) => state.cart.items);
  const locale = pathname.split('/')[1];

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Close menu on Esc key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    
    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);
  
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const toggleLocale = () => {
    const newLocale = locale === 'tr' ? 'en' : 'tr';
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    return newPath;
  };

  const links = [
    {
      href: `/${locale}`,
      label: t('home'),
      active: pathname === `/${locale}`,
    },
    {
      href: `/${locale}/products`,
      label: t('products'),
      active: pathname.startsWith(`/${locale}/products`),
    },
  ];

  return (
    <>
      {/* Skip to main content link for screen readers */}
      <a 
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-cyan-500 focus:text-white focus:rounded focus:outline-none focus:ring-2 focus:ring-cyan-300"
      >
        Skip to main content
      </a>
      
      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0b1021] shadow-lg shadow-black/30" role="banner">
      <div className="container mx-auto px-4 relative">
        <div className="flex items-center justify-between h-16">
          <Link
            href={`/${locale}`}
            className="flex items-center gap-2 text-2xl font-semibold text-white tracking-tight"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400/30 to-indigo-500/20 border border-white/10 shadow-inner shadow-cyan-500/20">
              SH
            </span>
            <span className="hidden sm:inline">ShopHub</span>
          </Link>

          <nav className="hidden md:flex items-center gap-2" aria-label="Primary">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative px-4 py-2 text-sm font-medium text-gray-200/90 rounded-full border border-transparent hover:border-white/10"
                aria-current={link.active ? 'page' : undefined}
              >
                <span className="relative z-10">{link.label}</span>
                <span
                  className={`absolute inset-0 rounded-full bg-white/5 blur-sm transition-opacity duration-200 ${
                    link.active ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'
                  }`}
                  aria-hidden
                />
                {link.active && (
                  <span className="absolute -bottom-[11px] left-1/2 h-[2px] w-12 -translate-x-1/2 bg-gradient-to-r from-cyan-400 to-indigo-500" aria-hidden />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href={toggleLocale()}
              className="hidden md:inline-flex text-xs px-3 py-1.5 rounded-full border border-white/10 text-gray-200 hover:text-white hover:border-white/30 bg-white/5 backdrop-blur"
              aria-label="Change language"
            >
              {locale === 'tr' ? '🇬🇧 EN' : '🇹🇷 TR'}
            </Link>

            <Link href={`/${locale}/cart`} className="relative" aria-label={`Cart with ${cartItemCount} items`}>
              <div className="w-11 h-11 rounded-full glass flex items-center justify-center text-white card-hover border border-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
              </div>
              {cartItemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-xs rounded-full min-w-[20px] h-5 px-1 flex items-center justify-center shadow-lg shadow-red-500/40" aria-live="polite">
                  {cartItemCount}
                </span>
              )}
            </Link>

            <button
              type="button"
              className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-gray-200 hover:text-white hover:border-white/30 glass card-hover"
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <>
            <button
              type="button"
              className="fixed inset-0 bg-black/60 md:hidden"
              aria-label="Close navigation menu"
              onClick={() => setIsMenuOpen(false)}
            />
            <div className="md:hidden absolute right-4 top-16 w-[calc(100%-2rem)] max-w-sm" id="mobile-menu">
              <div className="bg-[#0b1021] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
                <nav className="flex flex-col" aria-label="Mobile primary">
                  {links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`px-4 py-3 text-sm font-medium transition ${
                        link.active ? 'text-white bg-white/5' : 'text-gray-100 hover:text-white hover:bg-white/5'
                      }`}
                      aria-current={link.active ? 'page' : undefined}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="flex items-center gap-2 px-4 py-3 border-t border-white/5 bg-white/2">
                  <Link
                    href={toggleLocale()}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-3 py-2 text-sm text-gray-100 hover:text-white hover:border-white/30"
                  >
                    {locale === 'tr' ? '🇬🇧 Switch to EN' : '🇹🇷 Türkçe'}
                  </Link>
                  <Link
                    href={`/${locale}/cart`}
                    className="inline-flex items-center justify-center rounded-full border border-white/10 px-3 py-2 text-sm text-gray-100 hover:text-white hover:border-white/30"
                    aria-label={`Cart with ${cartItemCount} items`}
                  >
                    <span className="relative flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                      </svg>
                      {cartItemCount > 0 && (
                        <span className="inline-flex min-w-[18px] h-[18px] items-center justify-center rounded-full bg-red-500 text-[11px] text-white px-1" aria-live="polite">
                          {cartItemCount}
                        </span>
                      )}
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
    </>
  );
}
