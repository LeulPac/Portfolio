import React, { useEffect, useState } from 'react';
import Certificates from '../../components/public/Certificates';
import api from '../../api/axios';

const CertificatesPage = () => {
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    api.get('/certificates')
      .then((res) => {
        if (res.data.success) setCertificates(res.data.certificates);
      })
      .catch(() => {});
  }, []);

  return (
    <main className="pt-16">
      <Certificates certificates={certificates} />
    </main>
  );
};

export default CertificatesPage;
