export function DashboardCard({ title, value, icon: Icon, trend }) {
  const trendColor = trend >= 0 ? 'text-green-500' : 'text-red-500';

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-slate-200 dark:border-slate-700">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{title}</p>
          <h3 className="text-2xl font-semibold mt-1 text-slate-900 dark:text-white">{value}</h3>
        </div>
        <div className="w-12 h-12 rounded-lg bg-indigo-50 dark:bg-indigo-900/50 flex items-center justify-center">
          <Icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
        </div>
      </div>
      {trend !== undefined && (
        <div className="mt-4 flex items-center">
          <span className={`text-sm font-medium ${trendColor}`}>
            {trend >= 0 ? '+' : ''}{trend}%
          </span>
          <span className="ml-2 text-sm text-slate-600 dark:text-slate-400">vs last month</span>
        </div>
      )}
    </div>
  );
}