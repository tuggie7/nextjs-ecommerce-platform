import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function Home() {
  const t = useTranslations('HomePage');

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">{t('title')}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Featured products will be loaded here */}
          <p>{t('loading')}</p>
        </div>
        <div className="mt-8">
          <Link href="/products" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            {t('viewAllProducts')}
          </Link>
        </div>
      </main>
    </div>
  );
}
