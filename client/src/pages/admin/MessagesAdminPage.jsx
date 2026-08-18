import React, { useState, useEffect } from 'react';
import { FaTrash, FaArchive, FaEnvelopeOpen, FaEnvelope, FaSearch, FaReply } from 'react-icons/fa';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import api from '../../api/axios';

const MessagesAdminPage = () => {
  const [messages, setMessages] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);

  const fetchMessages = async () => {
    try {
      const res = await api.get(`/messages?filter=${filter}`);
      if (res.data.success) setMessages(res.data.messages || []);
    } catch (err) {}
  };

  useEffect(() => {
    fetchMessages();
  }, [filter]);

  const handleToggleRead = async (msg) => {
    try {
      const res = await api.put(`/messages/${msg.id}`, { read: !msg.read });
      if (res.data.success) {
        setMessages(messages.map(m => m.id === msg.id ? res.data.messageItem : m));
      }
    } catch (err) {}
  };

  const handleToggleArchive = async (msg) => {
    try {
      const res = await api.put(`/messages/${msg.id}`, { archived: !msg.archived });
      if (res.data.success) {
        setMessages(messages.filter(m => m.id !== msg.id));
        if (selectedMessage?.id === msg.id) setSelectedMessage(null);
      }
    } catch (err) {}
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete message?')) return;
    try {
      await api.delete(`/messages/${id}`);
      setMessages(messages.filter(m => m.id !== id));
      if (selectedMessage?.id === id) setSelectedMessage(null);
    } catch (err) {}
  };

  const filteredMessages = messages.filter(m =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden">
      <AdminSidebar unreadCount={messages.filter(m => !m.read && !m.archived).length} />

      <div className="flex-1 flex flex-col min-w-0 w-full">
        <AdminHeader title="Messages Inbox" />

        <main className="p-4 md:p-6 w-full max-w-full overflow-x-hidden space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search messages..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-100 focus:border-cyan-500"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              {['all', 'unread', 'archived'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider ${
                    filter === f ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-900 text-slate-400 border border-slate-800'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Messages List */}
            <div className="lg:col-span-5 glass-card rounded-3xl p-4 space-y-2 max-h-[70vh] overflow-y-auto">
              {filteredMessages.map((msg) => (
                <div
                  key={msg.id}
                  onClick={() => { setSelectedMessage(msg); if (!msg.read) handleToggleRead(msg); }}
                  className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                    selectedMessage?.id === msg.id
                      ? 'bg-slate-900 border-cyan-500/50 shadow-glow'
                      : !msg.read
                      ? 'bg-slate-900/90 border-cyan-500/30'
                      : 'bg-slate-950/40 border-slate-800 hover:bg-slate-900/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-100">{msg.name}</span>
                    <span className="text-[10px] font-mono text-slate-500">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-xs font-mono text-cyan-400">{msg.email}</p>
                  <p className="text-xs text-slate-400 line-clamp-1 mt-1">{msg.subject}</p>
                </div>
              ))}
            </div>

            {/* Message Detail View */}
            <div className="lg:col-span-7 glass-card rounded-3xl p-6 space-y-6">
              {selectedMessage ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4 gap-3 flex-wrap">
                    <div>
                      <h3 className="text-lg font-bold text-slate-100">{selectedMessage.subject}</h3>
                      <p className="text-xs text-slate-400">
                        From: <span className="text-cyan-400 font-mono font-semibold">{selectedMessage.name}</span> ({selectedMessage.email})
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleArchive(selectedMessage)}
                        className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-indigo-400 border border-slate-800"
                        title="Archive"
                      >
                        <FaArchive />
                      </button>
                      <button
                        onClick={() => handleDelete(selectedMessage.id)}
                        className="p-2 rounded-lg bg-slate-900 text-rose-400 border border-slate-800"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-sm text-slate-200 leading-relaxed whitespace-pre-wrap font-mono">
                    {selectedMessage.message}
                  </div>

                  <div className="pt-4 border-t border-slate-800">
                    <a
                      href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject)}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-slate-950 bg-cyan-400 rounded-xl shadow-glow"
                    >
                      <FaReply /> Reply via Email
                    </a>
                  </div>
                </div>
              ) : (
                <div className="text-center py-20 text-slate-500 font-mono text-xs">
                  Select a message from the list to view its full content.
                </div>
              )}
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default MessagesAdminPage;
