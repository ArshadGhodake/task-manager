const Task = require("../models/taskModel");

// Create Task
exports.createTask = async (req, res) => {
  try {
    const task = await Task.create({
      title: req.body.title,
      userId: req.user.id,
    });

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Tasks (ONLY USER TASKS ✅)
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Task (TOGGLE COMPLETE ✅)
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { completed: req.body.completed },
      { new: true }
    );

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Task
exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};