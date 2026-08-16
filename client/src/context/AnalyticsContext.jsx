import React, { createContext, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../api/axios';

const AnalyticsContext = createContext(null);

export const AnalyticsProvider = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    const visitorId = localStorage.getItem('visitor_id');
    // Track Pageview
    api.post('/analytics/track', {
      type: 'pageview',
      page: location.pathname,
      target: location.pathname,
      visitorId
    }).catch(() => {});
  }, [location.pathname]);

  const trackEvent = (type, target, page = location.pathname) => {
    const visitorId = localStorage.getItem('visitor_id');
    api.post('/analytics/track', {
      type,
      target,
      page,
      visitorId
    }).catch(() => {});
  };

  return (
    <AnalyticsContext.Provider value={{ trackEvent }}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = () => useContext(AnalyticsContext);
