const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//creating user schema
const taskSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },

  task: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  dueDate: {
    type: Date,
    default: Date.now(),
  },
  created_at: Date,
  updated_at: Date,
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
