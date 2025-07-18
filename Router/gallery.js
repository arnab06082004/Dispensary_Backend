const express = require("express")
const router = express.Router()
const authentication = require("../Authentication/auth")
const galleryController = require("../Controllers/gallery")

router.post("/add",galleryController.addGallery)
router.get("/get",galleryController.getGallery)
router.delete("/delete/:id", galleryController.deleteById)

module.exports = router