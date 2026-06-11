export default function ItineraryTimeline({ itinerary }) {
  // 1. THE EMPTY STATE CHECK
  if (!itinerary || itinerary.length === 0) {
    return (
      <div className="flex-grow bg-slate-50 rounded-2xl border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-500 font-medium p-10">
        Your generated day-by-day itinerary will appear here.
      </div>
    );
  }

  // 2. THE RENDERED TIMELINE
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800">Your Custom Itinerary</h2>
      
      {/* 3. LOOPING THROUGH THE DAYS */}
      {itinerary.map((day, dayIndex) => (
        <div key={dayIndex} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-xl font-bold text-blue-600 mb-4 border-b pb-2">
            Day {day.day}
          </h3>
          
          <div className="space-y-6">
            {/* 4. LOOPING THROUGH ACTIVITIES IN EACH DAY */}
            {day.activities.map((activity, actIndex) => (
              <div key={actIndex} className="flex gap-4">
                <div className="min-w-[90px] text-sm font-bold text-slate-500 pt-1">
                  {activity.time}
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 text-lg">{activity.place}</h4>
                  <p className="text-slate-600 mt-1">{activity.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}