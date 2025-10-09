import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { 
  BarChart3, Calendar, BarChart2, PieChart, Plus, TrendingUp, Lightbulb 
} from 'lucide-react';

// Sample data - replace with real data
const engagementData = [
  { date: 'Mon', likes: 4000, shares: 2400, clicks: 1800 },
  { date: 'Tue', likes: 3000, shares: 1398, clicks: 2210 },
  { date: 'Wed', likes: 2000, shares: 9800, clicks: 2290 },
  { date: 'Thu', likes: 2780, shares: 3908, clicks: 2000 },
  { date: 'Fri', likes: 1890, shares: 4800, clicks: 2181 },
  { date: 'Sat', likes: 2390, shares: 3800, clicks: 2500 },
  { date: 'Sun', likes: 3490, shares: 4300, clicks: 2100 },
];

const Dashboard = () => {
  const navigate = useNavigate(); // ✅ React Router navigation hook

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-4">
      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Campaigns Card */}
        <div className="p-6 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:bg-gradient-to-br hover:from-white/90 hover:to-blue-50/90 dark:hover:from-slate-800/90 dark:hover:to-slate-700/90">
          <div className="flex items-center justify-between">
            <h3 className="text-slate-600 dark:text-slate-300 font-medium font-inter">Total Campaigns</h3>
            <span className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <BarChart3 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </span>
          </div>
          <p className="mt-4 text-3xl font-bold text-slate-800 dark:text-white">24</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">18 Active • 6 Drafts</p>
        </div>

        {/* Posts Scheduled Card */}
        <div className="p-6 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:bg-gradient-to-br hover:from-white/90 hover:to-purple-50/90 dark:hover:from-slate-800/90 dark:hover:to-slate-700/90">
          <div className="flex items-center justify-between">
            <h3 className="text-slate-600 dark:text-slate-300 font-medium font-inter">Posts Scheduled</h3>
            <span className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Calendar className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </span>
          </div>
          <p className="mt-4 text-3xl font-bold text-slate-800 dark:text-white">12</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Next 7 days</p>
        </div>

        {/* Average CTR Card */}
        <div className="p-6 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:bg-gradient-to-br hover:from-white/90 hover:to-green-50/90 dark:hover:from-slate-800/90 dark:hover:to-slate-700/90">
          <div className="flex items-center justify-between">
            <h3 className="text-slate-600 dark:text-slate-300 font-medium font-inter">Avg CTR</h3>
            <span className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <BarChart2 className="h-6 w-6 text-green-600 dark:text-green-400" />
            </span>
          </div>
          <p className="mt-4 text-3xl font-bold text-slate-800 dark:text-white">4.8%</p>
          <p className="text-sm text-green-500 dark:text-green-400 mt-1">↑ 0.5% vs last week</p>
        </div>

        {/* ROI Card */}
        <div className="p-6 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:bg-gradient-to-br hover:from-white/90 hover:to-yellow-50/90 dark:hover:from-slate-800/90 dark:hover:to-slate-700/90">
          <div className="flex items-center justify-between">
            <h3 className="text-slate-600 dark:text-slate-300 font-medium font-inter">ROI (30 days)</h3>
            <span className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
              <PieChart className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </span>
          </div>
          <p className="mt-4 text-3xl font-bold text-slate-800 dark:text-white">285%</p>
          <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-1">Target: 250%</p>
        </div>
      </div>

      {/* ✅ Quick Actions - now functional */}
      <div className="mt-10 flex justify-end space-x-4">
        <button
          onClick={() => navigate('/admin/campaigns')}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <Plus className="h-5 w-5 mr-2" />
          New Campaign
        </button>

        <button
          onClick={() => navigate('/admin/analytics')}
          className="flex items-center px-4 py-2 bg-slate-700 text-white rounded-lg shadow-lg hover:bg-slate-800 transition-colors duration-200"
        >
          <TrendingUp className="h-5 w-5 mr-2" />
          View Analytics
        </button>
      </div>

      <br />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Engagement Graph */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border border-slate-200/50 dark:border-slate-700/50 shadow-xl">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-6">Engagement Trends</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b',
                    border: 'none',
                    borderRadius: '0.5rem',
                    color: '#f8fafc'
                  }}
                />
                <Line type="monotone" dataKey="likes" stroke="#2563eb" strokeWidth={2} />
                <Line type="monotone" dataKey="shares" stroke="#7c3aed" strokeWidth={2} />
                <Line type="monotone" dataKey="clicks" stroke="#059669" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Top Performing Campaign */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-lg border border-blue-200/50 dark:border-blue-700/50 shadow-xl">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-4">Top Campaign</h2>
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-blue-600 dark:text-blue-400">Summer Collection Launch</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-300">Engagement Rate</span>
                  <span className="font-medium text-slate-800 dark:text-white">8.5%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-300">Conversion Rate</span>
                  <span className="font-medium text-slate-800 dark:text-white">3.2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-300">ROI</span>
                  <span className="font-medium text-green-600 dark:text-green-400">320%</span>
                </div>
              </div>
            </div>
          </div>

          {/* AI Suggestions */}
          <div className="p-6 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border border-slate-200/50 dark:border-slate-700/50 shadow-xl">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-4 flex items-center">
              <Lightbulb className="h-6 w-6 mr-2 text-purple-500" />
              AI Insights
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-purple-500 mr-3"></span>
                <p className="text-slate-600 dark:text-slate-300">Best time to post is 8 PM - Engagement peaks during evening hours</p>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-purple-500 mr-3"></span>
                <p className="text-slate-600 dark:text-slate-300">Try carousel ads for Product X - Similar products saw 2.5x higher CTR</p>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-purple-500 mr-3"></span>
                <p className="text-slate-600 dark:text-slate-300">Video content opportunity - Your audience engages 40% more with video posts</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
