import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import AnimatedCursor from './AnimatedCursor';
import api from '../../api/axios';

const PublicLayout = () => {
  const [settings, setSettings] = useState({});
  const location = useLocation();

  useEffect(() => {
    api.get('/settings')
      .then((res) => {
        if (res.data.success) setSettings(res.data.settings);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen relative transition-colors duration-300">
      <AnimatedCursor />
      <Navbar siteLogo={settings.websiteLogo || 'LM.'} settings={settings} />
      <Outlet context={{ settings }} />
      <Footer settings={settings} />
    </div>
  );
};

export default PublicLayout;
