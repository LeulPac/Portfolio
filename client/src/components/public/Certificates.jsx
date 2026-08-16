import React from 'react';
import { motion } from 'framer-motion';
import { FaCertificate, FaExternalLinkAlt } from 'react-icons/fa';

const Certificates = ({ certificates = [] }) => {
  return (
    <section id="certificates" className="py-24 bg-slate-950/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-widest">
            Verified Knowledge
          </p>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-100 mt-2">
            Professional <span className="gradient-text">Certificates</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-indigo-500 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card rounded-3xl p-6 hover:border-cyan-500/50 transition-all flex flex-col sm:flex-row gap-6 items-center"
            >
              {cert.imageUrl && (
                <div className="w-full sm:w-40 h-32 rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shrink-0">
                  <img
                    src={cert.imageUrl}
                    alt={cert.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="space-y-3 w-full">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded border border-cyan-500/20">
                    {cert.date}
                  </span>
                  <FaCertificate className="text-amber-400 w-5 h-5" />
                </div>

                <h3 className="text-lg font-bold text-slate-100 leading-snug">{cert.title}</h3>
                <p className="text-xs font-semibold text-slate-400">{cert.issuer}</p>

                {cert.description && (
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                    {cert.description}
                  </p>
                )}

                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:underline pt-1"
                  >
                    <span>Verify Credential</span>
                    <FaExternalLinkAlt className="w-3 h-3" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Certificates;
