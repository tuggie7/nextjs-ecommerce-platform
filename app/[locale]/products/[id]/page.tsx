import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getProduct, getProducts } from '@/lib/api';
import ProductDetailClient from '@/components/ProductDetailClient';
import { notFound } from 'next/navigation';

interface Props {
  params: {
    id: string;
    locale: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const product = await getProduct(params.id);
    const t = await getTranslations({ locale: params.locale, namespace: 'Common' });
    
    return {
      title: `${product.title} | ${t('siteName')}`,
      description: product.description,
      openGraph: {
        title: product.title,
        description: product.description,
        images: [product.image],
      },
    };
  } catch {
    const t = await getTranslations({ locale: params.locale, namespace: 'ProductDetail' });
    return {
      title: t('notFoundTitle'),
    };
  }
}

export async function generateStaticParams() {
  const products = await getProducts();
  
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

export const revalidate = 3600; // ISR: Revalidate every hour

export default async function ProductDetailPage({ params }: Props) {
  try {
    const product = await getProduct(params.id);
    return <ProductDetailClient product={product} />;
  } catch {
    notFound();
  }
}
