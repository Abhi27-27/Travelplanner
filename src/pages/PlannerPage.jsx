import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import SelectionForm from '../features/planner/components/SelectionForm';
import ItineraryTimeline from '../features/planner/components/ItineraryTimeline';

export default function PlannerPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [itineraryData, setItineraryData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [mapLocation, setMapLocation] = useState('');

  const { user } = useAuth();
  const navigate = useNavigate();

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleGenerateTrip = async (tripDetails) => {
    setIsLoading(true);
    setErrorMessage('');
    setMapLocation(tripDetails.destination);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/planner/generate`,
        tripDetails,
        { headers: { Authorization: `Bearer ${user?.token}` } }
      );

      if (response.data?.itinerary) {
        setItineraryData(response.data.itinerary);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        navigate('/login', { state: { message: 'Please sign in to generate a trip plan.' } });
        return;
      }
      console.error('Frontend Communication Error:', error);
      setErrorMessage(error.response?.data?.error || 'An unexpected error occurred while communicating with the AI.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveTrip = async () => {
    setIsSaving(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/planner/save`,
        {
          destination: mapLocation,
          days: itineraryData.length,
          itineraryData,
        },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      showToast('Trip saved to your dashboard!');
    } catch (error) {
      console.error('Error saving trip:', error);
      showToast('Failed to save trip. Please try again.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="relative">
      {toast && (
        <div className={`fixed right-6 top-20 z-50 flex items-center gap-3 rounded-xl px-5 py-3.5 text-sm font-medium shadow-xl animate-slide-up ${
          toast.type === 'error'
            ? 'border border-red-200 bg-red-50 text-red-800'
            : 'border border-brand-200 bg-white text-brand-800'
        }`}>
          {toast.type === 'error' ? (
            <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : (
            <svg className="h-5 w-5 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
          {toast.message}
        </div>
      )}

      <div className="border-b border-stone-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-600">Trip Planner</p>
          <h1 className="mt-2 font-display text-4xl text-stone-900">Plan your next adventure</h1>
          <p className="mt-2 max-w-xl text-stone-500">
            Enter your destination and preferences — Voyago will craft a personalized day-by-day itinerary.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {errorMessage && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {errorMessage}
          </div>
        )}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <SelectionForm onGenerate={handleGenerateTrip} isLoading={isLoading} />
          </div>

          <div className="flex flex-col gap-6 lg:col-span-2">
            <div className="overflow-hidden rounded-2xl border border-stone-200 shadow-sm">
              <div className="flex items-center justify-between border-b border-stone-100 bg-stone-50 px-5 py-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-stone-700">
                  <svg className="h-4 w-4 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  {mapLocation ? mapLocation : 'Destination map'}
                </div>
              </div>
              <div className="h-72 w-full sm:h-80">
                {mapLocation ? (
                  <iframe
                    title="Destination Map"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(mapLocation)}&t=&z=12&ie=UTF8&iwloc=&output=embed`}
                    allowFullScreen
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center bg-gradient-to-br from-stone-50 to-brand-50/30 text-stone-400">
                    <svg className="mb-3 h-10 w-10 text-stone-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                    </svg>
                    <p className="text-sm font-medium">Map preview will appear here</p>
                  </div>
                )}
              </div>
            </div>

            <ItineraryTimeline itinerary={itineraryData} />

            {itineraryData.length > 0 && (
              <button
                onClick={handleSaveTrip}
                disabled={isSaving}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-stone-900 py-3.5 text-sm font-bold text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSaving ? (
                  <>
                    <div className="h-4 w-4 spinner rounded-full border-2 border-white/30 border-t-white" />
                    Saving to dashboard...
                  </>
                ) : (
                  <>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                    Save this trip
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
