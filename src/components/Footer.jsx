import { Link } from 'react-router-dom';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <Logo />
          <div className="flex gap-8 text-sm text-stone-500">
            <Link to="/" className="transition hover:text-brand-700">Home</Link>
            <Link to="/planner" className="transition hover:text-brand-700">Plan Trip</Link>
            <Link to="/my-trips" className="transition hover:text-brand-700">My Trips</Link>
          </div>
        </div>
        <div className="mt-8 border-t border-stone-100 pt-8 text-center text-sm text-stone-400">
          <p>&copy; {new Date().getFullYear()} Voyago. Crafted for explorers everywhere.</p>
        </div>
      </div>
    </footer>
  );
}
