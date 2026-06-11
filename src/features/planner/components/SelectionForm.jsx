import { useState } from 'react';

export default function SelectionForm({ onGenerate, isLoading }) {
  // State to track what the user types into the form
  const [tripData, setTripData] = useState({
    destination: '',
    days: 3,
    budget: 'Medium',
    interests: ''
  });

  // Updates the state whenever the user types something
  const handleChange = (e) => {
    setTripData({ ...tripData, [e.target.name]: e.target.value });
  };

  // Triggers when the user clicks the submit button
  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate(tripData); // Sends the data to the main page
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100">
      <h2 className="text-2xl font-bold mb-6 text-slate-800">Design Your Trip</h2>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Where do you want to go?</label>
          <input 
            type="text" name="destination" required
            placeholder="e.g., Kyoto, Japan"
            value={tripData.destination} onChange={handleChange}
            className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Days</label>
            <input 
              type="number" name="days" min="1" max="14" required
              value={tripData.days} onChange={handleChange}
              className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Budget</label>
            <select 
              name="budget" value={tripData.budget} onChange={handleChange}
              className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition bg-white"
            >
              <option value="Backpacker">Backpacker</option>
              <option value="Medium">Medium</option>
              <option value="Luxury">Luxury</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Specific Interests</label>
          <textarea 
            name="interests" rows="3"
            placeholder="e.g., Historical architecture, local street food, art museums..."
            value={tripData.interests} onChange={handleChange}
            className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition resize-none"
          />
        </div>

        <button 
          type="submit" disabled={isLoading}
          className="w-full bg-blue-600 text-white p-4 rounded-lg font-bold text-lg hover:bg-blue-700 disabled:bg-blue-300 transition shadow-md hover:shadow-lg"
        >
          {isLoading ? 'Consulting AI Agent...' : 'Generate Itinerary'}
        </button>
      </form>
    </div>
  );
}