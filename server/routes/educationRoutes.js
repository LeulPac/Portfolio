const express = require('express');
const router = express.Router();
const { getAllEducation, createEducation, updateEducation, deleteEducation } = require('../controllers/educationController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/', getAllEducation);
router.post('/', protect, adminOnly, createEducation);
router.put('/:id', protect, adminOnly, updateEducation);
router.delete('/:id', protect, adminOnly, deleteEducation);

module.exports = router;
