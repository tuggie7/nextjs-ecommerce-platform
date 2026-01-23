export default function LoadingCart() {
  return (
    <div className="container mx-auto px-4 py-10">
      {/* Title */}
      <div className="h-8 w-48 rounded bg-white/10 mb-6 animate-pulse" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart items skeleton */}
        <div className="lg:col-span-2 space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center glass rounded-2xl p-4 border border-white/5 animate-pulse">
              <div className="w-24 h-24 bg-white/10 rounded mr-4"></div>
              <div className="flex-1 space-y-3">
                <div className="h-4 w-3/4 rounded bg-white/10"></div>
                <div className="h-3 w-24 rounded bg-white/10"></div>
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-12 rounded bg-white/10"></div>
                  <div className="h-8 w-16 rounded bg-white/10"></div>
                  <div className="h-8 w-12 rounded bg-white/10"></div>
                </div>
              </div>
              <div className="h-6 w-20 rounded bg-white/10"></div>
            </div>
          ))}
        </div>

        {/* Summary skeleton */}
        <div className="glass rounded-2xl p-6 h-fit border border-white/5 animate-pulse space-y-4">
          <div className="flex justify-between items-center">
            <div className="h-4 w-20 rounded bg-white/10"></div>
            <div className="h-6 w-24 rounded bg-white/10"></div>
          </div>
          <div className="h-12 w-full rounded-lg bg-white/10"></div>
          <div className="h-12 w-full rounded-lg bg-white/10"></div>
        </div>
      </div>
    </div>
  );
}
