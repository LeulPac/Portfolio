import React, { useState, useEffect } from 'react';
import { FaSave, FaLock, FaCog, FaGlobe, FaCloudUploadAlt } from 'react-icons/fa';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import api from '../../api/axios';

const SettingsAdminPage = () => {
  const [settings, setSettings] = useState({
    name: 'Leul Mengesha',
    title: 'Computer Science Student & Software Developer',
    bio: '',
    email: '',
    phone: '',
    location: '',
    avatarUrl: '',
    resumeUrl: '',
    github: '',
    linkedin: '',
    twitter: '',
    seoMetaTitle: '',
    seoMetaDescription: '',
    googleAnalyticsId: ''
  });

  const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '' });
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get('/settings');
        if (res.data.success) setSettings(res.data.settings);
      } catch (err) {}
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatusMessage('');

    try {
      const res = await api.put('/settings', settings);
      if (res.data.success) setStatusMessage('Settings updated successfully!');
    } catch (err) {
      setStatusMessage('Error saving settings.');
    } finally {
      setSaving(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put('/auth/update-password', passwordData);
      if (res.data.success) {
        alert('Password updated successfully!');
        setPasswordData({ currentPassword: '', newPassword: '' });
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Password update failed');
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0 w-full">
        <AdminHeader title="Portfolio & System Settings" />

        <main className="p-4 md:p-6 w-full max-w-full md:max-w-4xl overflow-x-hidden space-y-6 md:space-y-8">
          
          {statusMessage && (
            <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
              {statusMessage}
            </div>
          )}

          {/* Profile & Site Details Form */}
          <form onSubmit={handleSaveSettings} className="glass-card rounded-3xl p-6 space-y-6">
            <h3 className="text-sm font-bold text-slate-100 font-mono flex items-center gap-2">
              <FaCog className="text-cyan-400" /> Personal Profile & Branding
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-slate-300">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={settings.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-300">Professional Title *</label>
                <input
                  type="text"
                  name="title"
                  required
                  value={settings.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-300">Biography / Summary *</label>
              <textarea
                name="bio"
                rows={3}
                value={settings.bio}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-slate-300">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={settings.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-300">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={settings.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-300">Location</label>
                <input
                  type="text"
                  name="location"
                  value={settings.location}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-slate-300">Avatar Image URL (Cloudinary / Web)</label>
                <input
                  type="text"
                  name="avatarUrl"
                  value={settings.avatarUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-300">Resume PDF URL</label>
                <input
                  type="text"
                  name="resumeUrl"
                  value={settings.resumeUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-slate-300">GitHub Link</label>
                <input
                  type="url"
                  name="github"
                  value={settings.github}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-300">LinkedIn Link</label>
                <input
                  type="url"
                  name="linkedin"
                  value={settings.linkedin}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-300">Twitter / X Link</label>
                <input
                  type="url"
                  name="twitter"
                  value={settings.twitter}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100"
                />
              </div>
            </div>

            <div className="border-t border-slate-800 pt-4 space-y-4">
              <h4 className="text-xs font-mono font-bold text-slate-300">SEO & Analytics Meta Tags</h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-slate-300">SEO Meta Title</label>
                  <input
                    type="text"
                    name="seoMetaTitle"
                    value={settings.seoMetaTitle}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-slate-300">Google Analytics ID</label>
                  <input
                    type="text"
                    name="googleAnalyticsId"
                    value={settings.googleAnalyticsId}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 font-mono"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="py-3 px-6 text-xs font-bold text-slate-950 bg-cyan-400 rounded-xl shadow-glow flex items-center gap-2"
            >
              <FaSave /> Save Profile Settings
            </button>
          </form>

          {/* Security / Password Update Card */}
          <form onSubmit={handleUpdatePassword} className="glass-card rounded-3xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-100 font-mono flex items-center gap-2">
              <FaLock className="text-rose-400" /> Security - Change Admin Password
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="password"
                required
                placeholder="Current Password"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100"
              />

              <input
                type="password"
                required
                placeholder="New Password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100"
              />
            </div>

            <button type="submit" className="py-2.5 px-6 text-xs font-bold text-slate-100 bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700">
              Update Admin Password
            </button>
          </form>

        </main>
      </div>
    </div>
  );
};

export default SettingsAdminPage;
