import React, { useState, useEffect } from 'react';
import { FaTrash, FaCertificate } from 'react-icons/fa';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import api from '../../api/axios';

const CertificatesAdminPage = () => {
  const [certificates, setCertificates] = useState([]);
  const [formData, setFormData] = useState({ title: '', issuer: '', date: '', credentialUrl: '', imageUrl: '', description: '' });

  const fetchCertificates = async () => {
    try {
      const res = await api.get('/certificates');
      if (res.data.success) setCertificates(res.data.certificates);
    } catch (err) {}
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/certificates', formData);
      if (res.data.success) {
        setCertificates([res.data.certificate, ...certificates]);
        setFormData({ title: '', issuer: '', date: '', credentialUrl: '', imageUrl: '', description: '' });
      }
    } catch (err) {
      alert('Failed to add certificate');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete certificate?')) return;
    try {
      await api.delete(`/certificates/${id}`);
      setCertificates(certificates.filter(c => c.id !== id));
    } catch (err) {}
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader title="Certificates Management" />
        <main className="p-6 space-y-8">
          
          <div className="glass-card rounded-3xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-100 font-mono">Upload / Add Certificate</h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                required
                placeholder="Certificate Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100"
              />
              <input
                type="text"
                required
                placeholder="Issuer (e.g. AWS / Meta)"
                value={formData.issuer}
                onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100"
              />
              <input
                type="text"
                placeholder="Date Earned"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100"
              />
              <input
                type="url"
                placeholder="Credential Verification URL"
                value={formData.credentialUrl}
                onChange={(e) => setFormData({ ...formData, credentialUrl: e.target.value })}
                className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100"
              />
              <input
                type="url"
                placeholder="Badge / Image Preview URL"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 sm:col-span-2"
              />
              <button type="submit" className="py-2.5 px-6 text-xs font-bold text-slate-950 bg-cyan-400 rounded-xl shadow-glow sm:col-span-2">
                Add Certificate
              </button>
            </form>
          </div>

          <div className="glass-card rounded-3xl p-6 space-y-4">
            {certificates.map((cert) => (
              <div key={cert.id} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-100">{cert.title}</h4>
                  <p className="text-xs font-mono text-cyan-400">{cert.issuer} &bull; {cert.date}</p>
                </div>
                <button onClick={() => handleDelete(cert.id)} className="p-2 text-rose-400">
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

export default CertificatesAdminPage;
