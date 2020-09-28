const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SALT_ROUNDS = process.env.SALT_ROUNDS;
const SECRET = process.env.SECRET;
const checkAuth = require("../middleware/auth");

const User = require("../model/User");
const { registerSchema, loginSchema } = require("../helpers/validation_schema");

router.get("/user", checkAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

router.post("/user/register", async (req, res) => {
  const { fullname, email, password } = req.body;
  const { error } = await registerSchema.validate(req.body);

  if (error) return res.status(400).json({ msg: error.details[0].message });

  //check if email already registered
  const user = await User.findOne({ email });
  if (user) return res.status(400).json({ msg: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
    });

    const savedUser = newUser.save();
    res.status(200).json({ user: newUser, msg: "Registration successful" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ msg: "Server error" });
  }
});
router.post("/user/login", async (req, res) => {
  const { email, password } = req.body;
  const { error } = await loginSchema.validate(req.body);

  if (error) return res.status(400).json({ msg: error.details[0].message });

  //checking if user exist
  const user = await User.findOne({ email });

  if (!user) return res.status(400).json({ msg: "User doesnot exist!!" });
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: "Incorrect Password" });
  const payload = {
    user: user.id,
  };

  //signing jwt token
  try {
    jwt.sign(payload, SECRET, { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.send({ token, msg: "Login successful" });
    });
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
