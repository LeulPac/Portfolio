const prisma = require('../config/prisma');
const { createSlug, parseJsonSafely } = require('../utils/helpers');

// @desc Get All Projects (Public or Admin view)
// @route GET /api/v1/projects
const getAllProjects = async (req, res, next) => {
  try {
    const { category, technology, featured, search, page = 1, limit = 20, includeHidden = 'false' } = req.query;

    const where = {};
    if (includeHidden !== 'true') {
      where.hidden = false;
    }
    if (category && category !== 'All') {
      where.category = category;
    }
    if (featured === 'true') {
      where.featured = true;
    }

    let projects = await prisma.project.findMany({
      where,
      orderBy: [
        { featured: 'desc' },
        { orderIndex: 'asc' },
        { createdAt: 'desc' }
      ]
    });

    // Parse JSON strings to objects & apply in-memory filters for tech & search
    let formatted = projects.map(p => ({
      ...p,
      gallery: parseJsonSafely(p.gallery, []),
      features: parseJsonSafely(p.features, []),
      challenges: parseJsonSafely(p.challenges, []),
      lessonsLearned: parseJsonSafely(p.lessonsLearned, []),
      technologies: parseJsonSafely(p.technologies, [])
    }));

    if (technology) {
      formatted = formatted.filter(p =>
        p.technologies.some(t => t.toLowerCase() === technology.toLowerCase())
      );
    }

    if (search) {
      const q = search.toLowerCase();
      formatted = formatted.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.technologies.some(t => t.toLowerCase().includes(q))
      );
    }

    // Pagination
    const totalCount = formatted.length;
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const startIndex = (pageNum - 1) * limitNum;
    const paginatedProjects = formatted.slice(startIndex, startIndex + limitNum);

    return res.status(200).json({
      success: true,
      count: paginatedProjects.length,
      totalCount,
      totalPages: Math.ceil(totalCount / limitNum),
      currentPage: pageNum,
      projects: paginatedProjects
    });
  } catch (error) {
    next(error);
  }
};

// @desc Get Project By Slug (Increments view count)
// @route GET /api/v1/projects/slug/:slug
const getProjectBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const project = await prisma.project.findUnique({ where: { slug } });

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    // Increment view count asynchronously
    await prisma.project.update({
      where: { id: project.id },
      data: { viewsCount: { increment: 1 } }
    });

    // Fetch related projects in same category
    const related = await prisma.project.findMany({
      where: {
        category: project.category,
        id: { not: project.id },
        hidden: false
      },
      take: 3
    });

    const formatted = {
      ...project,
      viewsCount: project.viewsCount + 1,
      gallery: parseJsonSafely(project.gallery, []),
      features: parseJsonSafely(project.features, []),
      challenges: parseJsonSafely(project.challenges, []),
      lessonsLearned: parseJsonSafely(project.lessonsLearned, []),
      technologies: parseJsonSafely(project.technologies, [])
    };

    const formattedRelated = related.map(r => ({
      ...r,
      gallery: parseJsonSafely(r.gallery, []),
      technologies: parseJsonSafely(r.technologies, [])
    }));

    return res.status(200).json({
      success: true,
      project: formatted,
      relatedProjects: formattedRelated
    });
  } catch (error) {
    next(error);
  }
};

