  // app.jsx
  import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
  import { ThemeProvider } from 'next-themes';
  import { AuthProvider, useAuth } from './authcontext/authContext';  // ✅ Import both

  // Layouts
  import { AdminLayout } from './components/layout/AdminLayout';
  import PublicLayout from './components/layout/PublicLayout';

  // Auth Pages
  import Login from './pages/auth/Login';
  import Signup from './pages/auth/Signup';
  import ForgotPassword from './pages/auth/ForgotPassword';
  import ResetPassword from './pages/auth/ResetPassword';
  import VerifyEmail from './pages/auth/VerifyEmail';

  // Onboarding
  import Welcome from './pages/onboarding/Welcome';
  import Setup from './pages/onboarding/Setup';
  import Preferences from './pages/onboarding/Preferences';

  // Admin Pages
  import Dashboard from './pages/admin/Dashboard';
  import Users from './pages/admin/Users';
  import Plans from './pages/admin/Plans';
  import Analytics from './pages/admin/Analytics';
  import Supports from './pages/admin/Supports';
  import ProfileSettings from './pages/admin/ProfileSettings';
  import Campaigns from './pages/admin/Campaigns';
  import MediaLibrary from './pages/admin/MediaLibrary';
  import Integrations from './pages/admin/Integrations';
  import ManagePlans from './pages/admin/ManagePlans';
  import Reports from './pages/admin/Reports';
  import AuditLogs from './pages/admin/AuditLogs';
  import Onboarding from './pages/admin/Onboarding';
  import Notifications from './pages/admin/Notifications';
  import PictureGenerate from './pages/admin/PictureGenerate';
  import Roadmap from './pages/admin/Roadmap';
  import AIAssistant from './pages/admin/AIAssistant';
  import AppSettings from './pages/admin/Settings';

  // Public Pages
  import Home from './pages/public/Home';
  import About from './pages/public/About';
  import Contact from './pages/public/Contact';
  import Billing from './pages/public/Billing';

  // ✅ ProtectedRoute helper
  function ProtectedRoute({ children }) {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
          <p className="text-slate-700 dark:text-slate-300">Loading...</p>
        </div>
      );
    }

    return isAuthenticated ? children : <Navigate to="/login" replace />;
  }

  // ✅ AuthRedirectRoute helper (for login/signup)
  function AuthRedirectRoute({ children }) {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <Navigate to="/admin/dashboard" replace /> : children;
  }

  function AppRoutes() {
    return (
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pricing" element={<Billing />} />
        </Route>

        {/* Auth Routes */}
        <Route path="/login" element={<AuthRedirectRoute><Login /></AuthRedirectRoute>} />
        <Route path="/signup" element={<AuthRedirectRoute><Signup /></AuthRedirectRoute>} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />

        {/* Onboarding Routes */}
        <Route path="/onboarding" element={<Outlet />}>
          <Route path="welcome" element={<Welcome />} />
          <Route path="setup" element={<Setup />} />
          <Route path="preferences" element={<Preferences />} />
          <Route index element={<Navigate to="welcome" replace />} />
        </Route>

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="onboarding" element={<Onboarding />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="ai-assistant" element={<AIAssistant />} />
          <Route path="campaigns" element={<Campaigns />} />
          <Route path="picture-generate" element={<PictureGenerate />} />
          <Route path="media-library" element={<MediaLibrary />} />
          <Route path="integrations" element={<Integrations />} />
          <Route path="users" element={<Users />} />
          <Route path="plans" element={<Plans />} />
          <Route path="manage-plans" element={<ManagePlans />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="reports" element={<Reports />} />
          <Route path="audit-logs" element={<AuditLogs />} />
          <Route path="roadmap" element={<Roadmap />} />
          <Route path="support" element={<Supports />} />
          <Route path="settings" element={<AppSettings />} />
          <Route path="profile-settings" element={<ProfileSettings />} />
          <Route index element={<Navigate to="dashboard" replace />} />
        </Route>

        {/* 404 Page */}
        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-slate-900 dark:text-white">404</h1>
                <p className="mt-2 text-slate-600 dark:text-slate-400">Page not found</p>
                <a
                  href="/"
                  className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Go to Home
                </a>
              </div>
            </div>
          }
        />
      </Routes>
    );
  }

  export default function App() {
    return (
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Router>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </Router>
      </ThemeProvider>
    );
  }
