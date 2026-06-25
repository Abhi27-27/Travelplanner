import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      
      
      if (storedUser && storedUser !== 'undefined') {
        setUser(JSON.parse(storedUser));
      } else {
        localStorage.removeItem('user'); 
      }
    } catch (error) {
      console.error("🔴 Error reading user from memory:", error);
      localStorage.removeItem('user'); 
    } finally {
      setIsLoading(false); 
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);