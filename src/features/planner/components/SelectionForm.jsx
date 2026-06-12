import { useState } from 'react';

const budgetOptions = [
  { value: 'Backpacker', label: 'Backpacker', desc: 'Budget-friendly' },
  { value: 'Medium', label: 'Comfort', desc: 'Balanced' },
  { value: 'Luxury', label: 'Luxury', desc: 'Premium' },
];

export default function SelectionForm({ onGenerate, isLoading }) {
  const [tripData, setTripData] = useState({
    destination: '',
    days: 3,
    budget: 'Medium',
    interests: '',
  });

  const handleChange = (e) => {
    setTripData({ ...tripData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate(tripData);
  };

  return (
    <div className="sticky top-24 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-2.25-1.5-4.5-3.75-4.5S9.53 13.872 9.53 16.122z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12m0 0l2.25 2.25M16.5 12l2.25-2.25M16.5 12l-2.25 2.25M3.75 19.5h16.5" />
          </svg>
        </div>
        <div>
          <h2 className="text-lg font-bold text-stone-900">Design your trip</h2>
          <p className="text-xs text-stone-500">Tell us your preferences</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-stone-700">Destination</label>
          <div className="relative">
            <svg className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            <input
              type="text"
              name="destination"
              required
              placeholder="e.g., Kyoto, Japan"
              value={tripData.destination}
              onChange={handleChange}
              className="w-full rounded-xl border border-stone-200 py-3 pl-10 pr-4 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-semibold text-stone-700">
            Duration — <span className="font-normal text-brand-600">{tripData.days} days</span>
          </label>
          <input
            type="range"
            name="days"
            min="1"
            max="14"
            value={tripData.days}
            onChange={handleChange}
            className="w-full accent-brand-600"
          />
          <div className="mt-1 flex justify-between text-xs text-stone-400">
            <span>1 day</span>
            <span>14 days</span>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-stone-700">Budget</label>
          <div className="grid grid-cols-3 gap-2">
            {budgetOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setTripData({ ...tripData, budget: opt.value })}
                className={`rounded-xl border px-2 py-2.5 text-center transition ${
                  tripData.budget === opt.value
                    ? 'border-brand-500 bg-brand-50 text-brand-700 shadow-sm'
                    : 'border-stone-200 text-stone-600 hover:border-stone-300'
                }`}
              >
                <div className="text-xs font-bold">{opt.label}</div>
                <div className="text-[10px] text-stone-400">{opt.desc}</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-semibold text-stone-700">Interests</label>
          <textarea
            name="interests"
            rows="3"
            placeholder="Historical sites, street food, art museums..."
            value={tripData.interests}
            onChange={handleChange}
            className="w-full resize-none rounded-xl border border-stone-200 px-4 py-3 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="group flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-600/25 transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? (
            <>
              <div className="h-4 w-4 spinner rounded-full border-2 border-white/30 border-t-white" />
              Crafting your itinerary...
            </>
          ) : (
            <>
              Generate itinerary
              <svg className="h-4 w-4 transition group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
