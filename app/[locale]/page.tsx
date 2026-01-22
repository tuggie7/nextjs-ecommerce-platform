import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { getProducts } from '@/lib/api';
import ProductCard from '@/components/ProductCard';

export default async function Home({ 
  params: { locale } 
}: { 
  params: { locale: string } 
}) {
  const t = await getTranslations('HomePage');
  const products = await getProducts();
  const featuredProducts = products.slice(0, 4); // First 4 products

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-800/50 via-transparent to-cyan-500/20 animate-hero-bg" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl space-y-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full badge text-sm">Premium selection • Fast delivery</span>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight text-white">
              {t('title')}
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl">
              Your one-stop shop for everything. Curated products, global brands, instant checkout.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link 
                href={`/${locale}/products`}
                className="btn-primary px-7 py-3 rounded-lg focus-ring"
              >
                {t('viewAllProducts')}
              </Link>
              <span className="text-sm text-gray-300">ISR cached • SEO ready • Blazing fast</span>
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
    </div>
  );
}

export const revalidate = 3600;
