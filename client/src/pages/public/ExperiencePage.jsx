import React, { useEffect, useState } from 'react';
import Experience from '../../components/public/Experience';
import api from '../../api/axios';

const ExperiencePage = () => {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    api.get('/experiences')
      .then((res) => {
        if (res.data.success) setExperiences(res.data.experiences);
      })
      .catch(() => {});
  }, []);

  return (
    <main className="pt-16">
      <Experience experiences={experiences} />
    </main>
  );
};

export default ExperiencePage;
