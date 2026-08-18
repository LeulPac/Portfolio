import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShieldAlt, FaLock, FaEnvelope, FaArrowRight } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('admin@leulmengesha.com');
  const [password, setPassword] = useState('AdminPassword123!');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await login(email, password);
      if (res.success) {
        navigate('/admin/dashboard');
      } else {
        setError(res.message || 'Invalid admin credentials');
      }
    } catch (err) {
      const apiMessage = err.response?.data?.message;
      if (apiMessage) {
        setError(apiMessage);
      } else if (err.code === 'ECONNABORTED') {
        setError('Backend timed out. Render free services can take up to a minute to wake up — try again.');
      } else {
        setError('Login failed. Check VITE_API_URL on Vercel and that the Render backend is live.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 bg-grid-pattern relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="glass-card rounded-3xl p-8 max-w-md w-full relative z-10 space-y-6 border border-slate-800 shadow-2xl">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-slate-950 text-2xl font-black mx-auto shadow-glow">
            <FaShieldAlt />
          </div>
          <h1 className="text-2xl font-bold text-slate-100">Admin Portal</h1>
          <p className="text-xs text-slate-400 font-mono">Sign in to manage Leul Mengesha Portfolio CMS</p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Admin Email</label>
            <div className="relative">
              <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-300">Password</label>
              <Link to="/admin/forgot-password" className="text-[11px] font-semibold text-cyan-400 hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl shadow-glow transition-all flex items-center justify-center gap-2 mt-4"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <FaArrowRight />
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-4 border-t border-slate-900 text-xs text-slate-500">
          <Link to="/" className="hover:text-cyan-400 transition-colors">
            &larr; Back to Public Portfolio Website
          </Link>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
