import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Logo from './Logo';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/planner', label: 'Plan Trip' },
  { to: '/my-trips', label: 'My Trips', auth: true },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  const close = () => setIsOpen(false);

  const linkClass = (path) =>
    `relative px-3 py-2 text-sm font-medium transition-colors rounded-lg ${
      location.pathname === path
        ? 'text-brand-700 bg-brand-50'
        : 'text-stone-600 hover:text-brand-700 hover:bg-stone-50'
    }`;

  return (
    <header className={`sticky top-0 z-50 transition-all ${
      isHome ? 'absolute inset-x-0 bg-transparent' : 'glass border-b border-stone-200/60 shadow-sm'
    }`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Logo variant={isHome ? 'light' : 'default'} />

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            if (link.auth && !user) return null;
            return (
              <Link key={link.to} to={link.to} className={linkClass(link.to)}>
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <div className="flex items-center gap-2 rounded-full bg-stone-100 py-1.5 pl-1.5 pr-4">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
                  {user.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <span className="text-sm font-medium text-stone-700">{user.name}</span>
              </div>
              <button
                onClick={logout}
                className="text-sm font-medium text-stone-500 transition hover:text-red-600"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={`text-sm font-semibold transition ${
                  isHome ? 'text-white/80 hover:text-white' : 'text-stone-600 hover:text-brand-700'
                }`}
              >
                Sign in
              </Link>
              <Link
                to="/signup"
                className="rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition hover:bg-brand-700 hover:shadow-brand-700/30"
              >
                Get started
              </Link>
            </>
          )}
        </div>

        <button
          className={`rounded-lg p-2 md:hidden ${isHome ? 'text-white' : 'text-stone-700'}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {isOpen && (
        <div className="glass border-t border-stone-200/60 px-4 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => {
              if (link.auth && !user) return null;
              return (
                <Link key={link.to} to={link.to} onClick={close} className={linkClass(link.to)}>
                  {link.label}
                </Link>
              );
            })}
          </div>
          <div className="mt-4 flex flex-col gap-3 border-t border-stone-200 pt-4">
            {user ? (
              <>
                <span className="text-sm text-stone-500">Signed in as <strong>{user.name}</strong></span>
                <button onClick={() => { logout(); close(); }} className="text-left text-sm font-medium text-red-600">
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={close} className="text-sm font-semibold text-brand-700">Sign in</Link>
                <Link
                  to="/signup"
                  onClick={close}
                  className="rounded-xl bg-brand-600 py-3 text-center text-sm font-semibold text-white"
                >
                  Get started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
