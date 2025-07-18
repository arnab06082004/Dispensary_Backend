const express = require("express")
const router = express.Router()
const authentication = require("../Authentication/auth")
const medicineController = require("../Controllers/medicine")

router.post("/add",medicineController.addMedicine)
router.get("/get",medicineController.getMedicine)
router.put("/update/:id",medicineController.updateById)
router.get("/search-by-name",medicineController.searchMedicine)
router.delete("/delete/:id",medicineController.deleteMedicineById)
module.exports = router