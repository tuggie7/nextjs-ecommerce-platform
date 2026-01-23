export default function ProductCardSkeleton() {
  return (
    <div className="glass rounded-2xl overflow-hidden h-full flex flex-col border border-white/5 animate-pulse">
      {/* Image skeleton */}
      <div className="relative h-64 bg-gradient-to-br from-white/10 via-white/5 to-transparent">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 bg-white/10 rounded-lg"></div>
        </div>
      </div>
      
      {/* Content skeleton */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Category */}
        <div className="h-3 bg-white/10 rounded w-20 mb-3"></div>
        
        {/* Title */}
        <div className="space-y-2 mb-3">
          <div className="h-4 bg-white/10 rounded w-full"></div>
          <div className="h-4 bg-white/10 rounded w-3/4"></div>
        </div>
        
        {/* Rating */}
        <div className="h-3 bg-white/10 rounded w-24 mb-3"></div>
        
        <div className="mt-auto">
          {/* Price and button */}
          <div className="flex items-center justify-between">
            <div className="h-6 bg-white/10 rounded w-20"></div>
            <div className="h-10 bg-white/10 rounded w-24"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
