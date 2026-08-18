import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft, FaCheckCircle, FaExclamationTriangle, FaLightbulb, FaEye, FaCalendarAlt } from 'react-icons/fa';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import ProjectCard from '../../components/public/ProjectCard';
import SkeletonLoader from '../../components/common/SkeletonLoader';
import api from '../../api/axios';

const ProjectDetailsPage = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [relatedProjects, setRelatedProjects] = useState([]);
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const fetchProjectDetails = async () => {
      setLoading(true);
      try {
        const [projRes, setRes] = await Promise.all([
          api.get(`/projects/slug/${slug}`),
          api.get('/settings')
        ]);

        if (projRes.data.success) {
          setProject(projRes.data.project);
          setRelatedProjects(projRes.data.relatedProjects || []);
          setActiveImage(projRes.data.project.bannerUrl);
        }
        if (setRes.data.success) {
          setSettings(setRes.data.settings);
        }
      } catch (err) {
        console.error('Error fetching project details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [slug]);

  const handleTrackClick = (target) => {
    if (project?.id) {
      api.post(`/projects/${project.id}/click`, { target }).catch(() => {});
    }
  };

  if (loading) {
    return (
      <div className="bg-slate-950 min-h-screen">
        <Navbar />
        <div className="max-w-5xl mx-auto px-4 pt-32 pb-20">
          <SkeletonLoader type="card" count={1} />
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="bg-slate-950 min-h-screen text-slate-100 flex flex-col items-center justify-center pt-32 pb-20 px-4">
        <Navbar />
        <div className="glass-card rounded-3xl p-12 text-center max-w-md">
          <h2 className="text-2xl font-bold text-slate-100">Project Not Found</h2>
          <p className="text-sm text-slate-400 mt-2 mb-6">The requested software project could not be retrieved.</p>
          <Link to="/" className="px-6 py-3 text-xs font-bold text-slate-950 bg-cyan-400 rounded-xl">
            Return to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen">
      <Navbar siteLogo={settings.websiteLogo || 'LM.'} />

      <main className="pt-28 pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Back Navigation */}
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors"
          >
            <FaArrowLeft /> Back to Showcase Projects
          </Link>

          {/* Banner & Header */}
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold">
                {project.category}
              </span>
              <span className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                <FaEye className="text-cyan-400" /> {project.viewsCount || 0} Views
              </span>
              <span className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                <FaCalendarAlt /> {new Date(project.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight leading-tight">
              {project.title}
            </h1>

            <p className="text-lg text-slate-300 leading-relaxed max-w-3xl">
              {project.shortDescription}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleTrackClick('live')}
                  className="px-6 py-3.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-indigo-500 hover:from-cyan-300 hover:to-indigo-400 rounded-xl shadow-glow transition-all flex items-center gap-2"
                >
                  <span>Launch Live Demo</span>
                  <FaExternalLinkAlt className="w-3.5 h-3.5" />
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleTrackClick('github')}
                  className="px-6 py-3.5 text-xs font-semibold text-slate-200 glass-card hover:border-cyan-500/50 hover:text-cyan-400 rounded-xl transition-all flex items-center gap-2"
                >
                  <FaGithub className="w-4 h-4 text-cyan-400" />
                  <span>View Source Code</span>
                </a>
              )}
            </div>
          </div>

          {/* Large Interactive Banner Image & Gallery Carousel */}
          <div className="space-y-4">
            <div className="w-full h-96 sm:h-[480px] rounded-3xl overflow-hidden glass-card relative border border-slate-800">
              <img
                src={activeImage || project.bannerUrl}
                alt={project.title}
                className="w-full h-full object-cover object-center transition-all duration-300"
              />
            </div>

            {/* Gallery Thumbnails */}
            {(project.gallery || []).length > 0 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {[project.bannerUrl, ...project.gallery].map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`w-24 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                      activeImage === img ? 'border-cyan-400 scale-105 shadow-glow' : 'border-slate-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Screenshot ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Technology Stack Grid */}
          <div className="glass-card rounded-3xl p-6 space-y-3">
            <h3 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider">
              Technology Stack Used
            </h3>
            <div className="flex flex-wrap gap-2">
              {(project.technologies || []).map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-900 text-xs font-mono font-semibold text-cyan-300 border border-slate-800"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Full Markdown Description */}
          <div className="glass-card rounded-3xl p-8 space-y-6">
            <h2 className="text-2xl font-bold text-slate-100 border-b border-slate-800 pb-4">
              Project Architecture & Overview
            </h2>
            <div className="prose prose-invert prose-cyan max-w-none text-slate-300 leading-relaxed">
              <ReactMarkdown>{project.fullDescription}</ReactMarkdown>
            </div>
          </div>

          {/* Features, Challenges & Lessons Learned Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Features */}
            {(project.features || []).length > 0 && (
              <div className="glass-card rounded-3xl p-6 space-y-4">
                <div className="flex items-center gap-2 text-cyan-400 font-bold">
                  <FaCheckCircle className="w-5 h-5" />
                  <h3 className="text-base text-slate-100">Key Features</h3>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-300">
                  {project.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-1">&bull;</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Challenges */}
            {(project.challenges || []).length > 0 && (
              <div className="glass-card rounded-3xl p-6 space-y-4">
                <div className="flex items-center gap-2 text-amber-400 font-bold">
                  <FaExclamationTriangle className="w-5 h-5" />
                  <h3 className="text-base text-slate-100">Architectural Challenges</h3>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-300">
                  {project.challenges.map((chal, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-amber-400 mt-1">&bull;</span>
                      <span>{chal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Lessons Learned */}
            {(project.lessonsLearned || []).length > 0 && (
              <div className="glass-card rounded-3xl p-6 space-y-4">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <FaLightbulb className="w-5 h-5" />
                  <h3 className="text-base text-slate-100">Key Takeaways</h3>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-300">
                  {project.lessonsLearned.map((less, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-1">&bull;</span>
                      <span>{less}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>

          {/* Related Projects */}
          {relatedProjects.length > 0 && (
            <div className="pt-12 border-t border-slate-800 space-y-8">
              <h2 className="text-2xl font-bold text-slate-100">Related Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedProjects.map((rel) => (
                  <ProjectCard key={rel.id} project={rel} />
                ))}
              </div>
            </div>
          )}

        </div>
      </main>

      <Footer settings={settings} />
    </div>
  );
};

export default ProjectDetailsPage;
