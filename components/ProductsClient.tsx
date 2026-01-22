'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/types';
import ProductCard from '@/components/ProductCard';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

interface ProductsClientProps {
  initialProducts: Product[];
  categories: string[];
}

export default function ProductsClient({ initialProducts, categories }: ProductsClientProps) {
  const t = useTranslations('Products');
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('default');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Initialize state from URL
  useEffect(() => {
    const cat = searchParams.get('category');
    const sort = searchParams.get('sort');
    const min = searchParams.get('min');
    const max = searchParams.get('max');

    if (cat) setSelectedCategory(cat);
    if (sort) setSortBy(sort);
    if (min || max) {
      setPriceRange([
        min ? Number(min) : 0,
        max ? Number(max) : 1000,
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync filters to URL
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (selectedCategory && selectedCategory !== 'all') params.set('category', selectedCategory); else params.delete('category');
    if (sortBy && sortBy !== 'default') params.set('sort', sortBy); else params.delete('sort');
    params.set('min', String(priceRange[0]));
    params.set('max', String(priceRange[1]));
    router.replace(`${pathname}?${params.toString()}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, sortBy, priceRange]);

  useEffect(() => {
    let result = [...products];

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Filter by price range
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sort products
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(result);
  }, [selectedCategory, sortBy, priceRange, products, searchQuery]);

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <p className="text-sm text-gray-400 uppercase tracking-widest">{t('catalog')}</p>
          <h1 className="text-4xl font-bold text-white">{t('title')}</h1>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-2xl">
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0f172a] border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              aria-label="Clear search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="glass rounded-2xl p-6 mb-8 border border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {t('filterByCategory')}
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-[#0f172a] border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
            >
              <option value="all">{t('allCategories')}</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {t('sortBy')}
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-[#0f172a] border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
            >
              <option value="default">{t('defaultSort')}</option>
              <option value="price-asc">{t('priceAscending')}</option>
              <option value="price-desc">{t('priceDescending')}</option>
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {t('priceRange')}: {t('priceRangeValue', { min: priceRange[0], max: priceRange[1] })}
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="w-full accent-cyan-400"
                aria-label={t('maxPriceLabel')}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12 text-gray-300">
          <p className="text-lg">{t('empty')}</p>
        </div>
      )}
    </div>
  );
}
