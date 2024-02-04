const express = require("express")
const router = express.Router()
const verifyAccessToken = require("../middlewear/jwtMiddlewear")
const coursePostValidation = require("../middlewear/zodMiddlewear/coursePost")
const courseController = require("../controllers/courseController")

router.post("/create-post", verifyAccessToken, coursePostValidation, courseController.createPost)
router.get("/dashboard", verifyAccessToken, courseController.dashboard)
router.get("/:id", verifyAccessToken, courseController.getCourseByID);

module.exports = router;