// @desc Create Project (Admin)
// @route POST /api/v1/projects
const createProject = async (req, res, next) => {
  try {
    const {
      title,
      shortDescription,
      fullDescription,
      bannerUrl,
      gallery = [],
      features = [],
      challenges = [],
      lessonsLearned = [],
      githubUrl,
      liveUrl,
      category,
      featured = false,
      hidden = false,
      technologies = []
    } = req.body;

    const slug = createSlug(title) + '-' + Date.now().toString().slice(-4);

    const newProject = await prisma.project.create({
      data: {
        title,
        slug,
        shortDescription,
        fullDescription: fullDescription || shortDescription,
        bannerUrl: bannerUrl || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop',
        gallery: typeof gallery === 'string' ? gallery : JSON.stringify(gallery),
        features: typeof features === 'string' ? features : JSON.stringify(features),
        challenges: typeof challenges === 'string' ? challenges : JSON.stringify(challenges),
        lessonsLearned: typeof lessonsLearned === 'string' ? lessonsLearned : JSON.stringify(lessonsLearned),
        githubUrl: githubUrl || null,
        liveUrl: liveUrl || null,
        category: category || 'Web Development',
        featured: Boolean(featured),
        hidden: Boolean(hidden),
        technologies: typeof technologies === 'string' ? technologies : JSON.stringify(technologies)
      }
    });

    return res.status(201).json({
      success: true,
      message: 'Project created successfully',
      project: {
        ...newProject,
        gallery: parseJsonSafely(newProject.gallery, []),
        features: parseJsonSafely(newProject.features, []),
        challenges: parseJsonSafely(newProject.challenges, []),
        lessonsLearned: parseJsonSafely(newProject.lessonsLearned, []),
        technologies: parseJsonSafely(newProject.technologies, [])
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc Update Project (Admin)
// @route PUT /api/v1/projects/:id
const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const existing = await prisma.project.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    const updateData = {};
    if (data.title) {
      updateData.title = data.title;
      updateData.slug = createSlug(data.title) + '-' + id.slice(0, 4);
    }
    if (data.shortDescription !== undefined) updateData.shortDescription = data.shortDescription;
    if (data.fullDescription !== undefined) updateData.fullDescription = data.fullDescription;
    if (data.bannerUrl !== undefined) updateData.bannerUrl = data.bannerUrl;
    if (data.githubUrl !== undefined) updateData.githubUrl = data.githubUrl;
    if (data.liveUrl !== undefined) updateData.liveUrl = data.liveUrl;
    if (data.category !== undefined) updateData.category = data.category;
    if (data.featured !== undefined) updateData.featured = Boolean(data.featured);
    if (data.hidden !== undefined) updateData.hidden = Boolean(data.hidden);
    if (data.orderIndex !== undefined) updateData.orderIndex = parseInt(data.orderIndex, 10);

    if (data.gallery !== undefined) updateData.gallery = typeof data.gallery === 'string' ? data.gallery : JSON.stringify(data.gallery);
    if (data.features !== undefined) updateData.features = typeof data.features === 'string' ? data.features : JSON.stringify(data.features);
    if (data.challenges !== undefined) updateData.challenges = typeof data.challenges === 'string' ? data.challenges : JSON.stringify(data.challenges);
    if (data.lessonsLearned !== undefined) updateData.lessonsLearned = typeof data.lessonsLearned === 'string' ? data.lessonsLearned : JSON.stringify(data.lessonsLearned);
    if (data.technologies !== undefined) updateData.technologies = typeof data.technologies === 'string' ? data.technologies : JSON.stringify(data.technologies);

    const updated = await prisma.project.update({
      where: { id },
      data: updateData
    });

    return res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      project: {
        ...updated,
        gallery: parseJsonSafely(updated.gallery, []),
        features: parseJsonSafely(updated.features, []),
        challenges: parseJsonSafely(updated.challenges, []),
        lessonsLearned: parseJsonSafely(updated.lessonsLearned, []),
        technologies: parseJsonSafely(updated.technologies, [])
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc Delete Project (Admin)
// @route DELETE /api/v1/projects/:id
const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.project.delete({ where: { id } });
    return res.status(200).json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// @desc Track Project Click (GitHub or Live Demo)
// @route POST /api/v1/projects/:id/click
const trackProjectClick = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { target } = req.body; // 'github' or 'live'

    if (target === 'github') {
      await prisma.project.update({ where: { id }, data: { githubClicks: { increment: 1 } } });
    } else if (target === 'live') {
      await prisma.project.update({ where: { id }, data: { liveClicks: { increment: 1 } } });
    }

    return res.status(200).json({ success: true, message: 'Click tracked' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
  trackProjectClick
};
