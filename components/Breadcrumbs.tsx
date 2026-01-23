'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

interface BreadcrumbItem {
  label: string;
  href: string;
}

export default function Breadcrumbs() {
  const pathname = usePathname();
  const t = useTranslations('Common');
  const segments = pathname.split('/').filter(Boolean);
  const locale = segments[0];

  const breadcrumbs: BreadcrumbItem[] = [
    { label: t('home'), href: `/${locale}` }
  ];

  // Build breadcrumb trail
  for (let i = 1; i < segments.length; i++) {
    const segment = segments[i];
    const href = `/${segments.slice(0, i + 1).join('/')}`;
    
    let label = segment;
    
    // Translate common segments
    if (segment === 'products') label = t('products');
    else if (segment === 'cart') label = t('cart');
    else if (segment === 'checkout') label = t('checkout');
    else if (!isNaN(Number(segment))) label = t('productDetail');
    else label = segment.charAt(0).toUpperCase() + segment.slice(1);

    breadcrumbs.push({ label, href });
  }

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center space-x-2 text-sm">
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          
          return (
            <li key={crumb.href} className="flex items-center">
              {index > 0 && (
                <svg className="w-4 h-4 mx-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              )}
              {isLast ? (
                <span className="text-cyan-300 font-medium" aria-current="page">
                  {crumb.label}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className="text-gray-300 hover:text-cyan-200 transition-colors"
                >
                  {crumb.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
