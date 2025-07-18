const express = require("express")
const router = express.Router()
const authentication = require("../Authentication/auth")
const facilityController = require("../Controllers/facility")

router.post("/add",facilityController.addFacility)
router.put("/update/:id",facilityController.updateFacility)
router.get("/get",facilityController.getAllFacility)
router.delete("/delete/:id",facilityController.deleteFacility)
module.exports = router