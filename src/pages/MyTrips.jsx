import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import ItineraryTimeline from '../features/planner/components/ItineraryTimeline';
import LoadingSpinner from '../components/LoadingSpinner';

const destinationGradients = [
  'from-teal-500 to-emerald-600',
  'from-orange-400 to-rose-500',
  'from-violet-500 to-purple-600',
  'from-sky-400 to-blue-600',
  'from-amber-400 to-orange-500',
  'from-rose-400 to-pink-600',
];

function getGradient(id) {
  const hash = id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return destinationGradients[hash % destinationGradients.length];
}

export default function MyTrips() {
  const [trips, setTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedTrip, setSelectedTrip] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchSavedTrips = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/planner/saved`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setTrips(response.data);
      } catch (err) {
        console.error('Error fetching trips:', err);
        setError('Failed to load your saved trips.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSavedTrips();
  }, [user.token]);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <LoadingSpinner size="lg" label="Loading your journeys..." />
      </div>
    );
  }

  return (
    <div>
      <div className="border-b border-stone-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-600">Your Library</p>
          <h1 className="mt-2 font-display text-4xl text-stone-900">Saved trips</h1>
          <p className="mt-2 text-stone-500">
            {trips.length > 0
              ? `You have ${trips.length} saved ${trips.length === 1 ? 'trip' : 'trips'}.`
              : 'Your saved itineraries will appear here.'}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {trips.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-stone-200 bg-white py-20 text-center">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A8.966 8.966 0 013 12c0-1.97.633-3.794 1.708-5.276" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-stone-900">No trips saved yet</h3>
            <p className="mt-2 max-w-sm text-sm text-stone-500">
              Generate an itinerary and save it to build your personal travel library.
            </p>
            <Link
              to="/planner"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition hover:bg-brand-700"
            >
              Plan your first trip
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {trips.map((trip) => (
                <button
                  key={trip._id}
                  type="button"
                  onClick={() => setSelectedTrip(trip)}
                  className={`card-hover group w-full overflow-hidden rounded-2xl border text-left transition ${
                    selectedTrip?._id === trip._id
                      ? 'border-brand-400 ring-2 ring-brand-200'
                      : 'border-stone-200 hover:border-brand-300'
                  }`}
                >
                  <div className={`h-28 bg-gradient-to-br ${getGradient(trip._id)} relative`}>
                    <div className="absolute inset-0 bg-black/10" />
                    <div className="absolute bottom-3 left-4">
                      <h3 className="text-xl font-bold capitalize text-white drop-shadow-sm">
                        {trip.destination}
                      </h3>
                    </div>
                  </div>
                  <div className="bg-white p-5">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-stone-700">
                        <svg className="h-4 w-4 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {trip.days} days
                      </span>
                      <span className="text-xs text-stone-400">
                        {new Date(trip.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {selectedTrip && (
              <div className="mt-10 animate-fade-in">
                <div className="mb-6 flex items-center gap-3">
                  <div className={`h-10 w-1 rounded-full bg-gradient-to-b ${getGradient(selectedTrip._id)}`} />
                  <div>
                    <h2 className="text-2xl font-bold capitalize text-stone-900">
                      {selectedTrip.destination}
                    </h2>
                    <p className="text-sm text-stone-500">{selectedTrip.days}-day itinerary</p>
                  </div>
                </div>
                <ItineraryTimeline itinerary={selectedTrip.itineraryData} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
