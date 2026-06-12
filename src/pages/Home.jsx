import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const features = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
    title: 'AI-Powered Planning',
    description: 'Our intelligent engine crafts day-by-day itineraries based on your unique preferences and travel style.',
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 3.182 0l.879.659z" />
      </svg>
    ),
    title: 'Budget Conscious',
    description: 'From backpacker adventures to luxury escapes — every recommendation fits your budget tier.',
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Interactive Maps',
    description: 'Visualize your destination instantly with embedded maps that update as you plan.',
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
      </svg>
    ),
    title: 'Save Your Trips',
    description: 'Store every itinerary to your personal dashboard and revisit your adventures anytime.',
  },
];

const steps = [
  { num: '01', title: 'Tell us your dream', desc: 'Enter your destination, trip length, budget, and interests.' },
  { num: '02', title: 'AI crafts your plan', desc: 'Get a detailed day-by-day itinerary with activities and timings.' },
  { num: '03', title: 'Explore & save', desc: 'View on the map, refine, and save to your personal trip library.' },
];

export default function Home() {
  const { user } = useAuth();
  const ctaLink = user ? '/planner' : '/signup';

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-mesh px-4 pb-24 pt-32 sm:px-6 lg:px-8 lg:pb-32 lg:pt-40">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-brand-500/20 blur-3xl" />
          <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-accent-500/15 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/70 backdrop-blur-sm animate-fade-in">
            <span className="h-2 w-2 rounded-full bg-brand-400 animate-pulse-soft" />
            AI travel planning, reimagined
          </div>

          <h1 className="font-display text-5xl leading-[1.1] text-white sm:text-6xl lg:text-7xl animate-slide-up">
            Your next adventure,{' '}
            <em className="text-gradient not-italic">perfectly planned</em>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/60 animate-slide-up stagger-1">
            Tell Voyago where you want to go and what you love. In seconds, receive a hyper-personalized
            itinerary crafted just for you.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row animate-slide-up stagger-2">
            <Link
              to={ctaLink}
              className="group inline-flex items-center gap-2 rounded-full bg-brand-500 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-brand-600/30 transition hover:bg-brand-400 hover:shadow-brand-500/40"
            >
              Start planning free
              <svg className="h-4 w-4 transition group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8 border-t border-white/10 pt-10 animate-slide-up stagger-3">
            {[
              { value: '50+', label: 'Destinations' },
              { value: '< 30s', label: 'Plan time' },
              { value: '100%', label: 'Personalized' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-bold text-white sm:text-3xl">{stat.value}</div>
                <div className="mt-1 text-xs text-white/40 sm:text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-600">Why Voyago</p>
            <h2 className="mt-3 font-display text-4xl text-stone-900">Everything you need to travel smarter</h2>
            <p className="mx-auto mt-4 max-w-2xl text-stone-500">
              From inspiration to itinerary, Voyago handles the planning so you can focus on the experience.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="card-hover group rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"
              >
                <div className="mb-4 inline-flex rounded-xl bg-brand-50 p-3 text-brand-600 transition group-hover:bg-brand-100">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-stone-900">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-stone-900 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-400">How it works</p>
            <h2 className="mt-3 font-display text-4xl text-white">Three steps to your dream trip</h2>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {steps.map((step) => (
              <div key={step.num} className="relative rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                <span className="font-display text-5xl text-brand-500/30">{step.num}</span>
                <h3 className="mt-4 text-xl font-bold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 p-10 text-center shadow-2xl shadow-brand-900/20 sm:p-16">
          <h2 className="font-display text-4xl text-white">Ready to explore the world?</h2>
          <p className="mx-auto mt-4 max-w-lg text-brand-100">
            Join Voyago today and turn your travel dreams into detailed, actionable plans in under a minute.
          </p>
          <Link
            to={ctaLink}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-brand-700 shadow-lg transition hover:bg-brand-50"
          >
            Create your first itinerary
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
