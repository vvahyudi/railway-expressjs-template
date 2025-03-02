const express = require("express")
const Router = express.Router()
const commentController = require("../controllers/comment")

Router.get("/", commentController.getAllComent)

Router.get("/:id", commentController.getCommentById)

Router.post("/", commentController.addComment)

module.exports = Router
