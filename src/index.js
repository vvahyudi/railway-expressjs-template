require("dotenv").config()
const { PORT } = process.env
const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const helmet = require("helmet")
const compression = require("compression")
const routerNavigation = require("./src/routes")

const app = express()
const port = PORT || 5001

app.use(cors())
app.use(morgan("dev"))
app.use(helmet())
app.use(compression())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use("/api", routerNavigation)

app.use("*", (req, res) => {
	res.status(404).send("Path Not Found")
})
app.listen(port, () => {
	console.log(`Express app is listening on port ${port}`)
})
