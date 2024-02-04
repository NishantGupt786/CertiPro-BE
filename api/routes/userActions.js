const express = require("express")
const router = express.Router()
const verifyAccessToken = require("../middlewear/jwtMiddlewear")
const actionsController = require("../controllers/actionsController")

router.put("/add-to-watchlist/:id", verifyAccessToken, actionsController.addWatchlist)
router.put("/remove-from-watchlist/:id", verifyAccessToken, actionsController.removeWatchlist)
router.put("/buy-course/:id", verifyAccessToken, actionsController.buyCourse)
router.get("/get-watchlist", verifyAccessToken, actionsController.getWatchlist)
router.get("/get-purchased", verifyAccessToken, actionsController.getBought)

module.exports = router;