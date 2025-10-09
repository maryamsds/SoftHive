import { useState } from 'react';
import {
  FileDown,
  Search,
  Filter,
  Calendar,
  User,
  AlertTriangle,
  FileText,
  Info
} from 'lucide-react';

// Dummy Logs
const initialLogs = [
  {
    id: 1,
    timestamp: '2025-10-01T10:30:00',
    user: { name: 'John Doe', email: 'john@example.com' },
    action: 'created',
    entity: 'Campaign',
    details: 'Created new campaign "Summer Sale 2025"',
    ipAddress: '192.168.1.100'
  },
  {
    id: 2,
    timestamp: '2025-10-01T09:45:00',
    user: { name: 'Jane Smith', email: 'jane@example.com' },
    action: 'edited',
    entity: 'Creative',
    details: 'Modified creative assets for "Product Launch"',
    ipAddress: '192.168.1.101'
  },
  {
    id: 3,
    timestamp: '2025-10-01T09:15:00',
    user: { name: 'Admin User', email: 'admin@example.com' },
    action: 'billing',
    entity: 'Billing',
    details: 'Updated subscription to Enterprise plan',
    ipAddress: '192.168.1.102'
  },
  {
    id: 4,
    timestamp: '2025-10-01T08:30:00',
    user: { name: 'John Doe', email: 'john@example.com' },
    action: 'deleted',
    entity: 'Campaign',
    details: 'Deleted campaign "Spring Collection"',
    ipAddress: '192.168.1.100'
  },
  {
    id: 5,
    timestamp: '2025-10-01T08:00:00',
    user: { name: 'Security System', email: 'system@example.com' },
    action: 'login',
    entity: 'Account',
    details: 'New device login detected',
    ipAddress: '192.168.1.103'
  }
];

// Action colors
const actionColors = {
  created: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  edited: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  deleted: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  billing: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
  login: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
};

// 🔹 FilterBar
const FilterBar = ({ filters, onFilterChange, onApplyFilters }) => (
  <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md sticky top-0 z-10 space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Search logs..."
          value={filters.search}
          onChange={(e) => onFilterChange('search', e.target.value)}
          className="h-11 pl-10 w-full rounded-lg border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>

      {/* User */}
      <div className="relative">
        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
        <select
          value={filters.user}
          onChange={(e) => onFilterChange('user', e.target.value)}
          className="h-11 pl-10 w-full rounded-lg border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          <option value="">All Users</option>
          <option value="john@example.com">John Doe</option>
          <option value="jane@example.com">Jane Smith</option>
          <option value="admin@example.com">Admin User</option>
        </select>
      </div>

      {/* Action Type */}
      <div className="relative">
        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
        <select
          value={filters.action}
          onChange={(e) => onFilterChange('action', e.target.value)}
          className="h-11 pl-10 w-full rounded-lg border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          <option value="">All Actions</option>
          <option value="created">Created</option>
          <option value="edited">Edited</option>
          <option value="deleted">Deleted</option>
          <option value="billing">Billing Change</option>
          <option value="login">Login</option>
        </select>
      </div>

      {/* Date */}
      <div className="relative">
        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="date"
          value={filters.date}
          onChange={(e) => onFilterChange('date', e.target.value)}
          className="h-11 pl-10 w-full rounded-lg border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>
    </div>

    {/* Buttons */}
    <div className="flex justify-between items-center">
      <button
        onClick={onApplyFilters}
        className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
      >
        <Filter className="h-5 w-5" />
        Apply Filters
      </button>

      <div className="flex gap-3">
        <button
          onClick={() => console.log('Export CSV')}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <FileDown className="h-5 w-5" />
          CSV
        </button>
        <button
          onClick={() => console.log('Export PDF')}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <FileText className="h-5 w-5" />
          PDF
        </button>
      </div>
    </div>
  </div>
);

// 🔹 AuditTable (white bg removed)
const AuditTable = ({ logs }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      <thead className="bg-gray-50 dark:bg-gray-800">
        <tr>
          {[
            { label: 'Timestamp', icon: Calendar },
            { label: 'User', icon: User },
            { label: 'Action', icon: Filter },
            { label: 'Entity', icon: Info },
            { label: 'Details', icon: FileText },
            { label: 'IP Address', icon: AlertTriangle }
          ].map((col) => (
            <th
              key={col.label}
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
            >
              <div className="flex items-center gap-2">
                <col.icon className="h-4 w-4 text-gray-400" />
                {col.label}
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
        {logs.map((log, index) => (
          <tr
            key={log.id}
            className={`${
              index % 2 === 0 ? 'dark:bg-gray-800' : 'dark:bg-gray-750'
            } hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors`}
          >
            <td className="px-6 py-4 text-sm text-gray-900 dark:text-white whitespace-nowrap">
              {new Date(log.timestamp).toLocaleString()}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm font-medium text-gray-900 dark:text-white">{log.user.name}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{log.user.email}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span
                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${actionColors[log.action]}`}
              >
                {log.action.charAt(0).toUpperCase() + log.action.slice(1)}
              </span>
            </td>
            <td className="px-6 py-4 text-sm text-gray-900 dark:text-white whitespace-nowrap">
              {log.entity}
            </td>
            <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{log.details}</td>
            <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
              {log.ipAddress}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// 🔹 Pagination
const Pagination = ({ currentPage, totalPages, onPageChange }) => (
  <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 dark:border-gray-700">
    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
      <p className="text-sm text-gray-700 dark:text-gray-300">
        Page <span className="font-semibold">{currentPage}</span> of{' '}
        <span className="font-semibold">{totalPages}</span>
      </p>
      <div className="flex gap-2">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i + 1}
            onClick={() => onPageChange(i + 1)}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              currentPage === i + 1
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  </div>
);

// 🔹 Main Component
const AuditLogs = () => {
  const [logs] = useState(initialLogs);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({ search: '', user: '', action: '', date: '' });

  const handleFilterChange = (key, value) => setFilters((prev) => ({ ...prev, [key]: value }));
  const handleApplyFilters = () => console.log('Applying filters:', filters);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          Audit Logs
          <Info className="h-6 w-6 text-gray-400" />
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Track system activity and user actions for compliance and transparency.
        </p>
      </div>

      {/* Security Alert */}
      <div className="bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-400 p-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-yellow-500" />
          <p className="text-sm text-yellow-700 dark:text-yellow-400">
            Audit logs are immutable and cannot be edited for security purposes.
          </p>
        </div>
      </div>

      {/* Filters */}
      <FilterBar filters={filters} onFilterChange={handleFilterChange} onApplyFilters={handleApplyFilters} />

      {/* Table + Pagination */}
      <div className="shadow-md rounded-lg overflow-hidden">
        <AuditTable logs={logs} />
        <Pagination currentPage={currentPage} totalPages={5} onPageChange={setCurrentPage} />
      </div>
    </div>
  );
};

export default AuditLogs;
