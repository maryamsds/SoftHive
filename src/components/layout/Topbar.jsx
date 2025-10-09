import { Bell, Search, User, Settings, LogOut } from 'lucide-react';
import { ThemeToggle } from '../ThemeToggle';
import { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../authcontext/authContext'; // ✅ added

export function Topbar({ onSearch, isSidebarCollapsed }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { logout } = useAuth(); // ✅ from context

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ✅ use context logout so token & user both clear and redirect happens
  const handleLogout = async () => {
    await logout();
  };

  return (
    <div
      className={`fixed top-0 right-0 h-16 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-6 z-40 transition-all duration-300 ease-in-out`}
      style={{
        left: isSidebarCollapsed ? '5rem' : '16rem',
        width: isSidebarCollapsed ? 'calc(100% - 5rem)' : 'calc(100% - 16rem)',
      }}
    >
      <div className="relative w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => onSearch?.(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:text-white"
        />
      </div>

      <div className="flex items-center space-x-4" ref={dropdownRef}>
        <ThemeToggle />
        <button className="relative p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700">
          <Bell className="h-5 w-5 text-slate-600 dark:text-slate-400" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-yellow-400 rounded-full"></span>
        </button>
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
              <User size={16} />
            </div>
            <span className="text-sm font-medium dark:text-white mr-2">Admin</span>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700 py-1 z-50">
              <Link
                to="/admin/profile-settings"
                className="w-full flex items-center px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <Settings size={16} className="mr-2" />
                User Settings
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <LogOut size={16} className="mr-2" />
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
