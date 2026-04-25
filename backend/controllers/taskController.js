const Task = require("../models/taskmodel");

// GET ALL TASKS
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks); // always array
  } catch (err) {
    console.error(err);
    res.status(500).json([]);
  }
};

// CREATE TASK
exports.createTask = async (req, res) => {
  try {
    const { title } = req.body;

    const newTask = new Task({ title });
    await newTask.save();

    res.status(201).json(newTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating task" });
  }
};