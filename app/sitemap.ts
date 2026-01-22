import type { MetadataRoute } from 'next';
import { getProducts } from '@/lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.SITE_URL || 'https://nextjs-ecommerce-platform.vercel.app';
  const products = await getProducts();

  const baseEntries: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/tr`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${siteUrl}/en`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${siteUrl}/tr/products`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${siteUrl}/en/products`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${siteUrl}/tr/cart`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.5 },
    { url: `${siteUrl}/en/cart`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.5 },
  ];

  const productEntries: MetadataRoute.Sitemap = products.flatMap((p) => [
    { url: `${siteUrl}/tr/products/${p.id}`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${siteUrl}/en/products/${p.id}`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
  ]);

  return [...baseEntries, ...productEntries];
}
