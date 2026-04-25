const Task = require("../models/taskmodel");

// GET tasks (user specific)
exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });
  res.json(tasks);
};

// CREATE task
exports.createTask = async (req, res) => {
  const task = await Task.create({
    title: req.body.title,
    user: req.user.id,
    completed: false,
  });

  res.json(task);
};

// UPDATE task
exports.updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(task);
};

// DELETE task
exports.deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};