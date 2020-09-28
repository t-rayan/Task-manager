const express = require("express");
const router = express.Router();

const Task = require("../model/Task");
const checkAuth = require("../middleware/auth");

const { taskSchema } = require("../helpers/validation_schema");

//getting all tasks for user
router.get("/tasks", checkAuth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user });
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server error" });
  }
});

//creating new task
router.post("/tasks", checkAuth, async (req, res) => {
  const { error } = await taskSchema.validate(req.body);
  const { task, isCompleted, dueDate } = req.body;

  if (error) return res.status(400).json({ msg: error.details[0].message });

  try {
    let newTask = new Task({
      user: req.user,
      task,
      isCompleted,
      dueDate,
    });
    newTask = await newTask.save();
    res.status(200).json({ newTask, msg: "Task created" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Server error" });
  }
});

//deleting specific task by id
router.delete("/tasks/:id", checkAuth, async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);
    if (!task) return res.status(400).json({ msg: "Task not found" });
    await Task.findByIdAndRemove(req.params.id);
    res.status(200).json({ msg: "Task removed" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server error" });
  }
});

//updating specific task by id
router.put("/tasks/:id", checkAuth, async (req, res) => {
  const { error } = await taskSchema.validate(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });
  const { task, isCompleted, dueDate } = req.body;
  const updatedTask = {
    task,
    isCompleted,
    dueDate,
  };

  try {
    let toUpdate = await Task.findById(req.params.id);
    if (!toUpdate) {
      return res.status(400).json({ msg: "Task not found" });
    }

    // if (toUpdate.user.toString() !== req.user.id) {
    //   return res.status(401).json({ msg: "Not authorized" });
    // }
    toUpdate = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: updatedTask },
      { new: true }
    );

    res.status(200).json({ toUpdate, msg: "Update successful" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
