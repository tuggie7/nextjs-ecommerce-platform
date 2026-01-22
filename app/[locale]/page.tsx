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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">{t('title')}</h1>
          <p className="text-xl mb-8">Your one-stop shop for everything</p>
          <Link 
            href={`/${locale}/products`}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-block"
          >
            {t('viewAllProducts')}
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">{t('featuredProducts')}</h2>
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
