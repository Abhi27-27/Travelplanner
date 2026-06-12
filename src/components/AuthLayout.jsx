import { Link } from 'react-router-dom';
import Logo from './Logo';

export default function AuthLayout({ children, title, subtitle, alternate }) {
  return (
    <div className="flex min-h-[calc(100vh-0px)]">
      <div className="relative hidden w-1/2 overflow-hidden bg-mesh lg:flex lg:flex-col lg:justify-between lg:p-12">
        <Logo variant="light" />

        <div className="max-w-md">
          <h2 className="font-display text-4xl leading-tight text-white">
            Every great journey begins with a single plan.
          </h2>
          <p className="mt-4 text-lg text-white/60">
            Voyago uses AI to craft personalized itineraries tailored to your budget, interests, and travel style.
          </p>

          <div className="mt-10 space-y-4">
            {[
              'Day-by-day itineraries in seconds',
              'Budget-aware recommendations',
              'Save and revisit your trips anytime',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 text-white/80">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-500/30">
                  <svg className="h-3.5 w-3.5 text-brand-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-sm text-white/30">
          Trusted by travelers worldwide
        </p>

        <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-brand-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-16 h-96 w-96 rounded-full bg-accent-500/10 blur-3xl" />
      </div>

      <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-16">
        <div className="mb-8 lg:hidden">
          <Logo />
        </div>

        <div className="mx-auto w-full max-w-md animate-fade-in">
          <h1 className="text-3xl font-bold tracking-tight text-stone-900">{title}</h1>
          {subtitle && <p className="mt-2 text-stone-500">{subtitle}</p>}

          <div className="mt-8">{children}</div>

          {alternate && (
            <p className="mt-8 text-center text-sm text-stone-500">
              {alternate.text}{' '}
              <Link to={alternate.link} className="font-semibold text-brand-600 hover:text-brand-700">
                {alternate.linkText}
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
