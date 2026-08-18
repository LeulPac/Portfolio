import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaStar, FaEye, FaSearch } from 'react-icons/fa';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import ProjectFormModal from '../../components/admin/ProjectFormModal';
import api from '../../api/axios';

const ProjectsAdminPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchProjects = async () => {
    try {
      const res = await api.get('/projects?includeHidden=true');
      if (res.data.success) setProjects(res.data.projects);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await api.delete(`/projects/${id}`);
      setProjects(projects.filter(p => p.id !== id));
    } catch (err) {
      alert('Delete failed');
    }
  };

  const handleToggleFeatured = async (project) => {
    try {
      const res = await api.put(`/projects/${project.id}`, { featured: !project.featured });
      if (res.data.success) {
        setProjects(projects.map(p => p.id === project.id ? res.data.project : p));
      }
    } catch (err) {}
  };

  const filteredProjects = projects.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden">
      <AdminSidebar />

      <div className="flex-1 flex flex-col min-w-0 w-full">
        <AdminHeader title="Projects Management" />

        <main className="p-4 md:p-6 w-full max-w-full overflow-x-hidden space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search projects..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-100 focus:border-cyan-500"
              />
            </div>

            <button
              onClick={() => { setEditingProject(null); setModalOpen(true); }}
              className="px-5 py-2.5 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl shadow-glow flex items-center gap-2"
            >
              <FaPlus /> Add New Project
            </button>
          </div>

          <div className="glass-card rounded-3xl p-6 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900/80 text-slate-400 uppercase font-mono text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="px-4 py-3">Project Title</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Views</th>
                    <th className="px-4 py-3">Featured</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {filteredProjects.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-900/40 transition-colors">
                      <td className="px-4 py-4 font-bold text-slate-100">
                        {p.title}
                      </td>
                      <td className="px-4 py-4 font-mono text-cyan-400">{p.category}</td>
                      <td className="px-4 py-4 font-mono">{p.viewsCount || 0}</td>
                      <td className="px-4 py-4">
                        <button
                          onClick={() => handleToggleFeatured(p)}
                          className={`p-1.5 rounded-lg border transition-colors ${
                            p.featured ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' : 'bg-slate-900 border-slate-800 text-slate-500'
                          }`}
                        >
                          <FaStar className="w-3.5 h-3.5" />
                        </button>
                      </td>
                      <td className="px-4 py-4">
                        {p.hidden ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-rose-500/10 text-rose-400 border border-rose-500/20">Hidden</span>
                        ) : (
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Published</span>
                        )}
                      </td>
                      <td className="px-4 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => { setEditingProject(p); setModalOpen(true); }}
                            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-slate-800"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(p.id)}
                            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-rose-400 border border-slate-800"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <ProjectFormModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            onSave={() => fetchProjects()}
            project={editingProject}
          />
        </main>
      </div>
    </div>
  );
};

export default ProjectsAdminPage;
