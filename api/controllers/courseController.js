const Course = require("../models/Course");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const courseController = {
  createPost: async (req, res) => {
    const { title, description, price, category } = req.body;
    const authHeader = req.header("Authorization");
    const token = authHeader.replace("Bearer ", "");
    try {
      const user = jwt.decode(token);
      const userEmail = user.email;
      const userDetails = await User.findOne({ email: userEmail });
      const new_course = new Course({
        title,
        email: userEmail,
        description,
        price,
        author: userDetails.name,
        category,
      });
      await new_course.save();
      res
        .status(200)
        .json({ status: true, message: "Course Created successfully" });
    } catch (error) {
      res.status(500).json({ status: false, message: "Internal server error" });
    }
  },
  dashboard: async (req, res) => {
    try {
      const courses = await Course.find();
      res.status(200).json({ status: true, courses: courses });
    } catch (error) {
      res.status(500).json({ status: false, message: "Internal server error" });
    }
  },
  getCourseByID: async (req, res) => {
    const courseId = req.params.id;

    try {
      const course = await Course.findById(courseId);
      console.log(course);
      if (!course) {
        res.status(404).json({ status: false, message: "Course not found" });
      } else {
        res.status(200).json({ status: true, course: course });
      }
    } catch (error) {
      res.status(500).json({ status: false, message: "Internal server error" });
    }
  },
};

module.exports = courseController;
