const UAParser = require('ua-parser-js');

const createSlug = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
};

const parseJsonSafely = (str, fallback = []) => {
  if (typeof str !== 'string') return str || fallback;
  try {
    return JSON.parse(str);
  } catch (e) {
    return fallback;
  }
};

const parseUserAgent = (uaString) => {
  const parser = new UAParser(uaString);
  const result = parser.getResult();
  return {
    browser: result.browser.name || 'Unknown Browser',
    os: result.os.name || 'Unknown OS',
    device: result.device.type ? (result.device.type.charAt(0).toUpperCase() + result.device.type.slice(1)) : 'Desktop'
  };
};

module.exports = {
  createSlug,
  parseJsonSafely,
  parseUserAgent,
};
