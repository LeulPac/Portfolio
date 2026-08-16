const prisma = require('../config/prisma');

const getAllCertificates = async (req, res, next) => {
  try {
    const certificates = await prisma.certificate.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return res.status(200).json({ success: true, count: certificates.length, certificates });
  } catch (error) {
    next(error);
  }
};

const createCertificate = async (req, res, next) => {
  try {
    const { title, issuer, date, credentialUrl, imageUrl, description } = req.body;
    const newCert = await prisma.certificate.create({
      data: { title, issuer, date, credentialUrl, imageUrl, description }
    });
    return res.status(201).json({ success: true, message: 'Certificate added', certificate: newCert });
  } catch (error) {
    next(error);
  }
};

const updateCertificate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await prisma.certificate.update({
      where: { id },
      data: req.body
    });
    return res.status(200).json({ success: true, message: 'Certificate updated', certificate: updated });
  } catch (error) {
    next(error);
  }
};

const deleteCertificate = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.certificate.delete({ where: { id } });
    return res.status(200).json({ success: true, message: 'Certificate deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllCertificates, createCertificate, updateCertificate, deleteCertificate };
