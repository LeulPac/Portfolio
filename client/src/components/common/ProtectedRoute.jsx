import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { AdminLayoutProvider } from '../../context/AdminLayoutContext';

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin"></div>
          <p className="text-sm text-slate-400 font-mono animate-pulse">Authenticating Admin Session...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? (
    <AdminLayoutProvider>
      <Outlet />
    </AdminLayoutProvider>
  ) : (
    <Navigate to="/admin/login" replace />
  );
};

export default ProtectedRoute;
