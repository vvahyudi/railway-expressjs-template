const express = require("express")
const Router = express.Router()
const userController = require("../controllers/user")
// const authMiddleware = require("../middlewares/auth")

Router.post("/register", userController.addUser)

module.exports = Router
