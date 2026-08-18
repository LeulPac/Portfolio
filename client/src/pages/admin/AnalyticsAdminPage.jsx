import React, { useState, useEffect } from 'react';
import { FaChartLine, FaDesktop, FaGlobe, FaMobileAlt, FaDownload, FaEye } from 'react-icons/fa';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import AnalyticsCharts from '../../components/admin/AnalyticsCharts';
import VisitorLogsTable from '../../components/admin/VisitorLogsTable';
import api from '../../api/axios';

const AnalyticsAdminPage = () => {
  const [overview, setOverview] = useState(null);
  const [visitorLogs, setVisitorLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const [ovRes, logRes] = await Promise.all([
          api.get('/analytics/overview'),
          api.get('/analytics/visitor-logs')
        ]);
        if (ovRes.data.success) setOverview(ovRes.data);
        if (logRes.data.success) setVisitorLogs(logRes.data.logs || []);
      } catch (err) {} finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0 w-full">
        <AdminHeader title="Real-Time Analytics Dashboard" />
        <main className="p-4 md:p-6 w-full max-w-full overflow-x-hidden space-y-6 md:space-y-8">
          
          <AnalyticsCharts
            dailyData={overview?.charts?.dailyTraffic || []}
            topProjects={overview?.topProjects || []}
          />

          {/* Distribution Breakdowns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Devices */}
            <div className="glass-card rounded-3xl p-6 space-y-3">
              <h4 className="text-xs font-mono font-bold text-slate-300 uppercase">Device Distribution</h4>
              <div className="space-y-2">
                {(overview?.charts?.devices || [{ name: 'Desktop', count: 85 }, { name: 'Mobile', count: 15 }]).map((d, i) => (
                  <div key={i} className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">{d.name}</span>
                    <span className="font-mono text-cyan-400 font-bold">{d.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Browsers */}
            <div className="glass-card rounded-3xl p-6 space-y-3">
              <h4 className="text-xs font-mono font-bold text-slate-300 uppercase">Browser Distribution</h4>
              <div className="space-y-2">
                {(overview?.charts?.browsers || [{ name: 'Chrome', count: 68 }, { name: 'Safari', count: 22 }, { name: 'Firefox', count: 10 }]).map((b, i) => (
                  <div key={i} className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">{b.name}</span>
                    <span className="font-mono text-indigo-400 font-bold">{b.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Referrers */}
            <div className="glass-card rounded-3xl p-6 space-y-3">
              <h4 className="text-xs font-mono font-bold text-slate-300 uppercase">Traffic Sources</h4>
              <div className="space-y-2">
                {(overview?.charts?.referrers || [{ name: 'Direct', count: 54 }, { name: 'GitHub', count: 28 }, { name: 'LinkedIn', count: 18 }]).map((r, i) => (
                  <div key={i} className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">{r.name}</span>
                    <span className="font-mono text-emerald-400 font-bold">{r.count}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          <VisitorLogsTable logs={visitorLogs} />

        </main>
      </div>
    </div>
  );
};

export default AnalyticsAdminPage;
