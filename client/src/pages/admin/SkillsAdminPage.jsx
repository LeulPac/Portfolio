import React, { useState, useEffect } from 'react';
import { FaPlus, FaTrash, FaSave, FaCode } from 'react-icons/fa';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import api from '../../api/axios';

const SkillsAdminPage = () => {
  const [skills, setSkills] = useState([]);
  const [formData, setFormData] = useState({ name: '', category: 'Frontend', percentage: 80, icon: 'code' });
  const [loading, setLoading] = useState(false);

  const fetchSkills = async () => {
    try {
      const res = await api.get('/skills');
      if (res.data.success) setSkills(res.data.skills);
    } catch (err) {}
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/skills', formData);
      if (res.data.success) {
        setSkills([...skills, res.data.skill]);
        setFormData({ name: '', category: 'Frontend', percentage: 80, icon: 'code' });
      }
    } catch (err) {
      alert('Failed to add skill');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this skill?')) return;
    try {
      await api.delete(`/skills/${id}`);
      setSkills(skills.filter(s => s.id !== id));
    } catch (err) {}
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden">
      <AdminSidebar />

      <div className="flex-1 flex flex-col min-w-0 w-full">
        <AdminHeader title="Skills Management" />

        <main className="p-4 md:p-6 w-full max-w-full overflow-x-hidden space-y-6 md:space-y-8">
          {/* Add Skill Form */}
          <div className="glass-card rounded-3xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-100 font-mono">Add New Skill</h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-slate-300">Skill Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. React.js"
                  className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-300">Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100"
                >
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Database">Database</option>
                  <option value="Cloud & DevOps">Cloud & DevOps</option>
                  <option value="CS Fundamentals">CS Fundamentals</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-300">Proficiency Percentage ({formData.percentage}%)</label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={formData.percentage}
                  onChange={(e) => setFormData({ ...formData, percentage: parseInt(e.target.value, 10) })}
                  className="w-full accent-cyan-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:col-span-2 lg:col-span-1 py-3 px-4 text-sm font-bold text-slate-950 bg-cyan-400 rounded-xl shadow-glow flex items-center justify-center gap-2"
              >
                <FaPlus /> Add Skill
              </button>
            </form>
          </div>

          {/* Existing Skills List */}
          <div className="glass-card rounded-3xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {skills.map((s) => (
                <div key={s.id} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-100">{s.name}</h4>
                    <span className="text-[10px] font-mono text-cyan-400">{s.category} &bull; {s.percentage}%</span>
                  </div>
                  <button onClick={() => handleDelete(s.id)} className="p-2 text-rose-400 hover:text-rose-300">
                    <FaTrash className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SkillsAdminPage;
