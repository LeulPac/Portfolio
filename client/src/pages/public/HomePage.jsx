import React, { useState, useEffect } from 'react';
import Navbar from '../../components/common/Navbar';
import Hero from '../../components/public/Hero';
import About from '../../components/public/About';
import Skills from '../../components/public/Skills';
import Projects from '../../components/public/Projects';
import Experience from '../../components/public/Experience';
import Education from '../../components/public/Education';
import Services from '../../components/public/Services';
import Certificates from '../../components/public/Certificates';
import Contact from '../../components/public/Contact';
import Footer from '../../components/common/Footer';
import AnimatedCursor from '../../components/common/AnimatedCursor';
import api from '../../api/axios';

const HomePage = () => {
  const [settings, setSettings] = useState({});
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [education, setEducation] = useState([]);
  const [services, setServices] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [settingsRes, projRes, skillsRes, expRes, eduRes, servRes, certRes] = await Promise.all([
          api.get('/settings'),
          api.get('/projects'),
          api.get('/skills'),
          api.get('/experiences'),
          api.get('/education'),
          api.get('/services'),
          api.get('/certificates')
        ]);

        if (settingsRes.data.success) setSettings(settingsRes.data.settings);
        if (projRes.data.success) setProjects(projRes.data.projects);
        if (skillsRes.data.success) setSkills(skillsRes.data.skills);
        if (expRes.data.success) setExperiences(expRes.data.experiences);
        if (eduRes.data.success) setEducation(eduRes.data.education);
        if (servRes.data.success) setServices(servRes.data.services);
        if (certRes.data.success) setCertificates(certRes.data.certificates);
      } catch (err) {
        console.error('Data loading error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen relative transition-colors duration-300">
      <AnimatedCursor />
      <Navbar siteLogo={settings.websiteLogo || 'LM.'} settings={settings} />

      <main>
        <Hero settings={settings} />
        <About settings={settings} />
        <Skills skills={skills} />
        <Projects projects={projects} loading={loading} />
        <Experience experiences={experiences} />
        <Education education={education} />
        <Services services={services} />
        <Certificates certificates={certificates} />
        <Contact settings={settings} />
      </main>

      <Footer settings={settings} />
    </div>
  );
};

export default HomePage;
