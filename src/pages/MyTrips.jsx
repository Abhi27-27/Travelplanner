import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
// Reusing your existing timeline component!
import ItineraryTimeline from '../features/planner/components/ItineraryTimeline'; 

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
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setTrips(response.data);
      } catch (err) {
        console.error("Error fetching trips:", err);
        setError('Failed to load your saved trips.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSavedTrips();
  }, [user.token]);

  if (isLoading) return <div className="text-center mt-20 text-slate-500">Loading your journeys...</div>;

  return (
    <div className="max-w-6xl mx-auto mt-8 px-4">
      <h2 className="text-3xl font-extrabold text-slate-800 mb-8">My Saved Trips</h2>
      
      {error && <div className="text-red-500 mb-4">{error}</div>}
      
      {trips.length === 0 && !isLoading ? (
        <div className="bg-white p-8 rounded-2xl shadow-sm text-center border border-slate-100">
          <p className="text-slate-500 mb-4">You haven't saved any trips yet!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {trips.map((trip) => (
            <div 
              key={trip._id} 
              onClick={() => setSelectedTrip(trip)}
              className={`cursor-pointer p-6 rounded-2xl border transition-all duration-200 ${
                selectedTrip?._id === trip._id 
                  ? 'border-blue-500 bg-blue-50 shadow-md scale-105' 
                  : 'border-slate-200 bg-white hover:shadow-lg hover:border-blue-300'
              }`}
            >
              <h3 className="text-xl font-bold text-slate-800 capitalize">{trip.destination}</h3>
              <p className="text-slate-500 mt-2">{trip.days} Days</p>
              <p className="text-xs text-slate-400 mt-4">
                Saved on: {new Date(trip.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* When a card is clicked, render the saved timeline! */}
      {selectedTrip && (
        <div className="mt-8 pt-8 border-t border-slate-200">
          <h3 className="text-2xl font-bold text-slate-800 mb-6 capitalize">
            {selectedTrip.destination} Itinerary
          </h3>
          <ItineraryTimeline itinerary={selectedTrip.itineraryData} />
        </div>
      )}
    </div>
  );
}