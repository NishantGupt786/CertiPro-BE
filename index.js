const express = require("express");
const mongoose = require("mongoose");
const os = require('os')
const cors = require("cors");
const authRoute = require("./api/routes/auth")
const courseRoute = require('./api/routes/course')
const userActionsRoute = require('./api/routes/userActions')
require("dotenv").config();

const mongoURI = process.env.DB_URI;

mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const app = express();
app.use(cors());
app.use(express.json());

app.get("/ping", (req, res) => {
  res.status(200).json({ message: "Course Selling", hostname: os.hostname() });
});

app.use("/auth/", authRoute);
app.use("/course/", courseRoute)
app.use("/actions/", userActionsRoute)

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
