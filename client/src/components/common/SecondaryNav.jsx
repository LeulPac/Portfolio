import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiUser, HiSparkles, HiBriefcase, HiBadgeCheck, HiCog } from 'react-icons/hi';

const secondaryLinks = [
  { name: 'About', href: '/about', icon: HiUser },
  { name: 'Skills', href: '/skills', icon: HiSparkles },
  { name: 'Experience', href: '/experience', icon: HiBriefcase },
  { name: 'Certificates', href: '/certificates', icon: HiBadgeCheck },
  { name: 'Services', href: '/services', icon: HiCog },
];

const SecondaryNav = ({ className = '' }) => {
  const location = useLocation();

  return (
    <motion.nav
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      aria-label="Secondary navigation"
      className={`w-full max-w-3xl mx-auto mt-6 sm:mt-8 px-2 ${className}`}
    >
      <div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:justify-center gap-2.5 sm:gap-3">
        {secondaryLinks.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.href;
          const isLastOdd = link.name === 'Services';

          return (
            <Link
              key={link.name}
              to={link.href}
              className={`group relative inline-flex items-center justify-center gap-2 px-3.5 py-2.5 sm:px-4 sm:py-2.5 rounded-xl sm:rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 border backdrop-blur-md ${
                isLastOdd ? 'col-span-2 sm:col-span-1 max-w-[180px] sm:max-w-none mx-auto sm:mx-0' : ''
              } ${
                isActive
                  ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-400 shadow-glow'
                  : 'bg-slate-900/70 border-slate-700/80 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-slate-900/90 hover:shadow-glow'
              }`}
            >
              {isActive && (
                <span className="absolute inset-0 rounded-xl sm:rounded-full bg-cyan-500/10 border border-cyan-500/20 pointer-events-none" />
              )}
              <Icon
                className={`relative z-10 w-4 h-4 shrink-0 transition-colors duration-200 ${
                  isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-cyan-400'
                }`}
              />
              <span className="relative z-10">{link.name}</span>
              {isActive && (
                <span className="relative z-10 hidden sm:block w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-glow" />
              )}
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default SecondaryNav;
