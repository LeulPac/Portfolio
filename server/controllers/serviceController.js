const prisma = require('../config/prisma');
const { parseJsonSafely } = require('../utils/helpers');

const getAllServices = async (req, res, next) => {
  try {
    const services = await prisma.service.findMany({
      orderBy: [{ orderIndex: 'asc' }, { createdAt: 'desc' }]
    });

    const formatted = services.map(s => ({
      ...s,
      features: parseJsonSafely(s.features, [])
    }));

    return res.status(200).json({ success: true, count: formatted.length, services: formatted });
  } catch (error) {
    next(error);
  }
};

const createService = async (req, res, next) => {
  try {
    const { title, description, icon, features, orderIndex } = req.body;
    const newService = await prisma.service.create({
      data: {
        title,
        description,
        icon: icon || 'terminal',
        features: typeof features === 'string' ? features : JSON.stringify(features || []),
        orderIndex: parseInt(orderIndex || 0, 10)
      }
    });

    return res.status(201).json({
      success: true,
      message: 'Service created',
      service: { ...newService, features: parseJsonSafely(newService.features, []) }
    });
  } catch (error) {
    next(error);
  }
};

const updateService = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updateData = { ...data };
    if (data.features !== undefined) updateData.features = typeof data.features === 'string' ? data.features : JSON.stringify(data.features);

    const updated = await prisma.service.update({
      where: { id },
      data: updateData
    });

    return res.status(200).json({
      success: true,
      message: 'Service updated',
      service: { ...updated, features: parseJsonSafely(updated.features, []) }
    });
  } catch (error) {
    next(error);
  }
};

const deleteService = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.service.delete({ where: { id } });
    return res.status(200).json({ success: true, message: 'Service deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllServices, createService, updateService, deleteService };
