const express = require("express")
const Router = express.Router()
const guestController = require("../controllers/guest")
const authMiddleware = require("../middlewares/auth")

Router.get("/", authMiddleware.authentication, guestController.getAllGuest)

Router.get("/:slug", guestController.getGuestBySlug)

Router.post("/", authMiddleware.authentication, guestController.addGuest)
Router.patch(
	"/:slug",
	authMiddleware.authentication,
	guestController.updateGuest,
)
Router.delete(
	"/:slug",
	authMiddleware.authentication,
	guestController.deleteGuest,
)

module.exports = Router
