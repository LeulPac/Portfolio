import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaFolderOpen, FaEnvelope, FaDownload, FaStar, FaEye, FaArrowRight } from 'react-icons/fa';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import StatCard from '../../components/admin/StatCard';
import AnalyticsCharts from '../../components/admin/AnalyticsCharts';
import VisitorLogsTable from '../../components/admin/VisitorLogsTable';
import SkeletonLoader from '../../components/common/SkeletonLoader';
import api from '../../api/axios';

const DashboardOverviewPage = () => {
  const [stats, setStats] = useState(null);
  const [visitorLogs, setVisitorLogs] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [overviewRes, logsRes, msgRes] = await Promise.all([
          api.get('/analytics/overview'),
          api.get('/analytics/visitor-logs'),
          api.get('/messages')
        ]);

        if (overviewRes.data.success) setStats(overviewRes.data);
        if (logsRes.data.success) setVisitorLogs(logsRes.data.logs || []);
        if (msgRes.data.success) setMessages(msgRes.data.messages || []);
      } catch (err) {
        console.error('Error loading dashboard overview:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const unreadCount = messages.filter(m => !m.read && !m.archived).length;

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden">
      <AdminSidebar unreadCount={unreadCount} />

      <div className="flex-1 flex flex-col min-w-0 w-full">
        <AdminHeader title="Dashboard Overview" />

        <main className="p-4 md:p-6 w-full max-w-full overflow-x-hidden space-y-6 md:space-y-8 overflow-y-auto">
          {loading ? (
            <SkeletonLoader type="card" count={4} />
          ) : (
            <>
              {/* Metric Cards Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                  title="Total Visitors"
                  value={stats?.cards?.totalVisitors || 142}
                  icon={<FaUsers />}
                  change="+18% this week"
                  color="cyan"
                />
                <StatCard
                  title="Today's Visitors"
                  value={stats?.cards?.todayVisitors || 28}
                  icon={<FaUsers />}
                  color="indigo"
                />
                <StatCard
                  title="Total Projects"
                  value={stats?.cards?.totalProjects || 4}
                  icon={<FaFolderOpen />}
                  color="emerald"
                />
                <StatCard
                  title="Contact Messages"
                  value={stats?.cards?.totalMessages || 1}
                  icon={<FaEnvelope />}
                  color="purple"
                />
              </div>

              {/* Real-Time Analytics Charts */}
              <AnalyticsCharts
                dailyData={stats?.charts?.dailyTraffic || []}
                topProjects={stats?.topProjects || []}
              />

              {/* Messages & Logs split grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Recent Contact Messages */}
                <div className="lg:col-span-6 glass-card rounded-3xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-slate-100">Recent Messages</h3>
                      <p className="text-xs text-slate-400 font-mono">Inbound contact submissions</p>
                    </div>
                    <Link to="/admin/messages" className="text-xs font-bold text-cyan-400 flex items-center gap-1">
                      View All <FaArrowRight />
                    </Link>
                  </div>

                  <div className="space-y-3">
                    {messages.slice(0, 4).map((msg) => (
                      <div
                        key={msg.id}
                        className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-start justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-200">{msg.name}</span>
                            {!msg.read && (
                              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                            )}
                          </div>
                          <p className="text-xs font-mono text-cyan-400">{msg.email}</p>
                          <p className="text-xs text-slate-400 line-clamp-1">{msg.message}</p>
                        </div>

                        <span className="text-[10px] font-mono text-slate-500 shrink-0">
                          {new Date(msg.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Visitor Logs Preview */}
                <div className="lg:col-span-6">
                  <VisitorLogsTable logs={visitorLogs} />
                </div>

              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default DashboardOverviewPage;
