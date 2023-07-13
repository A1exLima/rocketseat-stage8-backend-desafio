const express = require("express")
const usersRoutes = express()

const usersController = require("../controllers/usersController.js")
const containsData = require("../middlewares/containsData.js")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated.js")

usersRoutes.post("/", containsData, usersController.createUser)
usersRoutes.put("/", ensureAuthenticated, containsData, usersController.updateUser)
usersRoutes.delete("/:user_id", usersController.deleteUser)

module.exports = usersRoutes


