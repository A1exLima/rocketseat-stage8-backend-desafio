const express = require("express")
const routes = express()

const usersRoutes = require("../routes/usersRoutes.js")
routes.use("/users", usersRoutes)

module.exports = routes