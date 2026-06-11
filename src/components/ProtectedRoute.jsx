import { Navigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext"; // Make sure this path is correct!

export default function ProtectedRoute({ children }) {
  // Pull in the new isLoading state
  const { user, isLoading } = useAuth();

  // 1. If we are still checking local storage, show a blank screen or spinner
  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>; 
  }

  // 2. If it finished checking and there is STILL no user, kick them out
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 3. Otherwise, let them in!
  return children;
}