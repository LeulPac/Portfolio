import React, { useEffect, useState } from 'react';
import Projects from '../../components/public/Projects';
import api from '../../api/axios';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/projects')
      .then((res) => {
        if (res.data.success) setProjects(res.data.projects);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="pt-16">
      <Projects projects={projects} loading={loading} />
    </main>
  );
};

export default ProjectsPage;
