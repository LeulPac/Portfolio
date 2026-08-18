import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaDownload, FaArrowRight, FaCode } from 'react-icons/fa';
import SecondaryNav from '../common/SecondaryNav';
import DeveloperBackground from './DeveloperBackground';
import { useAnalytics } from '../../context/AnalyticsContext';

const Hero = ({ settings = {} }) => {
  const { trackEvent } = useAnalytics();

  const handleResumeClick = () => {
    trackEvent('resume_download', 'Hero Resume Button');
    if (settings.resumeUrl) {
      window.open(settings.resumeUrl, '_blank');
    }
  };

  const avatarSrc = settings.avatarUrl || '/profile-transparent.png';

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden bg-slate-950 text-slate-100">

      {/* Scrolling Tech Code Animation */}
      <DeveloperBackground />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col items-center justify-center text-center">
        
        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold tracking-wide shadow-glow mb-6 backdrop-blur-md"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          Full Stack Software Developer & Computer Science Student (3.75 GPA)
        </motion.div>

        {/* Central Full-Space Portrait Frame (Background Vignette/Cutout effect) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="relative w-full max-w-3xl flex justify-center items-center my-4 group"
        >
          {/* Outer Ambient Aura Glow */}
          <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 blur-3xl opacity-20 group-hover:opacity-35 transition duration-700" />

          {/* Transparent portrait — no bg, no clipping, full subject visible */}
          <div className="relative flex flex-col items-center w-full">
            <div className="relative flex justify-center items-end w-full">
              <img
                src={avatarSrc}
                alt="Leul Mengesha - Full Stack Developer"
                loading="eager"
                className="w-[420px] sm:w-[520px] md:w-[600px] max-w-full object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-[1.03]"
              />

              {/* Desktop / tablet overlay badges — original positions */}
              <div className="hidden sm:flex absolute top-6 left-4 sm:left-8 items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 backdrop-blur-md text-xs font-mono text-cyan-400 border border-cyan-500/40 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Full Stack Developer</span>
              </div>

              <div className="hidden sm:flex absolute top-6 right-4 sm:right-8 items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 backdrop-blur-md text-xs font-mono text-indigo-300 border border-indigo-500/40 shadow-lg">
                <FaCode className="text-cyan-400" />
                <span>Mekele Univ. CS '26</span>
              </div>
            </div>

            {/* Mobile badges: stacked below the portrait so they never overlap the face */}
            <div className="sm:hidden mt-5 w-full flex flex-col items-center gap-2.5 px-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 backdrop-blur-md text-[11px] font-mono text-cyan-400 border border-cyan-500/40 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Full Stack Developer</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 backdrop-blur-md text-[11px] font-mono text-indigo-300 border border-indigo-500/40 shadow-lg">
                <FaCode className="text-cyan-400" />
                <span>Mekele Univ. CS '26</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Hero Bottom Interactive Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-6 z-20"
        >
          <Link
            to="/projects"
            className="px-7 py-3.5 text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-cyan-500 to-indigo-500 hover:from-cyan-300 hover:to-indigo-400 rounded-xl shadow-glow transition-all flex items-center gap-2 transform hover:-translate-y-0.5"
          >
            <span>Explore Projects</span>
            <FaArrowRight className="w-4 h-4" />
          </Link>

          <button
            onClick={handleResumeClick}
            className="px-7 py-3.5 text-sm font-semibold text-slate-100 bg-slate-900/80 border border-slate-700 hover:border-cyan-400 hover:text-cyan-400 rounded-xl backdrop-blur-md transition-all flex items-center gap-2"
          >
            <FaDownload className="w-4 h-4 text-cyan-400" />
            <span>Download Resume</span>
          </button>

          <div className="flex items-center gap-3 pl-2">
            <a
              href={settings.github || 'https://github.com/leulmengesha'}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 text-slate-300 hover:text-cyan-400 bg-slate-900/80 border border-slate-800 rounded-xl backdrop-blur-md transition-colors"
              aria-label="GitHub Profile"
            >
              <FaGithub className="w-5 h-5" />
            </a>
            <a
              href={settings.linkedin || 'https://linkedin.com/in/leulmengesha'}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 text-slate-300 hover:text-cyan-400 bg-slate-900/80 border border-slate-800 rounded-xl backdrop-blur-md transition-colors"
              aria-label="LinkedIn Profile"
            >
              <FaLinkedin className="w-5 h-5" />
            </a>
          </div>
        </motion.div>

        {/* Quick Stats Pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex items-center gap-8 px-6 py-3 rounded-2xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-md mt-8 font-mono text-xs text-slate-400"
        >
          <div><span className="text-cyan-400 font-bold text-sm">15+</span> Projects</div>
          <div className="w-px h-4 bg-slate-800" />
          <div><span className="text-indigo-400 font-bold text-sm">3.75</span> CS GPA</div>
          <div className="w-px h-4 bg-slate-800" />
          <div><span className="text-emerald-400 font-bold text-sm">React & Node.js</span></div>
        </motion.div>

        <SecondaryNav />

      </div>
    </section>
  );
};

export default Hero;
