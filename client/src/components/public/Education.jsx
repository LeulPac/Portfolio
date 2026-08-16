import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaAward, FaBookOpen } from 'react-icons/fa';

const Education = ({ education = [] }) => {
  const defaultEdu = [
    {
      institution: 'Mekele University',
      degree: 'B.S.',
      fieldOfStudy: 'Computer Science',
      startDate: '2022',
      endDate: '2026',
      gpa: '3.75',
      description: 'Focused on algorithms, full-stack software architecture, mobile systems development, and database engineering.',
      courses: ['Data Structures & Algorithms', 'Database Systems', 'Web Development', 'Mobile App Development (Kotlin)', 'Software Engineering']
    }
  ];

  const displayEdu = education && education.length > 0 ? education : defaultEdu;

  return (
    <section id="education" className="py-24 bg-slate-50 dark:bg-slate-950/60 relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-mono font-semibold text-cyan-600 dark:text-cyan-400 uppercase tracking-widest">
            Academic Background
          </p>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100 mt-2">
            Education & <span className="gradient-text">Coursework</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-indigo-500 mx-auto mt-4 rounded-full" />
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {displayEdu.map((edu, index) => (
            <motion.div
              key={edu.id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-3xl p-8 hover:border-cyan-500/40 transition-all space-y-6 relative overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400 text-2xl shadow-glow">
                    <FaGraduationCap />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{edu.institution}</h3>
                    <p className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">
                      {edu.degree} in {edu.fieldOfStudy}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-start sm:items-end gap-1">
                  <span className="text-xs font-mono text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-800">
                    {edu.startDate} - {edu.endDate}
                  </span>
                  {edu.gpa && (
                    <span className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-md border border-emerald-500/20">
                      <FaAward /> GPA: {edu.gpa}
                    </span>
                  )}
                </div>
              </div>

              {edu.description && (
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {edu.description}
                </p>
              )}

              {/* Coursework Pills */}
              {(edu.courses || []).length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <FaBookOpen className="text-cyan-500 dark:text-cyan-400" /> Key Computer Science Coursework:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {(edu.courses || []).map((course, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 text-xs font-mono text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/30 transition-colors"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Education;

