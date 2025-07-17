const express = require("express")
const router = express.Router()
const authentication = require("../Authentication/auth")
const facilityController = require("../Controllers/facility")

router.post("/add",authentication.adminFacultyAuth,facilityController.addFacility)
router.put("/update/:id",authentication.adminFacultyAuth,facilityController.updateFacility)
router.get("/get",facilityController.getAllFacility)
router.delete("/delete/:id",authentication.adminFacultyAuth,facilityController.deleteFacility)
module.exports = router