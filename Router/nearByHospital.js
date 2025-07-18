const express = require("express")
const router = express.Router()
const authentication = require("../Authentication/auth")
const hospitalController = require("../Controllers/hospitalController")

router.post("/add",hospitalController.addNearByHospital)
router.get("/get", hospitalController.getHospital)
router.put("/update/:id", hospitalController.updateById)
router.delete("/delete/:id",hospitalController.deleteById)

module.exports = router