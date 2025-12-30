const userService = require('../services/userService');
const { successResponse, errorResponse } = require('../utils/apiResponse');

const getProfile = async (req, res) => {
  console.log('Controller req.user:', req.user);
  try {
    const user = await userService.getUserProfile(req.user._id);
    return successResponse(res, 200, 'Profile fetched successfully', user);
  } catch (error) {
    return errorResponse(res, 404, error.message);
  }
};

const updateProfile = async (req, res) => {
  try {
    const user = await userService.updateUserProfile(req.user._id, req.body);
    return successResponse(res, 200, 'Profile updated successfully', user);
  } catch (error) {
    return errorResponse(res, 400, error.message);
  }
};

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const result = await userService.updatePassword(
      req.user._id,
      currentPassword,
      newPassword
    );
    return successResponse(res, 200, result.message);
  } catch (error) {
    return errorResponse(res, 400, error.message);
  }
};

module.exports = { getProfile, updateProfile, changePassword };
