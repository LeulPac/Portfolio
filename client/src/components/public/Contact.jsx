import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaCheckCircle } from 'react-icons/fa';
import confetti from 'canvas-confetti';
import api from '../../api/axios';
import { useAnalytics } from '../../context/AnalyticsContext';

const Contact = ({ settings = {} }) => {
  const { trackEvent } = useAnalytics();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const res = await api.post('/messages', formData);
      if (res.data.success) {
        setSubmitted(true);
        trackEvent('contact_submit', 'Contact Form');

        // Confetti effect on submit
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch (e) {}

        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setErrorMessage(res.data.message || 'Failed to send message');
      }
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Error submitting message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-slate-50 dark:bg-slate-950 relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-mono font-semibold text-cyan-600 dark:text-cyan-400 uppercase tracking-widest">
            Let's Connect
          </p>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100 mt-2">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-indigo-500 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                Have a project or opportunity in mind?
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                I am actively seeking software engineering positions, internships, and collaborative development projects. Feel free to send a message directly!
              </p>
            </div>

            <div className="space-y-4">
              <div className="glass-card p-4 rounded-2xl flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400 text-lg shadow-glow">
                  <FaEnvelope />
                </div>
                <div>
                  <span className="text-xs text-slate-500 block">Direct Email:</span>
                  <a href={`mailto:${settings.email || 'leul.mengesha.dev@gmail.com'}`} className="text-sm font-semibold text-slate-900 dark:text-slate-200 hover:text-cyan-500 dark:hover:text-cyan-400">
                    {settings.email || 'leul.mengesha.dev@gmail.com'}
                  </a>
                </div>
              </div>

              <div className="glass-card p-4 rounded-2xl flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-lg">
                  <FaPhone />
                </div>
                <div>
                  <span className="text-xs text-slate-500 block">Phone Number:</span>
                  <span className="text-sm font-semibold text-slate-900 dark:text-slate-200">
                    {settings.phone || '+251 900 000 000'}
                  </span>
                </div>
              </div>

              <div className="glass-card p-4 rounded-2xl flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 text-lg">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <span className="text-xs text-slate-500 block">Location:</span>
                  <span className="text-sm font-semibold text-slate-900 dark:text-slate-200">
                    {settings.location || 'Mekele, Ethiopia'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-3xl p-8 relative overflow-hidden">
              
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <FaCheckCircle className="w-16 h-16 text-cyan-500 dark:text-cyan-400 mx-auto animate-bounce" />
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Message Sent!</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm mx-auto">
                    Thank you for reaching out. Your message has been routed to my inbox. I will reply to you shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 text-xs font-bold text-slate-950 bg-cyan-400 rounded-xl"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {errorMessage && (
                    <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 dark:text-rose-400 text-xs font-semibold">
                      {errorMessage}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Your Name *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Your Email *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Opportunity / Collaboration"
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Message *</label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write your message here..."
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-indigo-500 hover:from-cyan-300 hover:to-indigo-400 rounded-xl shadow-glow transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Send Message</span>
                        <FaPaperPlane className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;

