const prisma = require('../config/prisma');

// Default initial settings configuration
const defaultSettings = {
  name: 'Leul Mengesha',
  title: 'Computer Science Student & Software Developer',
  bio: 'Passionate Computer Science student and Software Developer skilled in building scalable web applications, robust backend REST APIs, cloud infrastructure, and modern user interfaces.',
  email: 'contact@leulmengesha.com',
  phone: '+1 (555) 234-5678',
  location: 'Seattle, WA',
  avatarUrl: '/profile-transparent.png',
  resumeUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  github: 'https://github.com/leulmengesha',
  linkedin: 'https://linkedin.com/in/leulmengesha',
  twitter: 'https://twitter.com/leulmengesha',
  websiteLogo: 'LM.',
  themePrimaryColor: '#06b6d4',
  seoMetaTitle: 'Leul Mengesha - Computer Science Student & Software Developer',
  seoMetaDescription: 'Official portfolio of Leul Mengesha. Computer Science student, Full-stack developer, and software engineer.',
  googleAnalyticsId: 'G-LEUL123456'
};

// @desc Get Public Portfolio Settings
// @route GET /api/v1/settings
const getSettings = async (req, res, next) => {
  try {
    const settingRecord = await prisma.setting.findUnique({ where: { key: 'site_config' } });

    let settings = defaultSettings;
    if (settingRecord && settingRecord.value) {
      try {
        settings = { ...defaultSettings, ...JSON.parse(settingRecord.value) };
      } catch (e) { }
    }

    return res.status(200).json({
      success: true,
      settings
    });
  } catch (error) {
    next(error);
  }
};

// @desc Update Site Settings (Admin)
// @route PUT /api/v1/settings
const updateSettings = async (req, res, next) => {
  try {
    const newSettings = req.body;

    const existingRecord = await prisma.setting.findUnique({ where: { key: 'site_config' } });
    let current = defaultSettings;
    if (existingRecord && existingRecord.value) {
      try {
        current = JSON.parse(existingRecord.value);
      } catch (e) { }
    }

    const merged = { ...current, ...newSettings };

    await prisma.setting.upsert({
      where: { key: 'site_config' },
      update: { value: JSON.stringify(merged) },
      create: { key: 'site_config', value: JSON.stringify(merged) }
    });

    return res.status(200).json({
      success: true,
      message: 'Settings saved successfully',
      settings: merged
    });
  } catch (error) {
    next(error);
  }
};

// @desc Upload Image / File (Cloudinary or Direct URL)
// @route POST /api/v1/settings/upload
const uploadFile = async (req, res, next) => {
  try {
    if (req.file && req.file.path) {
      return res.status(200).json({
        success: true,
        url: req.file.path,
        message: 'File uploaded to Cloudinary successfully'
      });
    }

    if (req.body && req.body.url) {
      return res.status(200).json({
        success: true,
        url: req.body.url,
        message: 'Image URL registered successfully'
      });
    }

    return res.status(400).json({ success: false, message: 'No file or image URL provided' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSettings,
  updateSettings,
  uploadFile
};
