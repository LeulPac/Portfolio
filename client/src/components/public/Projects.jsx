import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaFilter } from 'react-icons/fa';
import ProjectCard from './ProjectCard';
import SkeletonLoader from '../common/SkeletonLoader';
import api from '../../api/axios';

const Projects = ({ projects = [], loading = false }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTech, setSelectedTech] = useState('All');

  // Extract unique categories & technologies
  const categories = ['All', ...new Set(projects.map(p => p.category))];

  // Filter projects dynamically
  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesTech = selectedTech === 'All' || (project.technologies || []).includes(selectedTech);
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (project.technologies || []).some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesCategory && matchesTech && matchesSearch;
  });

  const handleTrackClick = (projectId, target) => {
    api.post(`/projects/${projectId}/click`, { target }).catch(() => {});
  };

  return (
    <section id="projects" className="py-24 bg-slate-100/50 dark:bg-slate-950/80 relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-xs font-mono font-semibold text-cyan-600 dark:text-cyan-400 uppercase tracking-widest">
            Crafted Systems & Engineering
          </p>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100 mt-2">
            Showcase <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-indigo-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Search & Filter Controls */}
        <div className="glass-card rounded-2xl p-4 mb-12 flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search projects or technologies..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-glow'
                    : 'bg-slate-100 dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border border-slate-200 dark:border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* Projects Grid */}
        {loading ? (
          <SkeletonLoader type="card" count={6} />
        ) : filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onTrackClick={handleTrackClick}
              />
            ))}
          </div>
        ) : (
          <div className="glass-card rounded-2xl p-12 text-center max-w-md mx-auto my-12 space-y-4">
            <FaFilter className="w-10 h-10 text-slate-400 dark:text-slate-600 mx-auto" />
            <h4 className="text-lg font-bold text-slate-900 dark:text-slate-200">No Projects Found</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              No software projects matched your search criteria. Try clearing search filters.
            </p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedCategory('All'); setSelectedTech('All'); }}
              className="px-4 py-2 text-xs font-semibold text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 rounded-xl border border-cyan-500/30"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

export default Projects;

