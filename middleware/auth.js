// middleware/auth.js
// npm i jsonwebtoken
const jwt = require("jsonwebtoken");
const User = require("../models/users");

const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; //undefined or null, it doesnt throw an error
  if (!token) return res.status(401).json({ message: "Not authorized, no token" });

  try {
    const decoded = jwt.verify(token, "your_jwt_secret"); // use env for prod
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

const adminOnly = (req, res, next) => {
  if (!req.user?.isAdmin) {
    return res.status(403).json({ message: "Admins only" });
  }
  next();
};

module.exports = { protect, adminOnly };
