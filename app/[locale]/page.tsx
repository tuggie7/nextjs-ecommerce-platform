import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import Image from 'next/image';
import { getProducts } from '@/lib/api';
import ProductCard from '@/components/ProductCard';
import RecentlyViewedSection from '@/components/RecentlyViewedSection';

export default async function Home({ 
  params: { locale } 
}: { 
  params: { locale: string } 
}) {
  const t = await getTranslations('HomePage');
  const products = await getProducts();
  const featuredProducts = products.slice(0, 4); // First 4 products
  const spotlightProduct = featuredProducts[0] ?? products[0];
  const priceFormatter = new Intl.NumberFormat(locale, { style: 'currency', currency: 'USD' });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 opacity-80">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/60 via-transparent to-cyan-500/25 animate-hero-bg" />
          <div className="absolute -left-24 top-10 h-48 w-48 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="absolute -right-20 -bottom-10 h-64 w-64 rounded-full bg-purple-500/15 blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-200 shadow-inner shadow-cyan-500/10">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(74,222,128,0.8)]" aria-hidden />
                <span>{t('tagline')}</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight text-white text-balance">
                {t('title')}
              </h1>
              <p className="text-lg md:text-xl text-gray-200/90 max-w-2xl">
                {t('description')}
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link 
                  href={`/${locale}/products`}
                  className="btn-primary btn-sheen px-7 py-3 rounded-lg focus-ring"
                >
                  {t('viewAllProducts')}
                </Link>
                <Link
                  href={`/${locale}/products`}
                  className="btn-ghost px-6 py-3 rounded-lg text-sm focus-ring hover:bg-white/5"
                >
                  {t('explore')}
                </Link>
              </div>
              <div className="flex flex-wrap gap-3 text-sm text-gray-200/90">
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                  <span className="h-2 w-2 rounded-full bg-cyan-400" aria-hidden />
                  <span>{t('pillIsr')}</span>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                  <span className="h-2 w-2 rounded-full bg-purple-400" aria-hidden />
                  <span>{t('pillSeo')}</span>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden />
                  <span>{t('pillFast')}</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-6 rounded-[32px] bg-gradient-to-br from-cyan-400/10 via-white/5 to-purple-500/10 blur-2xl" aria-hidden />
              <div className="relative grid gap-4">
                <div className="floating-card rounded-3xl border border-white/10 bg-white/5 backdrop-blur shadow-2xl shadow-black/40 p-5 md:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-gray-400">{t('spotlight')}</p>
                      <p className="text-lg font-semibold text-white">{t('spotlightTitle')}</p>
                    </div>
                    <span className="rounded-full bg-emerald-500/15 text-emerald-300 text-xs px-3 py-1 border border-emerald-400/30">{t('stock')}</span>
                  </div>
                  <div className="relative h-56 rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-transparent overflow-hidden border border-white/10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(34,211,238,0.18),transparent_45%)]" aria-hidden />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(124,58,237,0.18),transparent_40%)]" aria-hidden />

                    {spotlightProduct ? (
                      <div className="grid grid-cols-2 h-full">
                        <div className="flex flex-col justify-center gap-2 px-4">
                          <p className="text-xs uppercase tracking-[0.18em] text-cyan-200">{t('preview')}</p>
                          <p className="text-lg font-semibold text-white line-clamp-2">{spotlightProduct.title}</p>
                          <p className="text-2xl font-bold text-cyan-300">{priceFormatter.format(spotlightProduct.price)}</p>
                          <div className="flex items-center gap-2 text-sm text-gray-200">
                            <span className="text-yellow-300">★</span>
                            <span>{spotlightProduct.rating.rate} ({spotlightProduct.rating.count})</span>
                          </div>
                          <Link
                            href={`/${locale}/products/${spotlightProduct.id}`}
                            className="inline-flex items-center gap-2 text-sm text-cyan-200 hover:text-cyan-100"
                          >
                            {t('preview')} →
                          </Link>
                        </div>
                        <div className="relative">
                          <Image
                            src={spotlightProduct.image}
                            alt={spotlightProduct.title}
                            fill
                            className="object-contain p-6 drop-shadow-2xl"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="absolute inset-6 rounded-xl border border-white/10 bg-black/20 flex items-center justify-center">
                        <span className="text-gray-200 text-sm">{t('preview')}</span>
                      </div>
                    )}
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-200">
                    <div className="flex items-center gap-3">
                      <span className="h-2 w-2 rounded-full bg-cyan-400" />
                      <span>{t('delivery')}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="h-2 w-2 rounded-full bg-purple-400" />
                      <span>{t('returns')}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 flex flex-col justify-between shadow-lg shadow-black/30">
                    <div className="text-sm text-gray-300">{t('satisfaction')}</div>
                    <div className="text-3xl font-bold text-white">4.9/5</div>
                    <div className="text-xs text-gray-400">{t('basedOn')}</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-500/15 via-white/5 to-purple-500/15 p-4 flex flex-col justify-between shadow-lg shadow-black/30">
                    <div className="text-sm text-gray-100">{t('liveStock')}</div>
                    <div className="text-3xl font-bold text-white">{t('ready')}</div>
                    <div className="text-xs text-gray-100/80">{t('realTime')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-sm text-gray-400 uppercase tracking-widest">Top picks</p>
            <h2 className="text-3xl font-bold text-white">{t('featuredProducts')}</h2>
          </div>
          <Link href={`/${locale}/products`} className="text-sm text-cyan-300 hover:text-cyan-200">
            {t('viewAllProducts')} →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Recently Viewed Products */}
      <section className="container mx-auto px-4 mb-16">
        <RecentlyViewedSection />
      </section>
    </div>
  );
}

export const revalidate = 3600;
