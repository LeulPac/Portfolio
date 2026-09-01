import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../api/axios';
import {
  clearAuthSession,
  getToken,
  isTokenExpired,
  setToken,
} from '../utils/authSession';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = useCallback(() => {
    clearAuthSession();
    setUser(null);
  }, []);

  const verifySession = useCallback(async () => {
    const token = getToken();

    if (!token || isTokenExpired(token)) {
      clearAuthSession();
      setUser(null);
      return false;
    }

    try {
      const res = await api.get('/auth/me');
      if (res.data.success && res.data.user) {
        setUser(res.data.user);
        return true;
      }

      clearAuthSession();
      setUser(null);
      return false;
    } catch {
      clearAuthSession();
      setUser(null);
      return false;
    }
  }, []);

  useEffect(() => {
    let active = true;

    const bootstrap = async () => {
      await verifySession();
      if (active) setLoading(false);
    };

    bootstrap();

    const handleLogout = () => setUser(null);
    window.addEventListener('auth:logout', handleLogout);

    return () => {
      active = false;
      window.removeEventListener('auth:logout', handleLogout);
    };
  }, [verifySession]);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    if (res.data.success) {
      setToken(res.data.token);
      setUser(res.data.user);
      return { success: true };
    }
    return { success: false, message: res.data.message };
  };

  const token = getToken();
  const isAuthenticated = Boolean(user && token && !isTokenExpired(token));

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated, verifySession }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
