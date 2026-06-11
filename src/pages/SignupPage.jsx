import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'; // 👈 1. Import axios

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // 2. We use 'login' here to save the user data to local storage after account creation
  const { login } = useAuth(); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      // 3. Send the data to your backend's register route
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        name,
        email,
        password
      });
      
      // 4. Save the secure token and user profile into React's memory
      login(response.data); 
      
      // 5. Send them to the planner
      navigate('/planner'); 
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.response?.data?.error || err.response?.data?.message || 'Failed to create account');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-2xl shadow-xl border border-slate-100">
      <h2 className="text-3xl font-bold text-center text-slate-800 mb-8">Create an Account</h2>
      
      {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-center">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Name</label>
          <input 
            type="text" required
            value={name} onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
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
          Sign Up
        </button>
      </form>
      
      <p className="mt-6 text-center text-slate-600">
        Already have an account? <Link to="/login" className="text-blue-600 font-bold hover:underline">Log In</Link>
      </p>
    </div>
  );
}