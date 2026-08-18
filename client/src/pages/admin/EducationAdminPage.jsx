import React, { useState, useEffect } from 'react';
import { FaTrash, FaGraduationCap } from 'react-icons/fa';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import api from '../../api/axios';

const EducationAdminPage = () => {
  const [education, setEducation] = useState([]);
  const [formData, setFormData] = useState({
    institution: '',
    degree: '',
    fieldOfStudy: '',
    location: '',
    startDate: '',
    endDate: '',
    gpa: '',
    description: '',
    courses: ''
  });

  const fetchEducation = async () => {
    try {
      const res = await api.get('/education');
      if (res.data.success) setEducation(res.data.education);
    } catch (err) {}
  };

  useEffect(() => {
    fetchEducation();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      courses: formData.courses.split(',').map(s => s.trim()).filter(Boolean)
    };

    try {
      const res = await api.post('/education', payload);
      if (res.data.success) {
        setEducation([res.data.education, ...education]);
        setFormData({ institution: '', degree: '', fieldOfStudy: '', location: '', startDate: '', endDate: '', gpa: '', description: '', courses: '' });
      }
    } catch (err) {
      alert('Failed to add education');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete education record?')) return;
    try {
      await api.delete(`/education/${id}`);
      setEducation(education.filter(e => e.id !== id));
    } catch (err) {}
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0 w-full">
        <AdminHeader title="Education Management" />
        <main className="p-4 md:p-6 w-full max-w-full overflow-x-hidden space-y-6 md:space-y-8">
          
          <div className="glass-card rounded-3xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-100 font-mono">Add Academic Qualification</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  required
                  placeholder="Institution (e.g. University of Washington)"
                  value={formData.institution}
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                  className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100"
                />
                <input
                  type="text"
                  required
                  placeholder="Degree (e.g. B.S.)"
                  value={formData.degree}
                  onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                  className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100"
                />
                <input
                  type="text"
                  required
                  placeholder="Field of Study (e.g. Computer Science)"
                  value={formData.fieldOfStudy}
                  onChange={(e) => setFormData({ ...formData, fieldOfStudy: e.target.value })}
                  className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Start Date - End Date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100"
                />
                <input
                  type="text"
                  placeholder="GPA (e.g. 3.88 / 4.00)"
                  value={formData.gpa}
                  onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
                  className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100"
                />
                <input
                  type="text"
                  placeholder="Relevant Courses (comma-separated)"
                  value={formData.courses}
                  onChange={(e) => setFormData({ ...formData, courses: e.target.value })}
                  className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100"
                />
              </div>

              <button type="submit" className="py-2.5 px-6 text-xs font-bold text-slate-950 bg-cyan-400 rounded-xl shadow-glow">
                Save Education Record
              </button>
            </form>
          </div>

          <div className="glass-card rounded-3xl p-6 space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-100">{edu.institution}</h4>
                  <p className="text-xs font-mono text-cyan-400">{edu.degree} in {edu.fieldOfStudy} ({edu.startDate})</p>
                </div>
                <button onClick={() => handleDelete(edu.id)} className="p-2 text-rose-400">
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

export default EducationAdminPage;
