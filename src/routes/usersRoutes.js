const express = require("express")
const usersRoutes = express()
const multer = require("multer")
const uploadConfig = require("../config/upload")

const usersController = require("../controllers/usersController.js")
const UserAvatarController = require("../controllers/userAvatarController")
const containsData = require("../middlewares/containsData.js")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated.js")
const upload = multer(uploadConfig.MULTER)

usersRoutes.post("/", containsData, usersController.createUser)
usersRoutes.put("/", ensureAuthenticated, containsData, usersController.updateUser)
usersRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), UserAvatarController.updateFile)
usersRoutes.delete("/:user_id", usersController.deleteUser)

module.exports = usersRoutes


