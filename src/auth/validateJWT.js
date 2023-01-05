const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'your-secret-token';

const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: '1d',
};

const createToken = async (noPassword) => {
  const token = jwt.sign({ data: noPassword }, secret, jwtConfig);
  return token;
};

const validateToken = async (token) => {
  try {
    if (!token) return { error: 'Token not found' };
    const validation = jwt.verify(token, secret);
    if (!jwtConfig.expiresIn) return { error: 'Expired or invalid token' };
    return validation;
  } catch (err) {
    return { error: err.message };
  }
};

module.exports = {
  createToken,
  validateToken,
};
