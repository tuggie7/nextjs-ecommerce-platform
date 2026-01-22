'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="relative">
          <h1 className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-red-400 to-orange-500">
            Oops!
          </h1>
          <div className="absolute inset-0 blur-3xl opacity-30 bg-gradient-to-br from-red-400 to-orange-500" aria-hidden />
        </div>
        
        <h2 className="text-3xl font-bold text-white">Something went wrong</h2>
        <p className="text-lg text-gray-300">
          Don't worry, it's not your fault. We're working on fixing this.
        </p>
        
        {error.message && (
          <div className="glass rounded-lg p-4 border border-red-500/20 max-w-md mx-auto">
            <p className="text-sm text-red-300 font-mono break-words">{error.message}</p>
          </div>
        )}
        
        <div className="flex flex-wrap gap-4 justify-center pt-6">
          <button
            onClick={reset}
            className="btn-primary px-6 py-3 rounded-lg focus-ring"
          >
            Try again
          </button>
          <Link 
            href="/"
            className="btn-ghost px-6 py-3 rounded-lg focus-ring hover:bg-white/5"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
