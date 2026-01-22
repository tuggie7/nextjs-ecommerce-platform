export default function LoadingProduct() {
  return (
    <div className="container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="glass rounded-2xl h-96 md:h-[560px] border border-white/5 skeleton" />
      <div className="space-y-4">
        <div className="h-4 w-24 rounded skeleton" />
        <div className="h-10 w-3/4 rounded skeleton" />
        <div className="h-6 w-32 rounded skeleton" />
        <div className="h-24 w-full rounded skeleton" />
        <div className="h-12 w-40 rounded skeleton" />
      </div>
    </div>
  );
}
