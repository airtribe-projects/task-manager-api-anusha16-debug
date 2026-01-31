const tasksData = require('../models/taskModel');

// Get all tasks with filtering and sorting
const getAllTasks = async (req, res) => {
    try {
        let tasks = [...tasksData];
        
        // Filter by completion status
        const { completed, sort } = req.query;
        
        if (completed !== undefined) {
            const isCompleted = completed === 'true';
            tasks = tasks.filter(task => task.completed === isCompleted);
        }
        
        // Sort by creation date
        if (sort === 'asc') {
            tasks.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        } else if (sort === 'desc') {
            tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }
        
        res.status(200).json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Get a specific task by ID
const getTaskById = (req, res) => {
    try {
        const task = tasksData.find(task => task.id === parseInt(req.params.id));
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        console.error('Error fetching task:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Get tasks by priority level
const getTasksByPriority = (req, res) => {
    try {
        const { level } = req.params;
        const validPriorities = ['low', 'medium', 'high'];
        
        if (!validPriorities.includes(level.toLowerCase())) {
            return res.status(400).json({ 
                error: 'Invalid priority level. Must be low, medium, or high' 
            });
        }
        
        const tasks = tasksData.filter(
            task => task.priority.toLowerCase() === level.toLowerCase()
        );
        
        res.status(200).json(tasks);
    } catch (error) {
        console.error('Error fetching tasks by priority:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Create a task
const createTask = async (req, res) => {
    try {
        const payload = req.body;
        
        // Validate required fields
        if (!payload.title || !payload.description || typeof payload.completed !== 'boolean') {
            return res.status(400).json({ 
                error: 'Invalid task data. Required fields: title, description, completed' 
            });
        }
        
        // Validate priority if provided
        const validPriorities = ['low', 'medium', 'high'];
        if (payload.priority && !validPriorities.includes(payload.priority.toLowerCase())) {
            return res.status(400).json({ 
                error: 'Invalid priority. Must be low, medium, or high' 
            });
        }
        
        const newTask = {
            id: tasksData.length + 1,
            title: payload.title,
            description: payload.description,
            completed: payload.completed,
            priority: payload.priority ? payload.priority.toLowerCase() : 'medium',
            createdAt: new Date().toISOString()
        }
        
        tasksData.push(newTask);
        res.status(201).json(newTask);
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Update a task
const updateTask = (req, res) => {
    try {
        const taskId = parseInt(req.params.id);
        const payload = req.body;
        const taskIndex = tasksData.findIndex(task => task.id === taskId);
        
        if (taskIndex === -1) {
            return res.status(404).json({ error: 'Task not found' });
        }
        
        // Validate data if provided
        if (payload.title !== undefined && typeof payload.title !== 'string') {
            return res.status(400).json({ error: 'Invalid title' });
        }
        if (payload.description !== undefined && typeof payload.description !== 'string') {
            return res.status(400).json({ error: 'Invalid description' });
        }
        if (payload.completed !== undefined && typeof payload.completed !== 'boolean') {
            return res.status(400).json({ error: 'Invalid completed status' });
        }
        
        // Validate priority if provided
        const validPriorities = ['low', 'medium', 'high'];
        if (payload.priority !== undefined) {
            if (!validPriorities.includes(payload.priority.toLowerCase())) {
                return res.status(400).json({ 
                    error: 'Invalid priority. Must be low, medium, or high' 
                });
            }
            payload.priority = payload.priority.toLowerCase();
        }
        
        const updatedTask = { ...tasksData[taskIndex], ...payload };
        tasksData[taskIndex] = updatedTask;
        res.json(updatedTask);
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Delete a task
const deleteTask = (req, res) => {
    try {
        const taskId = parseInt(req.params.id);
        const taskIndex = tasksData.findIndex(task => task.id === taskId);
        
        if (taskIndex === -1) {
            return res.status(404).json({ error: 'Task not found' });
        }
        
        tasksData.splice(taskIndex, 1);
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    getAllTasks,
    getTaskById,
    getTasksByPriority,
    createTask,
    updateTask,
    deleteTask
}