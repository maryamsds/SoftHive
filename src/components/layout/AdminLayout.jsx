import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

export function AdminLayout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 relative transition-all duration-300">
      {/* ✅ Sidebar with collapse control */}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* ✅ Topbar that adjusts width automatically */}
      <Topbar isSidebarCollapsed={isSidebarCollapsed} />

      {/* ✅ Main content adjusts according to sidebar - full width when collapsed */}
      <main
        className={`pt-16 transition-all duration-300 ${
          isSidebarCollapsed
            ? 'pl-20 w-[calc(100%-5rem)]'
            : 'pl-64 w-[calc(100%-2rem)]'
        }`}
      >
        <Outlet />
      </main>
    </div>
  );
}
