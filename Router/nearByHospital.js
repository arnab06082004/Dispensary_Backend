const express = require("express")
const router = express.Router()
const authentication = require("../Authentication/auth")
const hospitalController = require("../Controllers/hospitalController")

router.post("/add",authentication.adminFacultyAuth,hospitalController.addNearByHospital)
router.get("/get", hospitalController.getHospital)
router.put("/update/:id", authentication.adminFacultyAuth, hospitalController.updateById)
router.delete("/delete/:id",authentication.adminFacultyAuth,hospitalController.deleteById)

module.exports = router