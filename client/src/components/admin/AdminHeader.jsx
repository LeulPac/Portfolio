import React from 'react';
import { FaUserCircle, FaBell, FaExternalLinkAlt } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const AdminHeader = ({ title = 'Dashboard' }) => {
  const { user } = useAuth();

  return (
    <header className="bg-slate-950/80 backdrop-blur-md border-b border-slate-900 sticky top-0 z-30 px-6 py-4 flex items-center justify-between">
      <div>
        <h1 className="text-xl font-bold text-slate-100">{title}</h1>
        <p className="text-xs text-slate-400 font-mono">System Admin Dashboard & Context Management</p>
      </div>

      <div className="flex items-center gap-4">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-cyan-400 bg-cyan-500/10 rounded-lg border border-cyan-500/30"
        >
          <span>Live Site</span>
          <FaExternalLinkAlt className="w-3 h-3" />
        </a>

        <div className="flex items-center gap-3 pl-2 border-l border-slate-800">
          <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 font-bold">
            <FaUserCircle className="w-5 h-5" />
          </div>
          <div className="hidden md:block">
            <p className="text-xs font-bold text-slate-200">{user?.name || 'Leul Mengesha'}</p>
            <p className="text-[10px] text-slate-400 font-mono">{user?.email || 'admin@leulmengesha.com'}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
