const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  dueDate: Date,
  priority: { type: String, enum: ['High', 'Medium', 'Low'], default: 'Medium' },
  completed: { type: Boolean, default: false },
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
