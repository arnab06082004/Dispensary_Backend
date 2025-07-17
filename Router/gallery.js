const express = require("express")
const router = express.Router()
const authentication = require("../Authentication/auth")
const galleryController = require("../Controllers/gallery")

router.post("/add",authentication.adminFacultyAuth,galleryController.addGallery)
router.get("/get",galleryController.getGallery)
router.delete("/delete/:id", authentication.adminFacultyAuth, galleryController.deleteById)

module.exports = router