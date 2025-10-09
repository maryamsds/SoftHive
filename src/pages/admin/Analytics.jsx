import React, { useState } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart
} from 'recharts';

// Sample data for charts
const performanceData = [
  { date: 'Mon', reach: 2400, impressions: 4000, clicks: 1200, conversions: 400 },
  { date: 'Tue', reach: 1398, impressions: 3000, clicks: 900, conversions: 300 },
  { date: 'Wed', reach: 9800, impressions: 2000, clicks: 1600, conversions: 600 },
  { date: 'Thu', reach: 3908, impressions: 2780, clicks: 1400, conversions: 450 },
  { date: 'Fri', reach: 4800, impressions: 1890, clicks: 1300, conversions: 550 },
  { date: 'Sat', reach: 3800, impressions: 2390, clicks: 1100, conversions: 480 },
  { date: 'Sun', reach: 4300, impressions: 3490, clicks: 1500, conversions: 520 },
];

const instagramData = [
  { type: 'Reels', views: 12000, engagement: 2400 },
  { type: 'Stories', views: 8000, engagement: 1600 },
];

const roiData = [
  { month: 'Jan', spend: 1000, revenue: 2400 },
  { month: 'Feb', spend: 1500, revenue: 3600 },
  { month: 'Mar', spend: 2000, revenue: 5200 },
  { month: 'Apr', spend: 1800, revenue: 4800 },
  { month: 'May', spend: 2200, revenue: 6000 },
  { month: 'Jun', spend: 2500, revenue: 7200 },
];

const platformData = {
  facebook: { ctr: '4.2%', cpc: '$0.45', engagement: '8.5%' },
  instagram: { followers: '15.2K', engagement: '6.8%', reach: '45K' },
  tiktok: { watchRate: '65%', conversions: '2.4%', followers: '22K' },
  youtube: { views: '32K', retention: '45%', subscribers: '5.2K' },
};

const Analytics = () => {
  const [activeTab, setActiveTab] = useState('facebook');

  const StatCard = ({ title, value, icon, trend }) => (
    <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/40">{icon}</div>
        {trend && (
          <span
            className={`text-sm font-medium ${
              trend > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            }`}
          >
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </span>
        )}
      </div>
      <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">{title}</h3>
      <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
    </div>
  );

  const renderPlatformContent = () => {
    switch (activeTab) {
      case 'facebook':
        return (
          <div className="grid grid-cols-3 gap-4">
            {['ctr', 'cpc', 'engagement'].map((key) => (
              <div
                key={key}
                className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
              >
                <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100 capitalize">{key}</h4>
                <p className="mt-1 text-2xl font-bold text-blue-600">{platformData.facebook[key]}</p>
              </div>
            ))}
          </div>
        );
      case 'instagram':
        return (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={instagramData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="views" fill="#8B5CF6" name="Views" />
                <Bar dataKey="engagement" fill="#6366F1" name="Engagement" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );
      case 'tiktok':
        return (
          <div className="grid grid-cols-2 gap-4">
            {['watchRate', 'conversions'].map((key) => (
              <div
                key={key}
                className="p-4 rounded-xl bg-pink-50 dark:bg-pink-900/20 border border-pink-200 dark:border-pink-800"
              >
                <h4 className="text-sm font-medium text-pink-900 dark:text-pink-100 capitalize">{key}</h4>
                <p className="mt-1 text-2xl font-bold text-pink-600">{platformData.tiktok[key]}</p>
              </div>
            ))}
          </div>
        );
      case 'youtube':
        return (
          <div className="grid grid-cols-3 gap-4">
            {['views', 'retention', 'subscribers'].map((key) => (
              <div
                key={key}
                className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
              >
                <h4 className="text-sm font-medium text-red-900 dark:text-red-100 capitalize">{key}</h4>
                <p className="mt-1 text-2xl font-bold text-red-600">{platformData.youtube[key]}</p>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-6 space-y-6">
      {/* Overview KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Reach" value="125.4K" trend={12} icon={<span>🌐</span>} />
        <StatCard title="Impressions" value="298.2K" trend={8} icon={<span>👁️</span>} />
        <StatCard title="Clicks" value="45.2K" trend={-3} icon={<span>🖱️</span>} />
        <StatCard title="Conversions" value="12.8K" trend={15} icon={<span>✅</span>} />
      </div>

      {/* Platform Tabs */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg">
        <div className="flex space-x-2 mb-6 overflow-x-auto">
          {['facebook', 'instagram', 'tiktok', 'youtube'].map((platform) => (
            <button
              key={platform}
              onClick={() => setActiveTab(platform)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === platform
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {platform.charAt(0).toUpperCase() + platform.slice(1)}
            </button>
          ))}
        </div>
        {renderPlatformContent()}
      </div>

      {/* Performance Chart */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Performance Over Time
          </h2>
          <div className="flex space-x-3">
            {['CSV', 'Excel', 'PDF'].map((format) => (
              <button
                key={format}
                className="px-3 py-2 bg-white dark:bg-slate-700 rounded-lg shadow hover:shadow-md transition-all duration-200 flex items-center space-x-2 text-sm font-medium text-slate-700 dark:text-slate-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>{format}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '0.5rem', color: '#f8fafc' }} />
              <Legend />
              <Line type="monotone" dataKey="reach" stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey="impressions" stroke="#8b5cf6" strokeWidth={2} />
              <Line type="monotone" dataKey="clicks" stroke="#10b981" strokeWidth={2} />
              <Line type="monotone" dataKey="conversions" stroke="#f59e0b" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ROI Chart */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">ROI Analysis</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={roiData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '0.5rem', color: '#f8fafc' }} />
              <Legend />
              <Bar dataKey="spend" fill="#3b82f6" name="Spend" />
              <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} name="Revenue" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
