import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { useState } from 'react'; 
import Home from './pages/Home';
import PlannerPage from './pages/PlannerPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import MyTrips from './pages/MyTrips';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const { user, logout } = useAuth();
  
  // State to control the mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Helper functions to open/close the menu
  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
        
        {/* Navigation Bar */}
        <nav className="bg-white shadow-sm p-4 relative">
          <div className="container mx-auto flex justify-between items-center">
            
            {/* Logo */}
            <Link to="/" onClick={closeMenu}>
              <h1 className="text-xl font-bold text-blue-600">TravelPlannner</h1>
            </Link>
            
            {/* Mobile Hamburger Button */}
            <button 
              className="md:hidden text-slate-600 focus:outline-none" 
              onClick={toggleMenu}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-4 items-center">
              <Link to="/" className="text-slate-600 hover:text-blue-600 font-medium">Home</Link>
              <Link to="/planner" className="text-slate-600 hover:text-blue-600 font-medium">Plan a Trip</Link>
              {user && <Link to="/my-trips" className="text-slate-600 hover:text-blue-600 font-medium">My Trips</Link>}
              
              {user ? (
                <>
                  <span className="text-sm font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                    {user.name}
                  </span>
                  <button onClick={logout} className="text-red-500 hover:text-red-700 font-medium px-2">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-blue-600 font-medium hover:underline">Log In</Link>
                  <Link to="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Dropdown Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-slate-100 flex flex-col space-y-4">
              <Link to="/" onClick={closeMenu} className="text-slate-600 font-medium hover:text-blue-600">Home</Link>
              <Link to="/planner" onClick={closeMenu} className="text-slate-600 font-medium hover:text-blue-600">Plan a Trip</Link>
              
              {/* 👇 FIXED: My Trips added to mobile menu 👇 */}
              {user && (
                <Link to="/my-trips" onClick={closeMenu} className="text-slate-600 font-medium hover:text-blue-600">
                  My Trips
                </Link>
              )}
              
              {user ? (
                <div className="flex flex-col space-y-4 pt-4 border-t border-slate-100">
                  <span className="text-sm font-bold text-slate-400">Signed in as {user.name}</span>
                  <button 
                    onClick={() => { logout(); closeMenu(); }} 
                    className="text-red-500 font-medium text-left"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-3 pt-4 border-t border-slate-100">
                  <Link to="/login" onClick={closeMenu} className="text-blue-600 font-medium">Log In</Link>
                  <Link to="/signup" onClick={closeMenu} className="bg-blue-600 text-white px-4 py-3 rounded-lg font-medium text-center shadow-sm">
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          )}
        </nav>

        {/* Page Routes */}
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/planner" element={<ProtectedRoute> <PlannerPage /> </ProtectedRoute>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/my-trips" element={<ProtectedRoute> <MyTrips /> </ProtectedRoute>}/>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;