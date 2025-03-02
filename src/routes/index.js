const express = require("express")
const Router = express.Router()

const guestRoutes = require("./guest")
const commentRoutes = require("./comment")
const userRoutes = require("./user")
const authRoutes = require("./auth")

Router.use("/auth", authRoutes)
Router.use("/user", userRoutes)
Router.use("/guest", guestRoutes)
Router.use("/comment", commentRoutes)
Router.get("/", (_, response) => {
	response.json({ message: "Welcome to My Wedding API" })
})

module.exports = Router
