import { Metadata } from 'next';
import CartClient from '@/components/CartClient';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'Cart' });
  return {
    title: `${t('title')} | E-Commerce Platform`,
    description: t('title'),
  };
}

export default function CartPage() {
  return <CartClient />;
}
