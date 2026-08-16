const prisma = require('../config/prisma');
const { parseJsonSafely } = require('../utils/helpers');

const getAllEducation = async (req, res, next) => {
  try {
    const education = await prisma.education.findMany({
      orderBy: [{ orderIndex: 'asc' }, { createdAt: 'desc' }]
    });

    const formatted = education.map(e => ({
      ...e,
      courses: parseJsonSafely(e.courses, [])
    }));

    return res.status(200).json({ success: true, count: formatted.length, education: formatted });
  } catch (error) {
    next(error);
  }
};

const createEducation = async (req, res, next) => {
  try {
    const { institution, degree, fieldOfStudy, location, startDate, endDate, gpa, description, courses, orderIndex } = req.body;
    const newEdu = await prisma.education.create({
      data: {
        institution,
        degree,
        fieldOfStudy,
        location,
        startDate,
        endDate,
        gpa,
        description,
        courses: typeof courses === 'string' ? courses : JSON.stringify(courses || []),
        orderIndex: parseInt(orderIndex || 0, 10)
      }
    });

    return res.status(201).json({
      success: true,
      message: 'Education created',
      education: { ...newEdu, courses: parseJsonSafely(newEdu.courses, []) }
    });
  } catch (error) {
    next(error);
  }
};

const updateEducation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updateData = { ...data };
    if (data.courses !== undefined) updateData.courses = typeof data.courses === 'string' ? data.courses : JSON.stringify(data.courses);

    const updated = await prisma.education.update({
      where: { id },
      data: updateData
    });

    return res.status(200).json({
      success: true,
      message: 'Education updated',
      education: { ...updated, courses: parseJsonSafely(updated.courses, []) }
    });
  } catch (error) {
    next(error);
  }
};

const deleteEducation = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.education.delete({ where: { id } });
    return res.status(200).json({ success: true, message: 'Education deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllEducation, createEducation, updateEducation, deleteEducation };
