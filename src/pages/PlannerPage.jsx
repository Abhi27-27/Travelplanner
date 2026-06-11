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
  
  // 1. New state to hold the map location
  const [mapLocation, setMapLocation] = useState(''); 
  
  const { user } = useAuth(); 
  const navigate = useNavigate();    

  const handleGenerateTrip = async (tripDetails) => {
    setIsLoading(true);
    setErrorMessage('');
    
    // 2. Save the destination so the map can use it immediately
    setMapLocation(tripDetails.destination); 
    
    try {
      const response = await axios.post(
        'http://localhost:5000/api/planner/generate', 
        tripDetails,
        {
          headers: {
            Authorization: `Bearer ${user?.token}` 
          }
        }
      );

      if (response.data && response.data.itinerary) {
        setItineraryData(response.data.itinerary);
      }
      
    } catch (error) {
      if (error.response?.status === 401) {
        navigate('/login', { 
          state: { message: "Please log in to generate a trip plan." }  // optional toast hint
        });
        return;   // stop here, don't set errorMessage
      }
      console.error("Frontend Communication Error:", error);
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
        destination: mapLocation, // The destination we saved for the map
        days: itineraryData.length,
        itineraryData: itineraryData
      },
      { headers: { Authorization: `Bearer ${user.token}` } }
    );
    alert("Trip saved successfully to your dashboard!");
  } catch (error) {
    console.error("Error saving trip:", error);
    alert("Failed to save trip.");
  } finally {
    setIsSaving(false);
  }
};

  return (
    <div className="max-w-6xl mx-auto mt-8 px-4">
      {errorMessage && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-center border border-red-100">
          {errorMessage}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <SelectionForm onGenerate={handleGenerateTrip} isLoading={isLoading} />
        </div>

        <div className="lg:col-span-2 flex flex-col space-y-6">
          
          {/* 3. The Dynamic Map Container */}
          <div className="h-80 w-full rounded-2xl overflow-hidden shadow-sm border border-slate-200">
            {mapLocation ? (
              <iframe
                title="Destination Map"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                // encodeURIComponent makes sure spaces in cities like "New York" don't break the URL
                src={`https://maps.google.com/maps?q=${encodeURIComponent(mapLocation)}&t=&z=12&ie=UTF8&iwloc=&output=embed`}
                allowFullScreen
                loading="lazy"
              ></iframe>
            ) : (
              <div className="h-full w-full bg-slate-100 flex items-center justify-center text-slate-400 font-medium">
                Your map will appear here
              </div>
            )}
          </div>

          <ItineraryTimeline itinerary={itineraryData} />
          {itineraryData && itineraryData.length > 0 && (
            <button 
              onClick={handleSaveTrip}
              disabled={isSaving}
              className="mt-6 w-full bg-slate-800 text-white font-bold py-3 rounded-xl hover:bg-slate-700 transition disabled:bg-slate-400"
            >
              {isSaving ? "Saving to Profile..." : "💾 Save This Trip to My Dashboard"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}