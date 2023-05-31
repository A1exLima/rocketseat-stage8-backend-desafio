const express = require("express")
const routes = express()

const usersRoutes = require("../routes/usersRoutes.js")
routes.use("/users", usersRoutes)

const moviesRoutes = require("../routes/moviesRoutes.js")
routes.use("/movies_notes", moviesRoutes)

const tagsRoutes = require("../routes/tagsRoutes.js")
routes.use("/movies_tags", tagsRoutes)

module.exports = routes