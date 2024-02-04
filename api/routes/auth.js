const express = require("express")
const router = express.Router()
const signupValidation = require("../middlewear/zodMiddlewear/signup")
const loginValidation = require("../middlewear/zodMiddlewear/login")
const verifyAccessToken = require("../middlewear/jwtMiddlewear")
const authController = require("../controllers/authController")

router.post("/signup",signupValidation, authController.signup)
router.post("/login", loginValidation, authController.login)

module.exports = router;