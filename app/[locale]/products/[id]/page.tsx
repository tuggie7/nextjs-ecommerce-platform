import { Metadata } from 'next';
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
    
    return {
      title: `${product.title} | E-Commerce Platform`,
      description: product.description,
      openGraph: {
        title: product.title,
        description: product.description,
        images: [product.image],
      },
    };
  } catch {
    return {
      title: 'Product Not Found',
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
