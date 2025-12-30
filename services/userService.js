const User = require('../models/User');
const { hashPassword } = require('../utils/passwordHash');

const getUserProfile = async (userId) => {
  const user = await User.findById(userId).select('-password');
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

const updateUserProfile = async (userId, updateData) => {
  const allowedUpdates = ['name', 'email'];
  const updates = {};

  Object.keys(updateData).forEach((key) => {
    if (allowedUpdates.includes(key)) {
      updates[key] = updateData[key];
    }
  });

  const user = await User.findByIdAndUpdate(userId, updates, {
    new: true,
    runValidators: true,
  }).select('-password');

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};

const updatePassword = async (userId, currentPassword, newPassword) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  const isPasswordValid = await comparePassword(currentPassword, user.password);
  if (!isPasswordValid) {
    throw new Error('Current password is incorrect');
  }

  user.password = await hashPassword(newPassword);
  await user.save();

  return { message: 'Password updated successfully' };
};

module.exports = { getUserProfile, updateUserProfile, updatePassword };
