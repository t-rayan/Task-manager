const Joi = require("@hapi/joi");

const registerSchema = Joi.object({
  fullname: Joi.string().required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(6).required(),
});
const loginSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(6).required(),
});
const taskSchema = Joi.object({
  task: Joi.string().required(),
  isCompleted: Joi.boolean(),
  dueDate: Joi.date(),
});

module.exports = {
  registerSchema,
  loginSchema,
  taskSchema,
};
