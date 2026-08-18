import React, { useEffect, useState } from 'react';
import Skills from '../../components/public/Skills';
import api from '../../api/axios';

const SkillsPage = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    api.get('/skills')
      .then((res) => {
        if (res.data.success) setSkills(res.data.skills);
      })
      .catch(() => {});
  }, []);

  return (
    <main className="pt-16">
      <Skills skills={skills} />
    </main>
  );
};

export default SkillsPage;
