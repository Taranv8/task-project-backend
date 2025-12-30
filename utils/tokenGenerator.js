const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');

const generateToken = (userId) => {
  const token = jwt.sign({ id: userId }, jwtConfig.secret, {
    expiresIn: jwtConfig.expiresIn,
  });
  console.log('Generated token for user:', userId, token);
  return token;
};
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, jwtConfig.secret);
    console.log('Token verified successfully:', decoded);
    return decoded;
  } catch (error) {
    console.error('Token verification failed:', error.message);
    return null;
  }
};

module.exports = { generateToken, verifyToken };