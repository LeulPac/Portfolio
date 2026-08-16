const express = require('express');
const router = express.Router();
const { getAllExperiences, createExperience, updateExperience, deleteExperience } = require('../controllers/experienceController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/', getAllExperiences);
router.post('/', protect, adminOnly, createExperience);
router.put('/:id', protect, adminOnly, updateExperience);
router.delete('/:id', protect, adminOnly, deleteExperience);

module.exports = router;
