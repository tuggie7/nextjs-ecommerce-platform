import { Metadata } from 'next';
import { getProducts, getCategories } from '@/lib/api';
import ProductsClient from '@/components/ProductsClient';

export const metadata: Metadata = {
  title: 'Products | E-Commerce Platform',
  description: 'Browse our wide selection of products',
};

export const revalidate = 3600; // ISR: Revalidate every hour

export default async function ProductsPage() {
  const products = await getProducts();
  const categories = await getCategories();

  return <ProductsClient initialProducts={products} categories={categories} />;
}
