import React, { useState, useEffect } from 'react';
import { FaTimes, FaSave, FaUpload, FaMarkdown } from 'react-icons/fa';
import api from '../../api/axios';

const ProjectFormModal = ({ isOpen, onClose, onSave, project = null }) => {
  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    fullDescription: '',
    bannerUrl: '',
    gallery: '',
    features: '',
    challenges: '',
    lessonsLearned: '',
    githubUrl: '',
    liveUrl: '',
    category: 'Web Development',
    featured: false,
    hidden: false,
    technologies: ''
  });
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('edit');

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || '',
        shortDescription: project.shortDescription || '',
        fullDescription: project.fullDescription || '',
        bannerUrl: project.bannerUrl || '',
        gallery: Array.isArray(project.gallery) ? project.gallery.join(', ') : '',
        features: Array.isArray(project.features) ? project.features.join('\n') : '',
        challenges: Array.isArray(project.challenges) ? project.challenges.join('\n') : '',
        lessonsLearned: Array.isArray(project.lessonsLearned) ? project.lessonsLearned.join('\n') : '',
        githubUrl: project.githubUrl || '',
        liveUrl: project.liveUrl || '',
        category: project.category || 'Web Development',
        featured: Boolean(project.featured),
        hidden: Boolean(project.hidden),
        technologies: Array.isArray(project.technologies) ? project.technologies.join(', ') : ''
      });
    } else {
      setFormData({
        title: '',
        shortDescription: '',
        fullDescription: '',
        bannerUrl: '',
        gallery: '',
        features: '',
        challenges: '',
        lessonsLearned: '',
        githubUrl: '',
        liveUrl: '',
        category: 'Web Development',
        featured: false,
        hidden: false,
        technologies: ''
      });
    }
  }, [project]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      gallery: formData.gallery.split(',').map(s => s.trim()).filter(Boolean),
      features: formData.features.split('\n').map(s => s.trim()).filter(Boolean),
      challenges: formData.challenges.split('\n').map(s => s.trim()).filter(Boolean),
      lessonsLearned: formData.lessonsLearned.split('\n').map(s => s.trim()).filter(Boolean),
      technologies: formData.technologies.split(',').map(s => s.trim()).filter(Boolean)
    };

    try {
      if (project && project.id) {
        const res = await api.put(`/projects/${project.id}`, payload);
        if (res.data.success) onSave(res.data.project);
      } else {
        const res = await api.post('/projects', payload);
        if (res.data.success) onSave(res.data.project);
      }
      onClose();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start md:items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="glass-card rounded-3xl p-4 md:p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto space-y-6 my-4 md:my-8 border border-slate-800">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <h2 className="text-xl font-bold text-slate-100">
            {project ? 'Edit Project' : 'Create New Project'}
          </h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-rose-400">
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Project Title *</label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. DevPulse Distributed Telemetry"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-100 focus:border-cyan-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-100 focus:border-cyan-500"
              >
                <option value="Web Development">Web Development</option>
                <option value="Cloud & Systems">Cloud & Systems</option>
                <option value="AI & Machine Learning">AI & Machine Learning</option>
                <option value="Mobile App">Mobile App</option>
                <option value="Algorithms">Algorithms</option>
              </select>
            </div>

          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">Short Description *</label>
            <input
              type="text"
              name="shortDescription"
              required
              value={formData.shortDescription}
              onChange={handleChange}
              placeholder="High-level 1-2 sentence overview of the project"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-100 focus:border-cyan-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Banner Image URL *</label>
              <input
                type="text"
                name="bannerUrl"
                required
                value={formData.bannerUrl}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-100 focus:border-cyan-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Technologies (Comma-separated)</label>
              <input
                type="text"
                name="technologies"
                value={formData.technologies}
                onChange={handleChange}
                placeholder="React, Node.js, PostgreSQL, Docker"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-100 focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">GitHub Repository URL</label>
              <input
                type="url"
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleChange}
                placeholder="https://github.com/leulmengesha/repo"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-100 focus:border-cyan-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Live Demo URL</label>
              <input
                type="url"
                name="liveUrl"
                value={formData.liveUrl}
                onChange={handleChange}
                placeholder="https://demo.leulmengesha.com"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-100 focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
              <span>Full Description (Markdown Supported) *</span>
              <span className="text-[10px] text-cyan-400 font-mono flex items-center gap-1">
                <FaMarkdown /> Markdown Active
              </span>
            </label>
            <textarea
              name="fullDescription"
              rows={6}
              value={formData.fullDescription}
              onChange={handleChange}
              placeholder="Write detailed architecture, highlights, and implementation notes..."
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-100 focus:border-cyan-500 font-mono resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Features (1 per line)</label>
              <textarea
                name="features"
                rows={3}
                value={formData.features}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Challenges (1 per line)</label>
              <textarea
                name="challenges"
                rows={3}
                value={formData.challenges}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Lessons (1 per line)</label>
              <textarea
                name="lessonsLearned"
                rows={3}
                value={formData.lessonsLearned}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 resize-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="w-4 h-4 accent-cyan-500 rounded"
              />
              <span>Feature on Public Homepage</span>
            </label>

            <label className="flex items-center gap-2 text-xs font-semibold text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                name="hidden"
                checked={formData.hidden}
                onChange={handleChange}
                className="w-4 h-4 accent-rose-500 rounded"
              />
              <span>Hide Project (Draft)</span>
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-xs font-semibold text-slate-400 hover:text-slate-200"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl shadow-glow flex items-center gap-2"
            >
              <FaSave />
              <span>{loading ? 'Saving...' : 'Save Project'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default ProjectFormModal;
