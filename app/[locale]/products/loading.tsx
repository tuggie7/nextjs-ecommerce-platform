const skeletons = Array.from({ length: 8 }, (_, i) => i);

export default function LoadingProducts() {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-2">
          <div className="h-4 w-24 rounded skeleton" />
          <div className="h-8 w-48 rounded skeleton" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {skeletons.map((i) => (
          <div key={i} className="glass rounded-2xl p-4 h-80 border border-white/5 skeleton" />
        ))}
      </div>
    </div>
  );
}
