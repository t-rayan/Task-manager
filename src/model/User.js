const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//creating user schema
const userSchema = new Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  created_at: Date,
  updated_at: Date,
});

const User = mongoose.model("User", userSchema);
module.exports = User;
