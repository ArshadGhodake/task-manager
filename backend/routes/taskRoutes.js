const express = require('express');
const router = express.Router();
const Task = require('../models/taskmodel');

// GET all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching tasks" });
  }
});

// CREATE task
router.post('/', async (req, res) => {
  try {
    const { title } = req.body;

    const newTask = new Task({ title });
    await newTask.save();

    res.json(newTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating task" });
  }
});

module.exports = router;