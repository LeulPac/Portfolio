import React from 'react';

const SkeletonLoader = ({ type = 'card', count = 3 }) => {
  if (type === 'card') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="glass-card rounded-2xl p-4 space-y-4 animate-pulse">
            <div className="w-full h-48 bg-slate-800/60 rounded-xl" />
            <div className="h-6 bg-slate-800/80 rounded-md w-3/4" />
            <div className="space-y-2">
              <div className="h-4 bg-slate-800/50 rounded w-full" />
              <div className="h-4 bg-slate-800/50 rounded w-5/6" />
            </div>
            <div className="flex gap-2 pt-2">
              <div className="h-6 w-16 bg-slate-800/70 rounded-lg" />
              <div className="h-6 w-16 bg-slate-800/70 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'table') {
    return (
      <div className="space-y-3 animate-pulse">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="h-14 bg-slate-800/40 rounded-xl w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="h-32 bg-slate-800/50 rounded-2xl animate-pulse w-full" />
  );
};

export default SkeletonLoader;
