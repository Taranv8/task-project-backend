const { verifyToken } = require('../utils/tokenGenerator');
const { errorResponse } = require('../utils/apiResponse');
const User = require('../models/User');

const protect = async (req, res, next) => {
  try {
    console.log('Authorization header:', req.headers.authorization);

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
      console.log('No token found in headers');
      return errorResponse(res, 401, 'Not authorized, no token provided');
    }

    const token = authHeader.split(' ')[1];
    console.log('Extracted token:', token);

    const decoded = verifyToken(token);
    console.log('Decoded token:', decoded);

    if (!decoded) {
      return errorResponse(res, 401, 'Not authorized, invalid token');
    }

    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      console.log('User not found with decoded id:', decoded.id);
      return errorResponse(res, 401, 'User not found');
    }

    req.user = user; // attach user object to request
    console.log('User attached to req:', req.user);
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return errorResponse(res, 401, 'Not authorized');
  }
};

module.exports = protect;
