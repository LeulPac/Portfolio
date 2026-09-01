const jwt = require('jsonwebtoken');

const DEFAULT_DEV_SECRET = 'dev_only_jwt_secret_change_in_production';
const JWT_SECRET = process.env.JWT_SECRET || (process.env.NODE_ENV === 'production' ? null : DEFAULT_DEV_SECRET);
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is required in production.');
}

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role || 'ADMIN' },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
