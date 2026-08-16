import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaServer, FaDatabase, FaCheckCircle } from 'react-icons/fa';

const iconMap = {
  code: <FaCode className="w-6 h-6 text-cyan-400" />,
  server: <FaServer className="w-6 h-6 text-indigo-400" />,
  database: <FaDatabase className="w-6 h-6 text-emerald-400" />
};

const Services = ({ services = [] }) => {
  return (
    <section id="services" className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-widest">
            Specialized Offerings
          </p>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-100 mt-2">
            Engineering <span className="gradient-text">Services</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-indigo-500 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card rounded-3xl p-8 hover:border-cyan-500/50 transition-all flex flex-col justify-between group transform hover:-translate-y-1.5"
            >
              <div className="space-y-6">
                <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:border-cyan-500/40 transition-colors">
                  {iconMap[service.icon] || <FaCode className="w-6 h-6 text-cyan-400" />}
                </div>

                <h3 className="text-xl font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">
                  {service.title}
                </h3>

                <p className="text-sm text-slate-400 leading-relaxed">
                  {service.description}
                </p>

                {/* Features Checkmarks */}
                <ul className="space-y-2.5 pt-2">
                  {(service.features || []).map((feat, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-xs text-slate-300">
                      <FaCheckCircle className="text-cyan-400 shrink-0 w-3.5 h-3.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8 border-t border-slate-800/60 mt-6">
                <a
                  href="#contact"
                  className="text-xs font-bold text-cyan-400 group-hover:text-cyan-300 flex items-center gap-1"
                >
                  Request Consultation &rarr;
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;
