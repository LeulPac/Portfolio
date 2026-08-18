import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiHome, HiCode, HiAcademicCap, HiMail, HiMenuAlt3, HiX } from 'react-icons/hi';
import { FaGithub, FaLinkedin, FaDownload } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { name: 'Home', href: '/', icon: HiHome, match: (path) => path === '/' },
  { name: 'Projects', href: '/projects', icon: HiCode, match: (path) => path === '/projects' || path.startsWith('/projects/') },
  { name: 'Education', href: '/education', icon: HiAcademicCap, match: (path) => path === '/education' },
  { name: 'Contact', href: '/contact', icon: HiMail, match: (path) => path === '/contact' },
];

const Navbar = ({ siteLogo = 'LM.', settings = {} }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleResumeClick = () => {
    if (settings.resumeUrl) window.open(settings.resumeUrl, '_blank');
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'glass-nav py-3 shadow-lg' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-slate-950 dark:text-slate-950 font-extrabold text-xl shadow-glow group-hover:scale-105 transition-transform">
              LM
            </div>
            <span className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors">
              Leul<span className="text-cyan-500 dark:text-cyan-400">.Mengesha</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full glass-card">
            {navLinks.map((link) => {
              const isActive = link.match(location.pathname);
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`relative px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 ${
                    isActive
                      ? 'text-cyan-600 dark:text-cyan-400'
                      : 'text-slate-600 dark:text-slate-300 hover:text-cyan-500 dark:hover:text-cyan-400'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute inset-0 bg-cyan-500/15 border border-cyan-500/30 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <ThemeToggle />
            <Link
              to="/contact"
              className="px-5 py-2.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-cyan-500 to-indigo-500 hover:from-cyan-300 hover:to-indigo-400 rounded-xl shadow-glow transition-all transform hover:-translate-y-0.5"
            >
              Get In Touch
            </Link>
          </div>

          <div className="flex lg:hidden items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-xl bg-slate-200/80 dark:bg-slate-800/80 text-slate-800 dark:text-slate-100 hover:text-cyan-500 dark:hover:text-cyan-400 focus:outline-none transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileOpen ? <HiX className="w-6 h-6" /> : <HiMenuAlt3 className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-[100] lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 240 }}
              className="absolute top-0 right-0 bottom-0 w-[85vw] max-w-[340px] bg-slate-900 text-slate-100 border-l border-slate-800 shadow-2xl p-6 flex flex-col justify-between overflow-y-auto"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-slate-950 font-extrabold text-sm">
                      LM
                    </div>
                    <span className="text-base font-bold text-slate-100">Navigation</span>
                  </div>
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
                  >
                    <HiX className="w-6 h-6" />
                  </button>
                </div>

                <div className="py-6 flex flex-col gap-2.5">
                  {navLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = link.match(location.pathname);
                    return (
                      <Link
                        key={link.name}
                        to={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-200 ${
                          isActive
                            ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-glow'
                            : 'text-slate-300 hover:bg-slate-800/80 hover:text-cyan-400'
                        }`}
                      >
                        <Icon className={`w-5 h-5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                        <span>{link.name}</span>
                        {isActive && (
                          <span className="ml-auto w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-glow" />
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-800 flex flex-col gap-4">
                <button
                  onClick={handleResumeClick}
                  className="w-full py-3.5 px-4 rounded-xl text-xs font-bold text-slate-200 bg-slate-800/90 border border-slate-700 hover:border-cyan-400 hover:text-cyan-400 flex items-center justify-center gap-2 transition-all"
                >
                  <FaDownload className="text-cyan-400" />
                  <span>Download Resume</span>
                </button>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-3">
                    <a
                      href={settings.github || 'https://github.com/leulmengesha'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-cyan-400 transition-colors"
                      aria-label="GitHub Profile"
                    >
                      <FaGithub className="w-4 h-4" />
                    </a>
                    <a
                      href={settings.linkedin || 'https://linkedin.com/in/leulmengesha'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-cyan-400 transition-colors"
                      aria-label="LinkedIn Profile"
                    >
                      <FaLinkedin className="w-4 h-4" />
                    </a>
                  </div>
                  <ThemeToggle />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
