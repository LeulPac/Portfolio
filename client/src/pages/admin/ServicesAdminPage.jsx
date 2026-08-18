import React, { useState, useEffect } from 'react';
import { FaTrash, FaTools } from 'react-icons/fa';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import api from '../../api/axios';

const ServicesAdminPage = () => {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '', icon: 'code', features: '' });

  const fetchServices = async () => {
    try {
      const res = await api.get('/services');
      if (res.data.success) setServices(res.data.services);
    } catch (err) {}
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      features: formData.features.split('\n').map(s => s.trim()).filter(Boolean)
    };

    try {
      const res = await api.post('/services', payload);
      if (res.data.success) {
        setServices([res.data.service, ...services]);
        setFormData({ title: '', description: '', icon: 'code', features: '' });
      }
    } catch (err) {
      alert('Failed to add service');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete service?')) return;
    try {
      await api.delete(`/services/${id}`);
      setServices(services.filter(s => s.id !== id));
    } catch (err) {}
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0 w-full">
        <AdminHeader title="Services Management" />
        <main className="p-4 md:p-6 w-full max-w-full overflow-x-hidden space-y-6 md:space-y-8">
          
          <div className="glass-card rounded-3xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-100 font-mono">Create Engineering Service</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  placeholder="Service Title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100"
                />
                <select
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100"
                >
                  <option value="code">Code (Frontend)</option>
                  <option value="server">Server (Backend)</option>
                  <option value="database">Database (Tuning)</option>
                </select>
              </div>

              <textarea
                required
                rows={2}
                placeholder="Service Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 resize-none"
              />

              <textarea
                rows={3}
                placeholder="Features checklist (1 per line)"
                value={formData.features}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 resize-none"
              />

              <button type="submit" className="py-2.5 px-6 text-xs font-bold text-slate-950 bg-cyan-400 rounded-xl shadow-glow">
                Add Service Offering
              </button>
            </form>
          </div>

          <div className="glass-card rounded-3xl p-6 space-y-4">
            {services.map((s) => (
              <div key={s.id} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-100">{s.title}</h4>
                  <p className="text-xs text-slate-400">{s.description}</p>
                </div>
                <button onClick={() => handleDelete(s.id)} className="p-2 text-rose-400">
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

export default ServicesAdminPage;
