import React from 'react';
import { NavLink } from 'react-router-dom';
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
  FaGlobe 
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

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
  { name: 'Settings', path: '/admin/settings', icon: <FaCog /> }
];

const AdminSidebar = ({ unreadCount = 0 }) => {
  const { logout } = useAuth();

  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-900 flex flex-col justify-between h-screen sticky top-0 z-40 p-4">
      
      <div className="space-y-6">
        {/* Admin Brand */}
        <div className="flex items-center gap-3 px-2 py-3 border-b border-slate-900">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-slate-950 font-black text-lg shadow-glow">
            LM
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-100">Leul Mengesha</h2>
            <span className="text-[11px] font-mono text-cyan-400">Admin Control Portal</span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
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

      {/* Footer Controls */}
      <div className="space-y-2 pt-4 border-t border-slate-900">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-cyan-400 hover:bg-slate-900/60 transition-all"
        >
          <FaGlobe className="text-sm" />
          <span>View Public Site</span>
        </a>

        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition-all"
        >
          <FaSignOutAlt className="text-sm" />
          <span>Logout</span>
        </button>
      </div>

    </aside>
  );
};

export default AdminSidebar;
