const prisma = require('../config/prisma');

const getAllSkills = async (req, res, next) => {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: [{ category: 'asc' }, { orderIndex: 'asc' }, { percentage: 'desc' }]
    });

    return res.status(200).json({
      success: true,
      count: skills.length,
      skills
    });
  } catch (error) {
    next(error);
  }
};

const createSkill = async (req, res, next) => {
  try {
    const { name, category, percentage, icon, orderIndex } = req.body;
    const newSkill = await prisma.skill.create({
      data: {
        name,
        category: category || 'Frontend',
        percentage: parseInt(percentage || 80, 10),
        icon: icon || 'code',
        orderIndex: parseInt(orderIndex || 0, 10)
      }
    });

    return res.status(201).json({ success: true, message: 'Skill created', skill: newSkill });
  } catch (error) {
    next(error);
  }
};

const updateSkill = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updated = await prisma.skill.update({
      where: { id },
      data: {
        ...data,
        percentage: data.percentage ? parseInt(data.percentage, 10) : undefined,
        orderIndex: data.orderIndex ? parseInt(data.orderIndex, 10) : undefined
      }
    });

    return res.status(200).json({ success: true, message: 'Skill updated', skill: updated });
  } catch (error) {
    next(error);
  }
};

const deleteSkill = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.skill.delete({ where: { id } });
    return res.status(200).json({ success: true, message: 'Skill deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllSkills, createSkill, updateSkill, deleteSkill };
