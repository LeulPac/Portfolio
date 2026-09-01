import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { AdminLayoutProvider } from '../../context/AdminLayoutContext';
import { getToken, isTokenExpired } from '../../utils/authSession';

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();
  const token = getToken();
  const hasValidSession = isAuthenticated && token && !isTokenExpired(token);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
          <p className="text-sm text-slate-400 font-mono animate-pulse">Authenticating Admin Session...</p>
        </div>
      </div>
    );
  }

  if (!hasValidSession) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  return (
    <AdminLayoutProvider>
      <Outlet />
    </AdminLayoutProvider>
  );
};

export default ProtectedRoute;
