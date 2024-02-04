const Course = require("../models/Course");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const actionsController = {
  addWatchlist: async (req, res) => {
    const courseId = req.params.id;
    const authHeader = req.header("Authorization");
    const token = authHeader.replace("Bearer ", "");

    try {
      const user = jwt.decode(token);
      const userEmail = user.email;
      const userExists = await User.findOne({ email: userEmail });

      if (!userExists) {
        return res
          .status(404)
          .json({ status: false, message: "User not found" });
      }

      const courseExists = await Course.findById(courseId);

      if (!courseExists) {
        return res
          .status(404)
          .json({ status: false, message: "Course not found" });
      }

      const watchlistExists = userExists.watchlist.find(
        (course) => course.courseId == courseId
      );

      if (watchlistExists) {
        return res
          .status(400)
          .json({ status: false, message: "Course already in watchlist" });
      }

      const { title, description, category, author, email } = courseExists;

      userExists.watchlist.push({
        courseId,
        title,
        description,
        category,
        author,
      });

      await userExists.save();

      return res
        .status(200)
        .json({ status: true, message: "Course added to watchlist" });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ status: false, message: "Internal server error" });
    }
  },

  removeWatchlist: async (req, res) => {
    const courseId = req.params.id;
    const authHeader = req.header("Authorization");
    const token = authHeader.replace("Bearer ", "");

    try {
      const user = jwt.decode(token);
      const userEmail = user.email;
      const userExists = await User.findOne({ email: userEmail });

      if (!userExists) {
        return res
          .status(404)
          .json({ status: false, message: "User not found" });
      }

      const courseExists = await Course.findById(courseId);

      if (!courseExists) {
        return res
          .status(404)
          .json({ status: false, message: "Course not found" });
      }

      const watchlistExists = userExists.watchlist.find(
        (course) => course.courseId == courseId
      );

      if (!watchlistExists) {
        return res
          .status(400)
          .json({ status: false, message: "Course not in watchlist" });
      }

      userExists.watchlist = userExists.watchlist.filter(
        (course) => course.courseId != courseId
      );
      await userExists.save();

      return res
        .status(200)
        .json({ status: true, message: "Course removed from watchlist" });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ status: false, message: "Internal server error" });
    }
  },
  buyCourse: async (req, res) => {
    const courseId = req.params.id;
    const authHeader = req.header("Authorization");
    const token = authHeader.replace("Bearer ", "");
    try {
      const user = jwt.decode(token);
      const userEmail = user.email;
      const userExists = await User.findOne({ email: userEmail });
      if (!userExists) {
        res.status(404).json({ status: false, message: "User not found" });
      }
      const courseExists = await Course.findById(courseId);
      if (!courseExists) {
        res.status(404).json({ status: false, message: "Course not found" });
      }
      const boughtCourseExists = userExists.boughtCourses.find(
        (course) => course.courseId == courseId
      );
      if (boughtCourseExists) {
        res
          .status(400)
          .json({ status: false, message: "Course already bought" });
      }
      const { title, description, category, author, email } = courseExists;
      userExists.boughtCourses.push({
        courseId,
        title,
        description,
        category,
        author,
      });
      await userExists.save();
      res
        .status(200)
        .json({ status: true, message: "Course bought successfully" });
    } catch (error) {
      res.status(500).json({ status: false, message: "Internal server error" });
    }
  },
  getWatchlist: async (req, res) => {
    const authHeader = req.header("Authorization");
    const token = authHeader.replace("Bearer ", "");
    try {
      const user = jwt.decode(token);
      const userEmail = user.email;
      const userExists = await User.findOne({ email: userEmail });
      if (!userExists) {
        res.status(404).json({ status: false, message: "User not found" });
      }
      const watchlist = userExists.watchlist;
      res.status(200).json({ status: true, watchlist: watchlist });
    } catch (error) {
      res.status(500).json({ status: false, message: "Internal server error" });
    }
  },
  getBought: async (req, res) => {
    const authHeader = req.header("Authorization");
    const token = authHeader.replace("Bearer ", "");
    try {
      const user = jwt.decode(token);
      const userEmail = user.email;
      const userExists = await User.findOne({ email: userEmail });
      if (!userExists) {
        res.status(404).json({ status: false, message: "User not found" });
      }
      const boughtCourses = userExists.boughtCourses;
      res.status(200).json({ status: true, boughtCourses: boughtCourses });
    } catch (error) {
      res.status(500).json({ status: false, message: "Internal server error" });
    }
  }
};

module.exports = actionsController;
