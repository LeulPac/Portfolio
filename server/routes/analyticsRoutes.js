const express = require('express');
const router = express.Router();
const { trackAction, getOverviewStats, getVisitorLogs } = require('../controllers/analyticsController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.post('/track', trackAction);
router.get('/overview', protect, adminOnly, getOverviewStats);
router.get('/visitor-logs', protect, adminOnly, getVisitorLogs);

module.exports = router;
