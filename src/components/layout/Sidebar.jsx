import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  ScrollText,
  BarChart,
  Headphones,
  Settings,
  Megaphone,
  Image,
  Puzzle,
  Package,
  Layout,
  Bell,
  History,
  FileSpreadsheet,
  UserPlus,
  Bot,
  Menu,
  X,
} from 'lucide-react';

const menuCategories = [
  {
    category: 'Dashboard',
    items: [{ icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' }],
  },
  {
    category: 'Getting Started',
    items: [{ icon: UserPlus, label: 'Onboarding', path: '/admin/onboarding' }],
  },
  {
    category: 'Main Features',
    items: [
      { icon: Bell, label: 'Notifications', path: '/admin/notifications' },
      { icon: Bot, label: 'AI Assistant', path: '/admin/ai-assistant' },
      { icon: Megaphone, label: 'Campaigns', path: '/admin/campaigns' },
      { icon: Image, label: 'Picture Generate', path: '/admin/picture-generate' },
      { icon: Image, label: 'Media Library', path: '/admin/media-library' },
      { icon: Puzzle, label: 'Integrations', path: '/admin/integrations' },
    ],
  },
  {
    category: 'Management',
    items: [
      { icon: Users, label: 'Users', path: '/admin/users' },
      { icon: ScrollText, label: 'Plans', path: '/admin/plans' },
      { icon: Package, label: 'Manage Plans', path: '/admin/manage-plans' },
    ],
  },
  {
    category: 'Analytics & Reports',
    items: [
      { icon: BarChart, label: 'Analytics', path: '/admin/analytics' },
      { icon: FileSpreadsheet, label: 'Reports', path: '/admin/reports' },
      { icon: History, label: 'Audit Logs', path: '/admin/audit-logs' },
      { icon: Layout, label: 'Roadmap', path: '/admin/roadmap' },
    ],
  },
  {
    category: 'Support & Settings',
    items: [
      { icon: Headphones, label: 'Support', path: '/admin/support' },
      { icon: Settings, label: 'Settings', path: '/admin/settings' },
    ],
  },
];

export function Sidebar({ isCollapsed, onToggle }) {
  const location = useLocation();

  return (
    <aside
      className={`fixed left-0 top-0 bottom-0 bg-slate-800 dark:bg-[#0F172A] text-white transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      } z-[60] shadow-xl flex flex-col`}
    >
      {/* ✅ Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-700">
        {!isCollapsed && <h1 className="text-xl font-bold">Admin</h1>}

        {/* ✅ Collapse toggle button */}
        <button
          onClick={onToggle}
          className="p-1.5 rounded-lg hover:bg-slate-700 transition-colors"
        >
          {isCollapsed ? <Menu size={22} /> : <X size={22} />}
        </button>
      </div>

      <nav className="flex-1 p-2 space-y-4 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
        {menuCategories.map((category, index) => (
          <div key={index} className="space-y-1">
            {!isCollapsed && (
              <h3 className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {category.category}
              </h3>
            )}
            {category.items.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 p-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <Icon size={20} />
                  {!isCollapsed && <span>{item.label}</span>}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>
    </aside>
  );
}