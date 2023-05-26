const express = require("express")
const usersRoutes = express()

const usersController = require("../controllers/usersController.js")
usersRoutes.get("/", usersController.createUser)

module.exports = usersRoutes