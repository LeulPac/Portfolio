import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

const COLORS = ['#06b6d4', '#6366f1', '#10b981', '#f59e0b', '#ec4899'];

const AnalyticsCharts = ({ dailyData = [], deviceData = [], topProjects = [] }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      {/* Daily Visitors Area Chart */}
      <div className="lg:col-span-8 glass-card rounded-3xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-200 font-mono">
          Visitor Traffic (Last 7 Days)
        </h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dailyData}>
              <defs>
                <linearGradient id="visitorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" stroke="#64748b" fontSize={12} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', fontSize: '12px' }}
                itemStyle={{ color: '#22d3ee' }}
              />
              <Area type="monotone" dataKey="visitors" stroke="#06b6d4" strokeWidth={3} fillOpacity={1} fill="url(#visitorGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Viewed Projects Bar Chart */}
      <div className="lg:col-span-4 glass-card rounded-3xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-200 font-mono">
          Top Viewed Projects
        </h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topProjects} layout="vertical">
              <XAxis type="number" stroke="#64748b" fontSize={10} hide />
              <YAxis dataKey="title" type="category" stroke="#94a3b8" fontSize={11} width={120} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', fontSize: '12px' }}
              />
              <Bar dataKey="viewsCount" radius={[0, 8, 8, 0]}>
                {topProjects.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};

export default AnalyticsCharts;
