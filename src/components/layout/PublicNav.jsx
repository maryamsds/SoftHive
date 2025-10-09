import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from '../ThemeToggle';
import { Menu, X } from 'lucide-react';

export default function PublicNav() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
    { path: '/pricing', label: 'Pricing' },
  ];

  return (
    <nav className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-xl font-semibold text-primary hover:opacity-90 transition"
          >
            Soft Hive
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition ${
                  isActive(link.path)
                    ? 'text-primary'
                    : 'text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons & Theme Toggle */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />

            {/* Sign In */}
            <Link
              to="/login"
              className="text-sm font-medium text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-primary transition"
            >
              Sign In
            </Link>

            {/* Sign Up */}
            <Link
              to="/signup"
              className="text-sm font-medium px-4 py-2 rounded-lg 
              bg-primary text-silver shadow-sm hover:bg-primary/90 
              dark:bg-primary dark:hover:bg-primary/80 transition"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-600 dark:text-slate-300 focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-2 space-y-2 pb-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block text-sm font-medium transition ${
                  isActive(link.path)
                    ? 'text-primary'
                    : 'text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="flex items-center space-x-4 mt-2">
              <ThemeToggle />

              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm font-medium text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-primary transition"
              >
                Sign In
              </Link>

              <Link
                to="/signup"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm font-medium px-4 py-2 rounded-lg 
                bg-primary text-silver shadow-sm hover:bg-primary/90 
                dark:bg-primary dark:hover:bg-primary/80 transition"
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
