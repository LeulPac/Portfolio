import React, { useState } from 'react';
import { FaSearch, FaGlobeAmericas, FaDesktop, FaMobileAlt } from 'react-icons/fa';

const VisitorLogsTable = ({ logs = [] }) => {
  const [search, setSearch] = useState('');

  const filteredLogs = logs.filter(log =>
    log.ip.includes(search) ||
    log.browser.toLowerCase().includes(search.toLowerCase()) ||
    log.os.toLowerCase().includes(search.toLowerCase()) ||
    log.country.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="glass-card rounded-3xl p-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-100">Live Visitor Logs</h3>
          <p className="text-xs text-slate-400 font-mono">Real-time session metadata and route analytics</p>
        </div>

        <div className="relative w-full sm:w-64">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-3.5 h-3.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search IP, OS, Browser..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-900/80 text-slate-400 uppercase font-mono text-[10px] tracking-wider border-b border-slate-800">
            <tr>
              <th className="px-4 py-3 rounded-l-xl">Visitor / IP</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Device & Browser</th>
              <th className="px-4 py-3">Duration</th>
              <th className="px-4 py-3 rounded-r-xl">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-300">
            {filteredLogs.slice(0, 15).map((log) => (
              <tr key={log.id} className="hover:bg-slate-900/40 transition-colors">
                <td className="px-4 py-3 font-mono font-semibold text-cyan-400">
                  {log.ip}
                </td>
                <td className="px-4 py-3 flex items-center gap-1.5">
                  <FaGlobeAmericas className="text-indigo-400" />
                  <span>{log.city}, {log.country}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    {log.device === 'Mobile' ? <FaMobileAlt className="text-amber-400" /> : <FaDesktop className="text-cyan-400" />}
                    <span>{log.browser} on {log.os}</span>
                  </div>
                </td>
                <td className="px-4 py-3 font-mono text-slate-400">
                  {log.duration}s
                </td>
                <td className="px-4 py-3 text-slate-500 font-mono">
                  {new Date(log.sessionStart).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VisitorLogsTable;
