import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaEnvelope, FaChevronUp } from 'react-icons/fa';

const Footer = ({ settings = {} }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 pt-16 pb-12 relative overflow-hidden transition-colors duration-300">
      {/* Glow Ambient Effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-200 dark:border-slate-900">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-slate-950 font-black text-lg">
                LM
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Leul<span className="text-cyan-500 dark:text-cyan-400">.Mengesha</span>
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
              {settings.bio || 'Computer Science student at Mekele University and full-stack software developer focused on building high-performance web applications, distributed cloud systems, and user-centric software.'}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={settings.github || 'https://github.com/leulmengesha'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 hover:border-cyan-500/50 transition-all"
                aria-label="GitHub Profile"
              >
                <FaGithub className="w-5 h-5" />
              </a>
              <a
                href={settings.linkedin || 'https://linkedin.com/in/leulmengesha'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 hover:border-cyan-500/50 transition-all"
                aria-label="LinkedIn Profile"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${settings.email || 'leul.mengesha.dev@gmail.com'}`}
                className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 hover:border-cyan-500/50 transition-all"
                aria-label="Send Email"
              >
                <FaEnvelope className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-200 uppercase tracking-wider mb-4">Navigation</h4>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li><Link to="/" className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">Home</Link></li>
              <li><Link to="/projects" className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">Projects</Link></li>
              <li><Link to="/education" className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">Education</Link></li>
              <li><Link to="/contact" className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-200 uppercase tracking-wider mb-4">Contact Info</h4>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li><span className="text-slate-500">Location:</span> {settings.location || 'Mekele, Ethiopia'}</li>
              <li><span className="text-slate-500">Email:</span> {settings.email || 'leul.mengesha.dev@gmail.com'}</li>
              <li><span className="text-slate-500">Role:</span> Full Stack Developer</li>
              <li className="pt-2">
                <Link
                  to="/contact"
                  className="inline-block text-xs font-semibold text-cyan-500 dark:text-cyan-400 hover:underline"
                >
                  Send a Direct Message &rarr;
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & Scroll to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} Leul Mengesha. All rights reserved.</p>
          
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-xl glass-card text-slate-600 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
          >
            <span>Back to Top</span>
            <FaChevronUp className="w-3 h-3" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

