const express = require('express');
const router = express.Router();
const {
  getAllProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
  trackProjectClick
} = require('../controllers/projectController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/', getAllProjects);
router.get('/slug/:slug', getProjectBySlug);
router.post('/:id/click', trackProjectClick);

// Admin protected routes
router.post('/', protect, adminOnly, createProject);
router.put('/:id', protect, adminOnly, updateProject);
router.delete('/:id', protect, adminOnly, deleteProject);

module.exports = router;
