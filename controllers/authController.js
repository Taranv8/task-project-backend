const authService = require('../services/authService');
const { successResponse, errorResponse } = require('../utils/apiResponse');

const signupController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const result = await authService.signup(name, email, password);
    return successResponse(res, 201, 'User registered successfully', result);
  } catch (error) {
    return errorResponse(res, 400, error.message);
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    return successResponse(res, 200, 'Login successful', result);
  } catch (error) {
    return errorResponse(res, 401, error.message);
  }
};

module.exports = { signupController, loginController };
