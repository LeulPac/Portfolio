import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaStar, FaEye } from 'react-icons/fa';

const ProjectCard = ({ project, onTrackClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-cyan-500/50 transition-all duration-300 transform hover:-translate-y-1.5 shadow-lg"
    >
      <div>
        {/* Banner Image Container */}
        <div className="relative w-full h-52 overflow-hidden bg-slate-200 dark:bg-slate-900">
          <img
            src={project.bannerUrl || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop'}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

          {/* Badges Overlay */}
          <div className="absolute top-3 left-3 flex gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md border border-slate-800 text-[11px] font-mono text-cyan-400 font-semibold">
              {project.category}
            </span>
            {project.featured && (
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/20 backdrop-blur-md border border-amber-500/40 text-[11px] font-semibold text-amber-400">
                <FaStar className="w-3 h-3" /> Featured
              </span>
            )}
          </div>

          <div className="absolute bottom-3 right-3 flex items-center gap-1 text-[11px] font-mono text-slate-300 bg-slate-950/80 backdrop-blur-md px-2 py-0.5 rounded-md border border-slate-800">
            <FaEye className="w-3 h-3 text-cyan-400" />
            <span>{project.viewsCount || 0}</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4">
          <Link to={`/projects/${project.slug}`}>
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors line-clamp-1">
              {project.title}
            </h3>
          </Link>

          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
            {project.shortDescription}
          </p>

          {/* Tech Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {(project.technologies || []).slice(0, 5).map((tech, idx) => (
              <span
                key={idx}
                className="px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-900 text-[11px] font-mono text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800"
              >
                {tech}
              </span>
            ))}
            {(project.technologies || []).length > 5 && (
              <span className="text-[11px] font-mono text-slate-500 self-center">
                +{(project.technologies || []).length - 5} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer Action Links */}
      <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-slate-200 dark:border-slate-800/60 mt-auto">
        <Link
          to={`/projects/${project.slug}`}
          className="text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
        >
          View Details &rarr;
        </Link>

        <div className="flex items-center gap-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onTrackClick && onTrackClick(project.id, 'github')}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors border border-slate-200 dark:border-slate-800"
              title="GitHub Code Repository"
            >
              <FaGithub className="w-4 h-4" />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onTrackClick && onTrackClick(project.id, 'live')}
              className="p-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 transition-colors border border-cyan-500/30"
              title="Live Demo Application"
            >
              <FaExternalLinkAlt className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;

