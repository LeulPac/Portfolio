import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaExclamationTriangle } from 'react-icons/fa';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
      <div className="glass-card rounded-3xl p-12 text-center max-w-md w-full space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 text-3xl mx-auto shadow-glow">
          <FaExclamationTriangle />
        </div>
        
        <h1 className="text-6xl font-extrabold font-mono text-cyan-400">404</h1>
        <h2 className="text-2xl font-bold text-slate-100">Page Not Found</h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          The page or resource you are searching for does not exist or has been moved.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-indigo-500 hover:from-cyan-300 hover:to-indigo-400 rounded-xl shadow-glow transition-all"
        >
          <FaHome /> Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
