const Task = require('../models/Task');

const getAllTasks = async (userId, filters = {}) => {
  const query = { userId };

  if (filters.status) {
    query.status = filters.status;
  }

  if (filters.priority) {
    query.priority = filters.priority;
  }

  if (filters.search) {
    query.$or = [
      { title: { $regex: filters.search, $options: 'i' } },
      { description: { $regex: filters.search, $options: 'i' } },
    ];
  }

  const tasks = await Task.find(query).sort({ createdAt: -1 });
  return tasks;
};

const getTaskById = async (taskId, userId) => {
  const task = await Task.findOne({ _id: taskId, userId });
  if (!task) {
    throw new Error('Task not found');
  }
  return task;
};

const createTask = async (taskData, userId) => {
  const task = await Task.create({
    ...taskData,
    userId,
  });
  return task;
};

const updateTask = async (taskId, userId, updateData) => {
  const task = await Task.findOneAndUpdate(
    { _id: taskId, userId },
    updateData,
    { new: true, runValidators: true }
  );

  if (!task) {
    throw new Error('Task not found');
  }

  return task;
};

const deleteTask = async (taskId, userId) => {
  const task = await Task.findOneAndDelete({ _id: taskId, userId });
  if (!task) {
    throw new Error('Task not found');
  }
  return { message: 'Task deleted successfully' };
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
