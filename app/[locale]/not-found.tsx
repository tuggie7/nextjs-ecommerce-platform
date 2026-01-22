import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function NotFound() {
  const t = useTranslations('NotFound');
  
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="relative">
          <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-purple-500">
            404
          </h1>
          <div className="absolute inset-0 blur-3xl opacity-30 bg-gradient-to-br from-cyan-400 to-purple-500" aria-hidden />
        </div>
        
        <h2 className="text-3xl font-bold text-white">{t('title')}</h2>
        <p className="text-lg text-gray-300">{t('description')}</p>
        
        <div className="flex flex-wrap gap-4 justify-center pt-6">
          <Link 
            href="/"
            className="btn-primary px-6 py-3 rounded-lg focus-ring"
          >
            {t('backHome')}
          </Link>
          <Link 
            href="/products"
            className="btn-ghost px-6 py-3 rounded-lg focus-ring hover:bg-white/5"
          >
            {t('browseProducts')}
          </Link>
        </div>
      </div>
    </div>
  );
}
