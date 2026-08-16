import React from 'react';

const StatCard = ({ title, value, icon, change, color = 'cyan' }) => {
  const colorStyles = {
    cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    indigo: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/30'
  };

  return (
    <div className="glass-card rounded-2xl p-5 hover:border-cyan-500/40 transition-all space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">{title}</span>
        <div className={`w-10 h-10 rounded-xl border flex items-center justify-center text-lg ${colorStyles[color]}`}>
          {icon}
        </div>
      </div>

      <div className="flex items-baseline justify-between">
        <span className="text-3xl font-extrabold text-slate-100 font-mono">{value}</span>
        {change && (
          <span className="text-xs font-mono font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            {change}
          </span>
        )}
      </div>
    </div>
  );
};

export default StatCard;
