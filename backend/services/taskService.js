const Task = require('../models/task');

// Create a new task
const createTask = async (taskData) => {
  const task = new Task(taskData);
  await task.save();
  return task;
};

// Retrieve all tasks with filters
const getTasks = async (filters) => {
  const { search, completed, sortBy } = filters;
  let filter = {};

  if (search && search.trim() !== '') {
    filter.title = new RegExp(search, 'i');
  }

  if (completed !== undefined) {
    filter.completed = completed === 'true';
  }

  const tasks = await Task.find(filter).sort(sortBy ? { [sortBy]: 1 } : {});
  return tasks;
};

// Retrieve a task by ID
const getTaskById = async (id) => {
  const task = await Task.findById(id);
  return task;
};

// Update a task
const updateTask = async (id, updates) => {
  const task = await Task.findByIdAndUpdate(id, updates, { new: true });
  return task;
};

// Delete a task
const deleteTask = async (id) => {
  const task = await Task.findByIdAndDelete(id);
  return task;
};

// Mark task as completed
const completeTask = async (id) => {
  const task = await Task.findByIdAndUpdate(id, { completed: true }, { new: true });
  return task;
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  completeTask,
};
