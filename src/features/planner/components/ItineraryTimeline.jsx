export default function ItineraryTimeline({ itinerary }) {
  if (!itinerary || itinerary.length === 0) {
    return (
      <div className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-stone-200 bg-stone-50/50 p-10 text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-stone-100 text-stone-400">
          <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
          </svg>
        </div>
        <p className="font-medium text-stone-500">Your itinerary will appear here</p>
        <p className="mt-1 text-sm text-stone-400">Fill in the form and hit generate to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-stone-900">Your itinerary</h2>
        <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
          {itinerary.length} {itinerary.length === 1 ? 'day' : 'days'}
        </span>
      </div>

      {itinerary.map((day, dayIndex) => (
        <div
          key={dayIndex}
          className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm animate-fade-in"
          style={{ animationDelay: `${dayIndex * 0.08}s` }}
        >
          <div className="flex items-center gap-3 border-b border-stone-100 bg-gradient-to-r from-brand-50 to-white px-6 py-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-sm font-bold text-white shadow-sm">
              {day.day}
            </div>
            <h3 className="text-lg font-bold text-stone-900">Day {day.day}</h3>
          </div>

          <div className="relative px-6 py-5">
            <div className="absolute bottom-8 left-[2.65rem] top-8 w-px bg-stone-200" />

            <div className="space-y-6">
              {day.activities.map((activity, actIndex) => (
                <div key={actIndex} className="relative flex gap-4 pl-1">
                  <div className="relative z-10 mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-brand-400 bg-white">
                    <div className="h-2 w-2 rounded-full bg-brand-500" />
                  </div>

                  <div className="min-w-0 flex-1 pb-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center rounded-md bg-stone-100 px-2 py-0.5 text-xs font-semibold text-stone-600">
                        {activity.time}
                      </span>
                    </div>
                    <h4 className="mt-1.5 text-base font-bold text-stone-900">{activity.place}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-stone-500">{activity.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
