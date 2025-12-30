const express = require('express');
const router = express.Router();
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');
const protect  = require('../middlewares/authMiddleware');
const { taskValidation, validate } = require('../middlewares/validator');

router.get('/', protect, getTasks);
router.post('/', protect, taskValidation, validate, createTask);
router.get('/:id', protect, getTask);
router.put('/:id', protect, taskValidation, validate, updateTask);
router.delete('/:id', protect, deleteTask);

module.exports = router;