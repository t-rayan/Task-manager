const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next) => {
  const token = req.header("auth-token");

  if (!token) {
    return res.status(401).json({ msg: "Access Denied" });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Invalid Token" });
  }
};

module.exports = checkAuth;
