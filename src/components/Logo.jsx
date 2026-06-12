import { Link } from 'react-router-dom';

export default function Logo({ variant = 'default', className = '' }) {
  const isLight = variant === 'light';

  return (
    <Link to="/" className={`inline-flex items-center gap-2.5 group ${className}`}>
      <div className={`relative flex h-9 w-9 items-center justify-center rounded-xl shadow-sm transition-transform group-hover:scale-105 ${
        isLight ? 'bg-white/10 ring-1 ring-white/20' : 'bg-brand-600 shadow-brand-600/20'
      }`}>
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
          <path
            d="M12 2L14.09 8.26L20 10L14.09 11.74L12 18L9.91 11.74L4 10L9.91 8.26L12 2Z"
            fill={isLight ? 'white' : 'white'}
            opacity="0.95"
          />
          <circle cx="12" cy="10" r="1.5" fill={isLight ? '#fb923c' : '#f97316'} />
        </svg>
      </div>
      <div className="flex flex-col leading-none">
        <span className={`text-lg font-bold tracking-tight ${isLight ? 'text-white' : 'text-stone-900'}`}>
          Voyago
        </span>
        <span className={`text-[10px] font-medium uppercase tracking-widest ${
          isLight ? 'text-white/50' : 'text-stone-400'
        }`}>
          Travel AI
        </span>
      </div>
    </Link>
  );
}
