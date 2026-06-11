import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom'; // 👈 added useLocation
import axios from 'axios';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();                        // 👈 added
  const hint = location.state?.message;                  // 👈 added
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any old errors

    try {
      // 1. Send the email and password to your backend to verify
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        email,
        password
      });

      // 2. The backend sends back the REAL token and user profile. 
      // We pass THAT secure data into your AuthContext.
      login(response.data); 
      
      // 3. Redirect to the planner!
      navigate('/planner');
      
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.error || err.response?.data?.message || 'Failed to log in');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-2xl shadow-xl border border-slate-100">
      <h2 className="text-3xl font-bold text-center text-slate-800 mb-8">Welcome Back</h2>
      
      {hint && (                                         // 👈 added
        <div className="bg-blue-50 text-blue-700 p-3 rounded-lg mb-4 text-center text-sm">
          {hint}
        </div>
      )}

      {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-center">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Email</label>
          <input 
            type="email" required
            value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Password</label>
          <input 
            type="password" required
            value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white p-4 rounded-lg font-bold hover:bg-blue-700 transition">
          Log In
        </button>
      </form>
    </div>
  );
}