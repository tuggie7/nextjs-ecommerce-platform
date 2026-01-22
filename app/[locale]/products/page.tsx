import { getTranslations } from 'next-intl/server';
import { getProducts, getCategories } from '@/lib/api';
import ProductsClient from '@/components/ProductsClient';

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'Products' });
  return {
    title: `${t('title')} | E-Commerce Platform`,
    description: t('title'),
  };
}

export const revalidate = 3600; // ISR: Revalidate every hour

export default async function ProductsPage() {
  const products = await getProducts();
  const categories = await getCategories();

  return <ProductsClient initialProducts={products} categories={categories} />;
}
