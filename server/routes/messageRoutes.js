const express = require('express');
const router = express.Router();
const { createMessage, getMessages, updateMessageStatus, deleteMessage } = require('../controllers/messageController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.post('/', createMessage);
router.get('/', protect, adminOnly, getMessages);
router.put('/:id', protect, adminOnly, updateMessageStatus);
router.delete('/:id', protect, adminOnly, deleteMessage);

module.exports = router;
