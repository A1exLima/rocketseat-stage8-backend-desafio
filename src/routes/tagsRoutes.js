const express = require("express")
const moviesTagsRoutes = express()

const moviesTagsController = require("../controllers/moviesTagsController.js")

moviesTagsRoutes.get("/:user_id", moviesTagsController.indexMoviesTags)

module.exports = moviesTagsRoutes
