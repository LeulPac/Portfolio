const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

let storage;

try {
  storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'leul_portfolio',
      allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg', 'pdf'],
      public_id: (req, file) => `${file.fieldname}-${Date.now()}`
    }
  });
} catch (e) {
  // Memory storage fallback
  storage = multer.memoryStorage();
}

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

module.exports = upload;
