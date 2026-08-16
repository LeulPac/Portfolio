const prisma = require('../config/prisma');
const { parseJsonSafely } = require('../utils/helpers');

const getAllExperiences = async (req, res, next) => {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: [{ orderIndex: 'asc' }, { createdAt: 'desc' }]
    });

    const formatted = experiences.map(e => ({
      ...e,
      description: parseJsonSafely(e.description, []),
      technologies: parseJsonSafely(e.technologies, [])
    }));

    return res.status(200).json({ success: true, count: formatted.length, experiences: formatted });
  } catch (error) {
    next(error);
  }
};

const createExperience = async (req, res, next) => {
  try {
    const { role, company, location, startDate, endDate, current, description, technologies, orderIndex } = req.body;
    const newExp = await prisma.experience.create({
      data: {
        role,
        company,
        location,
        startDate,
        endDate: current ? 'Present' : endDate,
        current: Boolean(current),
        description: typeof description === 'string' ? description : JSON.stringify(description || []),
        technologies: typeof technologies === 'string' ? technologies : JSON.stringify(technologies || []),
        orderIndex: parseInt(orderIndex || 0, 10)
      }
    });

    return res.status(201).json({
      success: true,
      message: 'Experience created',
      experience: {
        ...newExp,
        description: parseJsonSafely(newExp.description, []),
        technologies: parseJsonSafely(newExp.technologies, [])
      }
    });
  } catch (error) {
    next(error);
  }
};

const updateExperience = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updateData = { ...data };
    if (data.description !== undefined) updateData.description = typeof data.description === 'string' ? data.description : JSON.stringify(data.description);
    if (data.technologies !== undefined) updateData.technologies = typeof data.technologies === 'string' ? data.technologies : JSON.stringify(data.technologies);
    if (data.current !== undefined) updateData.current = Boolean(data.current);

    const updated = await prisma.experience.update({
      where: { id },
      data: updateData
    });

    return res.status(200).json({
      success: true,
      message: 'Experience updated',
      experience: {
        ...updated,
        description: parseJsonSafely(updated.description, []),
        technologies: parseJsonSafely(updated.technologies, [])
      }
    });
  } catch (error) {
    next(error);
  }
};

const deleteExperience = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.experience.delete({ where: { id } });
    return res.status(200).json({ success: true, message: 'Experience deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllExperiences, createExperience, updateExperience, deleteExperience };
