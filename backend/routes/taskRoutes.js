const express = require('express');
const taskController = require('../controllers/taskController');

const router = express.Router();

// Define routes and associate them with controller methods
router.post('/tasks', taskController.createTask);
router.get('/tasks', taskController.getTasks);
router.get('/tasks/:id', taskController.getTaskById);
router.put('/tasks/:id', taskController.updateTask);
router.delete('/tasks/:id', taskController.deleteTask);
router.patch('/tasks/:id/complete', taskController.completeTask);

module.exports = router;
