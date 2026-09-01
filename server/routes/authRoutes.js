const express = require('express');
const rateLimit = require('express-rate-limit');
const router = express.Router();
const { login, getMe, updatePassword, forgotPassword } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many login attempts. Please try again later.' }
});

router.post('/login', loginLimiter, login);
router.get('/me', protect, getMe);
router.put('/update-password', protect, updatePassword);
router.post('/forgot-password', forgotPassword);

module.exports = router;
