import React from 'react';
import { useOutletContext } from 'react-router-dom';
import Contact from '../../components/public/Contact';

const ContactPage = () => {
  const { settings = {} } = useOutletContext() || {};

  return (
    <main className="pt-16">
      <Contact settings={settings} />
    </main>
  );
};

export default ContactPage;
