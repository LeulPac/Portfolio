import React, { useState, useEffect } from 'react';
import { FaPlus, FaTrash, FaBriefcase } from 'react-icons/fa';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import api from '../../api/axios';

const ExperienceAdminPage = () => {
  const [experiences, setExperiences] = useState([]);
  const [formData, setFormData] = useState({
    role: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
    technologies: ''
  });

  const fetchExperiences = async () => {
    try {
      const res = await api.get('/experiences');
      if (res.data.success) setExperiences(res.data.experiences);
    } catch (err) {}
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      description: formData.description.split('\n').map(s => s.trim()).filter(Boolean),
      technologies: formData.technologies.split(',').map(s => s.trim()).filter(Boolean)
    };

    try {
      const res = await api.post('/experiences', payload);
      if (res.data.success) {
        setExperiences([res.data.experience, ...experiences]);
        setFormData({ role: '', company: '', location: '', startDate: '', endDate: '', current: false, description: '', technologies: '' });
      }
    } catch (err) {
      alert('Failed to add experience');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete experience?')) return;
    try {
      await api.delete(`/experiences/${id}`);
      setExperiences(experiences.filter(e => e.id !== id));
    } catch (err) {}
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0 w-full">
        <AdminHeader title="Experience Management" />
        <main className="p-4 md:p-6 w-full max-w-full overflow-x-hidden space-y-6 md:space-y-8">
          
          <div className="glass-card rounded-3xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-100 font-mono">Add Work / Leadership Experience</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  required
                  placeholder="Role Title (e.g. Software Engineer Intern)"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-100"
                />
                <input
                  type="text"
                  required
                  placeholder="Company / Institution Name"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-100"
                />
                <input
                  type="text"
                  placeholder="Location (e.g. Seattle, WA)"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-100"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <input
                  type="text"
                  required
                  placeholder="Start Date (e.g. Jun 2025)"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-100"
                />
                <input
                  type="text"
                  placeholder="End Date (e.g. Sep 2025)"
                  disabled={formData.current}
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-100 disabled:opacity-40"
                />
                <label className="flex items-center gap-2 text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={formData.current}
                    onChange={(e) => setFormData({ ...formData, current: e.target.checked })}
                    className="accent-cyan-500"
                  />
                  <span>Currently Working Here</span>
                </label>
              </div>

              <textarea
                rows={3}
                placeholder="Bullet points (1 per line)"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-100 resize-none"
              />

              <input
                type="text"
                placeholder="Technologies used (comma-separated)"
                value={formData.technologies}
                onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-100"
              />

              <button type="submit" className="w-full sm:w-auto py-3 px-6 text-sm font-bold text-slate-950 bg-cyan-400 rounded-xl shadow-glow">
                Save Experience Entry
              </button>
            </form>
          </div>

          <div className="glass-card rounded-3xl p-6 space-y-4">
            {experiences.map((exp) => (
              <div key={exp.id} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row items-start justify-between gap-3">
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-slate-100">{exp.role} @ <span className="text-cyan-400">{exp.company}</span></h4>
                  <p className="text-xs font-mono text-slate-400">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
                </div>
                <button onClick={() => handleDelete(exp.id)} className="p-2 text-rose-400">
                  <FaTrash className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

        </main>
      </div>
    </div>
  );
};

export default ExperienceAdminPage;
