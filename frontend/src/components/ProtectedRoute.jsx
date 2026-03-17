import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Ask the backend if we are logged in
        const response = await fetch("http://localhost:5000/auth/status", {
          credentials: "include" // CRITICAL: This sends the secure cookie
        });
        const data = await response.json();
        setIsAuthenticated(data.isAuthenticated);
      } catch (err) {
        setIsAuthenticated(false);
      }
    };
    
    checkAuth();
  }, []);

  // Show a premium loading screen while we wait for the backend's answer
  if (isAuthenticated === null) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f4f6fb' }}>
        <h2 style={{ color: '#2c2c54', fontFamily: 'Poppins, sans-serif' }}>Loading LitNest... 📚</h2>
      </div>
    );
  }

  // If true, render the Dashboard (<Outlet />). If false, kick them to the login page (<Navigate />).
  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
}