import React from 'react';
import { useOutletContext } from 'react-router-dom';
import About from '../../components/public/About';

const AboutPage = () => {
  const { settings = {} } = useOutletContext() || {};

  return (
    <main className="pt-16">
      <About settings={settings} />
    </main>
  );
};

export default AboutPage;
