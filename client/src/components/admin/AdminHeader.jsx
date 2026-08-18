import React from 'react';
import { FaUserCircle, FaExternalLinkAlt, FaBars } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useAdminLayout } from '../../context/AdminLayoutContext';

const AdminHeader = ({ title = 'Dashboard' }) => {
  const { user } = useAuth();
  const { toggleMobile } = useAdminLayout();

  return (
    <header className="bg-slate-950/80 backdrop-blur-md border-b border-slate-900 sticky top-0 z-30">
      <div className="md:hidden px-4 py-3 flex items-center justify-between gap-3 border-b border-slate-900/80">
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={toggleMobile}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-cyan-400 transition-colors shrink-0"
            aria-label="Open navigation menu"
          >
            <FaBars className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-slate-950 font-black text-sm shadow-glow shrink-0">
              LM
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-100 truncate">Leul Mengesha</p>
              <p className="text-[10px] font-mono text-cyan-400 truncate">Admin Control Portal</p>
            </div>
          </div>
        </div>

        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shrink-0"
          aria-label="View live site"
        >
          <FaExternalLinkAlt className="w-3.5 h-3.5" />
        </a>
      </div>

      <div className="px-4 md:px-6 py-3 md:py-4 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-lg md:text-xl font-bold text-slate-100 truncate">{title}</h1>
          <p className="text-[11px] md:text-xs text-slate-400 font-mono truncate">
            System Admin Dashboard & Context Management
          </p>
        </div>

        <div className="hidden md:flex items-center gap-4 shrink-0">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-cyan-400 bg-cyan-500/10 rounded-lg border border-cyan-500/30"
          >
            <span>Live Site</span>
            <FaExternalLinkAlt className="w-3 h-3" />
          </a>

          <div className="flex items-center gap-3 pl-2 border-l border-slate-800">
            <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 font-bold">
              <FaUserCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-200">{user?.name || 'Leul Mengesha'}</p>
              <p className="text-[10px] text-slate-400 font-mono">{user?.email || 'admin@leulmengesha.com'}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
