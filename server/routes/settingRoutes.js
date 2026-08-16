const express = require('express');
const router = express.Router();
const { getSettings, updateSettings, uploadFile } = require('../controllers/settingController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.get('/', getSettings);
router.put('/', protect, adminOnly, updateSettings);
router.post('/upload', protect, adminOnly, upload.single('file'), uploadFile);

module.exports = router;
