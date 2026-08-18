import React, { useEffect, useState } from 'react';
import Services from '../../components/public/Services';
import api from '../../api/axios';

const ServicesPage = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    api.get('/services')
      .then((res) => {
        if (res.data.success) setServices(res.data.services);
      })
      .catch(() => {});
  }, []);

  return (
    <main className="pt-16">
      <Services services={services} />
    </main>
  );
};

export default ServicesPage;
