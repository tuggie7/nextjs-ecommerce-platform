'use client';

import { useEffect, useMemo, useState } from 'react';
import { Product } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface SpotlightPreviewProps {
  products: Product[];
  locale: string;
  intervalMs?: number;
}

export default function SpotlightPreview({ products, locale, intervalMs = 5000 }: SpotlightPreviewProps) {
  const t = useTranslations('HomePage');
  const [index, setIndex] = useState(0);

  const spotlightProducts = useMemo(() => {
    if (!products || products.length === 0) return [];
    return products.slice(0, 4);
  }, [products]);

  useEffect(() => {
    if (spotlightProducts.length <= 1) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % spotlightProducts.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [spotlightProducts.length, intervalMs]);

  if (spotlightProducts.length === 0) {
    return (
      <div className="relative h-56 rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-transparent overflow-hidden border border-white/10 flex items-center justify-center text-gray-200">
        {t('preview')}
      </div>
    );
  }

  const product = spotlightProducts[index];
  const priceFormatter = new Intl.NumberFormat(locale, { style: 'currency', currency: 'USD' });

  return (
    <div className="relative h-56 rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-transparent overflow-hidden border border-white/10 isolate">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(34,211,238,0.18),transparent_45%)] pointer-events-none" aria-hidden />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(124,58,237,0.18),transparent_40%)] pointer-events-none" aria-hidden />

      <div className="grid grid-cols-2 h-full relative z-10">
        <div className="flex flex-col justify-center gap-2 px-4">
          <p className="text-xs uppercase tracking-[0.18em] text-cyan-200">{t('preview')}</p>
          <p className="text-lg font-semibold text-white line-clamp-2">{product.title}</p>
          <p className="text-2xl font-bold text-cyan-300">{priceFormatter.format(product.price)}</p>
          <div className="flex items-center gap-2 text-sm text-gray-200">
            <span className="text-yellow-300">★</span>
            <span>{product.rating.rate} ({product.rating.count})</span>
          </div>
          <Link
            href={`/${locale}/products/${product.id}`}
            className="inline-flex items-center gap-2 text-sm text-cyan-100 hover:text-white font-medium"
          >
            {t('preview')} →
          </Link>
        </div>
        <div className="relative">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-6 drop-shadow-2xl"
          />
        </div>
      </div>

      {spotlightProducts.length > 1 && (
        <div className="absolute bottom-3 right-4 flex items-center gap-2">
          {spotlightProducts.map((_, i) => (
            <button
              key={i}
              aria-label={`Spotlight ${i + 1}`}
              className={`h-2.5 w-6 rounded-full transition ${
                i === index ? 'bg-cyan-400' : 'bg-white/20 hover:bg-white/40'
              }`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
