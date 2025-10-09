import { Outlet } from 'react-router-dom';
import PublicNav from './PublicNav';

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900">
      {/* Navbar */}
      <PublicNav />

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            
            {/* Company */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">Company</h3>
              <ul className="space-y-2">
                <li><a href="/about" className="text-slate-600 hover:text-primary dark:text-slate-300">About Us</a></li>
                <li><a href="/contact" className="text-slate-600 hover:text-primary dark:text-slate-300">Contact</a></li>
                <li><a href="/pricing" className="text-slate-600 hover:text-primary dark:text-slate-300">Pricing</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-600 hover:text-primary dark:text-slate-300">Blog</a></li>
                <li><a href="#" className="text-slate-600 hover:text-primary dark:text-slate-300">Documentation</a></li>
                <li><a href="#" className="text-slate-600 hover:text-primary dark:text-slate-300">Help Center</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-600 hover:text-primary dark:text-slate-300">Privacy Policy</a></li>
                <li><a href="#" className="text-slate-600 hover:text-primary dark:text-slate-300">Terms of Service</a></li>
                <li><a href="#" className="text-slate-600 hover:text-primary dark:text-slate-300">Cookie Policy</a></li>
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">Connect</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-600 hover:text-primary dark:text-slate-300">Twitter</a></li>
                <li><a href="#" className="text-slate-600 hover:text-primary dark:text-slate-300">LinkedIn</a></li>
                <li><a href="#" className="text-slate-600 hover:text-primary dark:text-slate-300">GitHub</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700 text-center text-slate-600 dark:text-slate-300">
            <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
