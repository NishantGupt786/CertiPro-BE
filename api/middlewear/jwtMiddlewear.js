const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

async function verifyAccessToken(req, res, next) {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).json({ message: "Access denied. Token missing." });
  }
  const token = authHeader.replace("Bearer ", "");
  try {
    const decodedUser = jwt.verify(token, process.env.SECRET_KEY);
    const user = User.findOne({ email: decodedUser.email });
    if (!user) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token." });
  }
}

module.exports = verifyAccessToken