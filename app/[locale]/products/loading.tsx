import ProductCardSkeleton from '@/components/ProductCardSkeleton';

const skeletons = Array.from({ length: 8 }, (_, i) => i);

export default function LoadingProducts() {
  return (
    <div className="container mx-auto px-4 py-10">
      {/* Header skeleton */}
      <div className="flex items-center justify-between mb-6 animate-pulse">
        <div className="space-y-2">
          <div className="h-4 w-24 rounded bg-white/10" />
          <div className="h-8 w-48 rounded bg-white/10" />
        </div>
      </div>

      {/* Filters skeleton */}
      <div className="mb-8 flex flex-wrap gap-4 animate-pulse">
        <div className="h-10 w-64 rounded-lg bg-white/10" />
        <div className="h-10 w-40 rounded-lg bg-white/10" />
        <div className="h-10 w-40 rounded-lg bg-white/10" />
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {skeletons.map((i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
