const prisma = require('../config/prisma');

// @desc Submit Contact Form (Public)
// @route POST /api/v1/messages
const createMessage = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Please provide name, email, and message' });
    }

    const newMessage = await prisma.message.create({
      data: {
        name,
        email: email.toLowerCase(),
        subject: subject || 'Portfolio Contact Inquiry',
        message
      }
    });

    // Record contact submission analytics event asynchronously
    setImmediate(async () => {
      try {
        await prisma.analyticsEvent.create({
          data: {
            type: 'contact_submit',
            target: 'contact_form',
            page: '/contact',
            visitorId: `vis_msg_${newMessage.id.slice(0, 8)}`,
            ip: req.ip || '127.0.0.1'
          }
        });
      } catch (e) {}
    });

    return res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been received successfully.'
    });
  } catch (error) {
    next(error);
  }
};

// @desc Get All Messages (Admin)
// @route GET /api/v1/messages
const getMessages = async (req, res, next) => {
  try {
    const { search, filter = 'all' } = req.query;

    const where = {};
    if (filter === 'unread') where.read = false;
    if (filter === 'archived') where.archived = true;
    if (filter === 'active') where.archived = false;

    let messages = await prisma.message.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });

    if (search) {
      const q = search.toLowerCase();
      messages = messages.filter(m =>
        m.name.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        m.subject.toLowerCase().includes(q) ||
        m.message.toLowerCase().includes(q)
      );
    }

    const unreadCount = await prisma.message.count({ where: { read: false, archived: false } });

    return res.status(200).json({
      success: true,
      unreadCount,
      count: messages.length,
      messages
    });
  } catch (error) {
    next(error);
  }
};

// @desc Toggle Read status or Archive message
// @route PUT /api/v1/messages/:id
const updateMessageStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { read, archived } = req.body;

    const updateData = {};
    if (read !== undefined) updateData.read = Boolean(read);
    if (archived !== undefined) updateData.archived = Boolean(archived);

    const updated = await prisma.message.update({
      where: { id },
      data: updateData
    });

    return res.status(200).json({ success: true, message: 'Message updated', messageItem: updated });
  } catch (error) {
    next(error);
  }
};

// @desc Delete Message
// @route DELETE /api/v1/messages/:id
const deleteMessage = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.message.delete({ where: { id } });
    return res.status(200).json({ success: true, message: 'Message deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createMessage,
  getMessages,
  updateMessageStatus,
  deleteMessage
};
