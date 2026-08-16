import React from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

const Experience = ({ experiences = [] }) => {
  return (
    <section id="experience" className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-widest">
            Career Journey
          </p>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-100 mt-2">
            Work & Leadership <span className="gradient-text">Experience</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-indigo-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Vertical Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-800 -translate-x-1/2" />

          <div className="space-y-12">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={exp.id || index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-slate-950 border-2 border-cyan-400 shadow-glow flex items-center justify-center text-cyan-400 z-10">
                    <FaBriefcase className="w-4 h-4" />
                  </div>

                  {/* Card Content */}
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${isEven ? 'md:pr-12' : 'md:pl-12'} w-full`}>
                    <div className="glass-card rounded-2xl p-6 hover:border-cyan-500/40 transition-all space-y-4">
                      
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                        <div>
                          <h3 className="text-lg font-bold text-slate-100">{exp.role}</h3>
                          <p className="text-sm font-semibold text-cyan-400">{exp.company}</p>
                        </div>
                        
                        <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                          <span className="flex items-center gap-1 bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
                            <FaCalendarAlt className="text-cyan-400" />
                            {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                          </span>
                          {exp.location && (
                            <span className="flex items-center gap-1">
                              <FaMapMarkerAlt /> {exp.location}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Bullet points */}
                      <ul className="space-y-2 text-xs text-slate-300 leading-relaxed list-disc list-inside">
                        {(exp.description || []).map((bullet, i) => (
                          <li key={i}>{bullet}</li>
                        ))}
                      </ul>

                      {/* Tech Used */}
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {(exp.technologies || []).map((tech, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded bg-slate-900 text-[10px] font-mono text-cyan-300 border border-slate-800"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Experience;
