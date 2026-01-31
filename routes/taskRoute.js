const express = require('express');
const taskController = require('../controllers/taskController');

const router = express.Router();

// Get all tasks (with optional filtering and sorting)
router.get('/', taskController.getAllTasks);

// Get tasks by priority level (must be before /:id route)
router.get('/priority/:level', taskController.getTasksByPriority);

// Get a specific task by ID
router.get('/:id', taskController.getTaskById);

// Create a new task
router.post('/', taskController.createTask);

// Update a task by ID
router.put('/:id', taskController.updateTask);

// Delete a task by ID
router.delete('/:id', taskController.deleteTask);

module.exports = router;