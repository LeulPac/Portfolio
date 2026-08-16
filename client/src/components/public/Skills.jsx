import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaServer, FaDatabase, FaMobileAlt, FaTools, FaLayerGroup } from 'react-icons/fa';

const categoryIcons = {
  All: <FaLayerGroup />,
  Frontend: <FaCode />,
  Backend: <FaServer />,
  Database: <FaDatabase />,
  Mobile: <FaMobileAlt />,
  Tools: <FaTools />
};

const defaultSkills = [
  { name: 'React', category: 'Frontend', percentage: 95 },
  { name: 'Next.js', category: 'Frontend', percentage: 90 },
  { name: 'Tailwind CSS', category: 'Frontend', percentage: 95 },
  { name: 'Node.js', category: 'Backend', percentage: 90 },
  { name: 'Express.js', category: 'Backend', percentage: 90 },
  { name: 'PostgreSQL (Neon)', category: 'Database', percentage: 88 },
  { name: 'Prisma ORM', category: 'Database', percentage: 90 },
  { name: 'Kotlin', category: 'Mobile', percentage: 85 },
  { name: 'Android Studio', category: 'Mobile', percentage: 85 },
  { name: 'Git & GitHub', category: 'Tools', percentage: 92 },
];

const Skills = ({ skills = [] }) => {
  const displaySkills = skills && skills.length > 0 ? skills : defaultSkills;
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', ...new Set(displaySkills.map(s => s.category))];

  const filteredSkills = activeCategory === 'All'
    ? displaySkills
    : displaySkills.filter(s => s.category === activeCategory);

  return (
    <section id="skills" className="py-24 bg-slate-50 dark:bg-slate-950 relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-xs font-mono font-semibold text-cyan-600 dark:text-cyan-400 uppercase tracking-widest">
            Capabilities & Stack
          </p>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100 mt-2">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-indigo-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 shadow-glow font-bold scale-105'
                  : 'glass-card text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:border-cyan-500/30'
              }`}
            >
              <span className="text-sm">{categoryIcons[cat] || <FaCode />}</span>
              <span>{cat}</span>
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.id || index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04 }}
              className="glass-card rounded-2xl p-5 hover:border-cyan-500/40 transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-cyan-500 dark:text-cyan-400 group-hover:border-cyan-500/40 transition-colors">
                    <FaCode className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors">
                      {skill.name}
                    </h4>
                    <span className="text-[11px] text-slate-500 font-mono">{skill.category}</span>
                  </div>
                </div>

                <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-md border border-cyan-500/20">
                  {skill.percentage}%
                </span>
              </div>

              {/* Animated Progress Bar */}
              <div className="w-full h-2 bg-slate-200 dark:bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-300 dark:border-slate-800">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.percentage}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full shadow-glow"
                />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;

