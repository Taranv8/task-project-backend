const taskService = require('../services/taskService');
const { successResponse, errorResponse } = require('../utils/apiResponse');

const getTasks = async (req, res) => {
  try {
    const filters = {
      status: req.query.status,
      priority: req.query.priority,
      search: req.query.search,
    };
    const tasks = await taskService.getAllTasks(req.user._id, filters);
    return successResponse(res, 200, 'Tasks fetched successfully', tasks);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const getTask = async (req, res) => {
  try {
    const task = await taskService.getTaskById(req.params.id, req.user._id);
    return successResponse(res, 200, 'Task fetched successfully', task);
  } catch (error) {
    return errorResponse(res, 404, error.message);
  }
};

const createTask = async (req, res) => {
  try {
    const task = await taskService.createTask(req.body, req.user._id);
    return successResponse(res, 201, 'Task created successfully', task);
  } catch (error) {
    return errorResponse(res, 400, error.message);
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await taskService.updateTask(
      req.params.id,
      req.user._id,
      req.body
    );
    return successResponse(res, 200, 'Task updated successfully', task);
  } catch (error) {
    return errorResponse(res, 400, error.message);
  }
};

const deleteTask = async (req, res) => {
  try {
    const result = await taskService.deleteTask(req.params.id, req.user._id);
    return successResponse(res, 200, result.message);
  } catch (error) {
    return errorResponse(res, 404, error.message);
  }
};

module.exports = { getTasks, getTask, createTask, updateTask, deleteTask };
