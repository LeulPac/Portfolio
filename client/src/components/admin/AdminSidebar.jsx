import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaChartPie,
  FaFolderOpen,
  FaCode,
  FaBriefcase,
  FaGraduationCap,
  FaCertificate,
  FaTools,
  FaEnvelope,
  FaChartLine,
  FaCog,
  FaSignOutAlt,
  FaGlobe,
  FaTimes,
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useAdminLayout } from '../../context/AdminLayoutContext';

const navItems = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: <FaChartPie /> },
  { name: 'Projects', path: '/admin/projects', icon: <FaFolderOpen /> },
  { name: 'Skills', path: '/admin/skills', icon: <FaCode /> },
  { name: 'Experience', path: '/admin/experience', icon: <FaBriefcase /> },
  { name: 'Education', path: '/admin/education', icon: <FaGraduationCap /> },
  { name: 'Certificates', path: '/admin/certificates', icon: <FaCertificate /> },
  { name: 'Services', path: '/admin/services', icon: <FaTools /> },
  { name: 'Messages', path: '/admin/messages', icon: <FaEnvelope />, badgeKey: 'unreadMessages' },
  { name: 'Analytics', path: '/admin/analytics', icon: <FaChartLine /> },
  { name: 'Settings', path: '/admin/settings', icon: <FaCog /> },
];

const SidebarContent = ({ unreadCount, onNavigate, showClose = false, onClose }) => {
  const { logout } = useAuth();

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2 py-3 border-b border-slate-900">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-slate-950 font-black text-lg shadow-glow">
              LM
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-100">Leul Mengesha</h2>
              <span className="text-[11px] font-mono text-cyan-400">Admin Control Portal</span>
            </div>
          </div>
          {showClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-900 transition-colors"
              aria-label="Close navigation menu"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          )}
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={onNavigate}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-glow font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <span className="text-sm">{item.icon}</span>
                <span>{item.name}</span>
              </div>

              {item.badgeKey && unreadCount > 0 && (
                <span className="px-2 py-0.5 text-[10px] font-mono font-bold text-slate-950 bg-cyan-400 rounded-full animate-pulse">
                  {unreadCount}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="space-y-2 pt-4 border-t border-slate-900">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          onClick={onNavigate}
          className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-cyan-400 hover:bg-slate-900/60 transition-all"
        >
          <FaGlobe className="text-sm" />
          <span>View Public Site</span>
        </a>

        <button
          onClick={() => {
            onNavigate?.();
            logout();
          }}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition-all"
        >
          <FaSignOutAlt className="text-sm" />
          <span>Logout</span>
        </button>
      </div>
    </>
  );
};

const AdminSidebar = ({ unreadCount = 0 }) => {
  const { mobileOpen, closeMobile } = useAdminLayout();

  const handleNavigate = () => closeMobile();

  return (
    <>
      <aside className="hidden md:flex w-64 shrink-0 bg-slate-950 border-r border-slate-900 flex-col justify-between h-screen sticky top-0 z-40 p-4">
        <SidebarContent unreadCount={unreadCount} />
      </aside>

      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-[100] md:hidden">
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobile}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              aria-label="Close navigation menu"
            />

            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="absolute top-0 left-0 bottom-0 w-[85vw] max-w-[320px] bg-slate-950/95 backdrop-blur-xl border-r border-slate-800 rounded-r-3xl shadow-2xl p-4 flex flex-col justify-between overflow-y-auto"
            >
              <SidebarContent
                unreadCount={unreadCount}
                onNavigate={handleNavigate}
                showClose
                onClose={closeMobile}
              />
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminSidebar;
