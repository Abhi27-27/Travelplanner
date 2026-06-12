import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import PlannerPage from './pages/PlannerPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import MyTrips from './pages/MyTrips';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen flex-col bg-surface text-ink">
        <Navbar />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/planner" element={<ProtectedRoute><PlannerPage /></ProtectedRoute>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/my-trips" element={<ProtectedRoute><MyTrips /></ProtectedRoute>} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
