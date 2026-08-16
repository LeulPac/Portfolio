import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaCode, FaLaptopCode, FaMobileAlt } from 'react-icons/fa';

const About = ({ settings = {} }) => {
  const pillars = [
    {
      icon: <FaCode className="w-6 h-6 text-cyan-500 dark:text-cyan-400" />,
      title: 'Full-Stack Web Dev',
      description: 'Building responsive React & Next.js interfaces backed by Node.js, Express APIs & PostgreSQL databases.'
    },
    {
      icon: <FaMobileAlt className="w-6 h-6 text-purple-500 dark:text-purple-400" />,
      title: 'Mobile Development',
      description: 'Designing native Android applications using Kotlin & Android Studio with clean architecture.'
    },
    {
      icon: <FaLaptopCode className="w-6 h-6 text-indigo-500 dark:text-indigo-400" />,
      title: 'Database & ORM',
      description: 'Architecting scalable schemas using Prisma ORM with PostgreSQL hosted on Neon cloud.'
    },
    {
      icon: <FaGraduationCap className="w-6 h-6 text-emerald-500 dark:text-emerald-400" />,
      title: 'Academic Excellence',
      description: 'Computer Science student at Mekele University maintaining a 3.75 GPA.'
    }
  ];

  return (
    <section id="about" className="py-24 bg-slate-100/50 dark:bg-slate-950/60 relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono font-semibold text-cyan-600 dark:text-cyan-400 uppercase tracking-widest"
          >
            Get To Know Me
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100 mt-2"
          >
            About <span className="gradient-text">Leul Mengesha</span>
          </motion.h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-indigo-500 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Biography text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6 space-y-6 text-slate-600 dark:text-slate-300 leading-relaxed text-base sm:text-lg"
          >
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Computer Science Student & Full Stack Software Developer
            </h3>
            <p>
              I am currently pursuing my B.S. in Computer Science at Mekele University with a 3.75 GPA. My coding journey revolves around building high-throughput web applications, distributed backend services, mobile applications, and interactive software tools.
            </p>
            <p>
              Whether it’s designing REST APIs with Express & Prisma ORM, building modern UIs with React, Next.js & Tailwind CSS, or crafting mobile apps with Kotlin, I thrive at the intersection of performance, clean architecture, and intuitive user experience.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 font-mono text-sm">
              <div className="glass-card p-3.5 rounded-xl">
                <span className="text-slate-500 block text-xs">Degree:</span>
                <span className="text-cyan-600 dark:text-cyan-400 font-semibold">B.S. Computer Science</span>
              </div>
              <div className="glass-card p-3.5 rounded-xl">
                <span className="text-slate-500 block text-xs">Primary Tech:</span>
                <span className="text-indigo-600 dark:text-indigo-400 font-semibold">React, Next.js, Node, Kotlin</span>
              </div>
            </div>
          </motion.div>

          {/* Pillars Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {pillars.map((p, idx) => (
              <div
                key={idx}
                className="glass-card rounded-2xl p-6 hover:border-cyan-500/40 transition-all transform hover:-translate-y-1 space-y-3"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center border border-slate-200 dark:border-slate-800">
                  {p.icon}
                </div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100">{p.title}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{p.description}</p>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;

