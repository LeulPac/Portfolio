import React, { useEffect, useState } from 'react';
import Education from '../../components/public/Education';
import api from '../../api/axios';

const EducationPage = () => {
  const [education, setEducation] = useState([]);

  useEffect(() => {
    api.get('/education')
      .then((res) => {
        if (res.data.success) setEducation(res.data.education);
      })
      .catch(() => {});
  }, []);

  return (
    <main className="pt-16">
      <Education education={education} />
    </main>
  );
};

export default EducationPage;
