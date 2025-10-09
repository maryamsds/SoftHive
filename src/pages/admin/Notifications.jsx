import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Bell,
  AlertTriangle,
  XCircle,
  CheckCircle,
  Clock,
  AlertOctagon,
  BarChart2,
  RefreshCw,
  X,
  ChevronRight,
} from 'lucide-react';

const initialNotifications = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  type: ['system', 'campaign', 'performance'][i % 3],
  priority: ['critical', 'error', 'success', 'warning'][i % 4],
  title: `Notification ${i + 1}`,
  description: `This is a sample notification number ${i + 1}.`,
  timestamp: `2025-10-${(i % 5) + 1}T0${i % 10}:00:00`,
  action: {
    type: i % 2 === 0 ? 'link' : 'button',
    label: i % 2 === 0 ? 'View Details' : 'Take Action',
    to: '/admin/analytics',
    onClick: () => console.log('Action clicked'),
  },
}));

const NotificationTable = ({ notifications, onDismiss, onSnooze, currentPage, itemsPerPage }) => {
  const startIndex = (currentPage - 1) * itemsPerPage;

  const getPriorityStyles = (priority) => {
    switch (priority) {
      case 'critical':
        return 'text-red-600 dark:text-red-400';
      case 'warning':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'error':
        return 'text-red-600 dark:text-red-400';
      case 'success':
        return 'text-green-600 dark:text-green-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getIcon = (type, priority) => {
    switch (type) {
      case 'system':
        return priority === 'critical' ? AlertOctagon : Bell;
      case 'campaign':
        return priority === 'error' ? XCircle : AlertTriangle;
      case 'performance':
        return priority === 'success' ? CheckCircle : BarChart2;
      default:
        return Bell;
    }
  };

  return (
    <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-xl shadow-md">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-100 dark:bg-gray-700">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
              S.No
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
              Type
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
              Title
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
              Description
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
              Priority
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
              Time
            </th>
            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-300">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {notifications.map((notification, index) => {
            const Icon = getIcon(notification.type, notification.priority);
            return (
              <tr
                key={notification.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700/40 transition-colors"
              >
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                  {startIndex + index + 1}
                </td>
                <td className="px-4 py-3 text-sm flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <Icon className={`w-4 h-4 ${getPriorityStyles(notification.priority)}`} />
                  {notification.type}
                </td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                  {notification.title}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                  {notification.description}
                </td>
                <td className={`px-4 py-3 text-sm font-medium ${getPriorityStyles(notification.priority)}`}>
                  {notification.priority.charAt(0).toUpperCase() + notification.priority.slice(1)}
                </td>
                <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                  {new Date(notification.timestamp).toLocaleString()}
                </td>
                <td className="px-4 py-3 text-sm text-right">
                  <div className="flex justify-center items-center gap-3">
                    {notification.action.type === 'link' ? (
                      <Link
                        to={notification.action.to}
                        className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
                      >
                        {notification.action.label}
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    ) : (
                      <button
                        onClick={notification.action.onClick}
                        className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
                      >
                        {notification.action.label}
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => onSnooze(notification.id)}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      title="Snooze"
                    >
                      <Clock className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDismiss(notification.id)}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      title="Dismiss"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const Notifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filters = [
    { id: 'all', label: 'All Alerts' },
    { id: 'system', label: 'System' },
    { id: 'campaign', label: 'Campaign' },
    { id: 'performance', label: 'Performance' },
  ];

  const filteredNotifications = notifications.filter(
    (notification) => activeFilter === 'all' || notification.type === activeFilter
  );

  const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage);
  const paginatedNotifications = filteredNotifications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDismiss = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const handleSnooze = (id) => {
    console.log('Snoozing notification:', id);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Notifications Center</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">All your alerts in one place.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => {
              setActiveFilter(filter.id);
              setCurrentPage(1);
            }}
            className={`px-4 py-2 rounded-full ${
              activeFilter === filter.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            } transition-colors`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <NotificationTable
        notifications={paginatedNotifications}
        onDismiss={handleDismiss}
        onSnooze={handleSnooze}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
      />

      <div className="flex justify-between items-center pt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-sm font-medium disabled:opacity-50"
        >
          Previous
        </button>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Page {currentPage} of {totalPages}
        </p>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-sm font-medium disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Notifications;
