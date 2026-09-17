import React from 'react';

/**
 * Luxury branded PageLoader for React Suspense transitions
 */
export default function PageLoader() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 bg-surface-soft text-center animate-fade-in">
      <div className="relative mb-4">
        {/* Outer subtle ring */}
        <div className="w-14 h-14 rounded-2xl bg-clinic-50 border border-clinic-200 flex items-center justify-center animate-scale-pulse shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-clinic-700 text-white flex items-center justify-center font-serif font-bold text-xl shadow-md">
            É
          </div>
        </div>
      </div>
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-clinic-800">
        ÉLAN AESTHETIC
      </p>
      <p className="text-[11px] text-charcoal-400 mt-1 font-sans">
        Loading experience...
      </p>
    </div>
  );
}
