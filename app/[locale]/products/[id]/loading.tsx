export default function LoadingProduct() {
  return (
    <div className="container mx-auto px-4 py-10">
      {/* Back button skeleton */}
      <div className="h-4 w-32 rounded bg-white/10 mb-6 animate-pulse" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image skeleton */}
        <div className="relative h-96 md:h-[560px] glass rounded-2xl flex items-center justify-center border border-white/5 animate-pulse">
          <div className="w-48 h-48 bg-white/10 rounded-lg"></div>
        </div>

        {/* Details skeleton */}
        <div className="space-y-6 animate-pulse">
          {/* Category */}
          <div className="h-3 w-24 rounded bg-white/10" />
          
          {/* Title */}
          <div className="space-y-3">
            <div className="h-8 w-full rounded bg-white/10" />
            <div className="h-8 w-3/4 rounded bg-white/10" />
          </div>
          
          {/* Rating */}
          <div className="flex items-center gap-4">
            <div className="h-6 w-20 rounded bg-white/10" />
            <div className="h-4 w-32 rounded bg-white/10" />
          </div>

          {/* Price */}
          <div className="h-10 w-32 rounded bg-white/10" />

          {/* Description */}
          <div className="space-y-3">
            <div className="h-5 w-32 rounded bg-white/10" />
            <div className="space-y-2">
              <div className="h-4 w-full rounded bg-white/10" />
              <div className="h-4 w-full rounded bg-white/10" />
              <div className="h-4 w-5/6 rounded bg-white/10" />
            </div>
          </div>

          {/* Button */}
          <div className="h-12 w-48 rounded-lg bg-white/10" />
        </div>
      </div>
    </div>
  );
}
