const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwtController = require("./jwtController");

const authController = {
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        res.status(400).json({ status: false, message: "User not found" });
      }
      if (await bcrypt.compare(password, user.password)) {
        const accessToken = jwtController.signAccessToken(user.email);
        res.header("Authorization", `Bearer ${accessToken}`);
        res.status(200).json({ status: true, accessToken: accessToken });
      } else {
        res.status(401).json({ status: false, message: "Incorrect Password" });
      }
    } catch (error) {
      res.status(500).json({ status: false, message: "Internal Server Error" });
    }
  },
  signup: async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const user_exists = await User.findOne({ email: email });
      if (user_exists) {
        return res.status(411).json({
          status: false,
          message: "User already exists",
        });
      }
      const hash = await bcrypt.hash(password, 10);
      const new_user = new User({ name, email, password: hash });
      await new_user.save();
      res.status(201).json({ status: true, message: "Signup successful" });
    } catch (e) {
      console.error(e);
      res.status(400).json({ status: false, message: "Some error occurred" });
    }
  },
};

module.exports = authController;
