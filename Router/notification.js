const express = require("express")
const router = express.Router()
const authentication = require("../Authentication/auth")
const notificationController = require("../Controllers/notification")


router.post("/add",notificationController.addNotification)
router.get("/get",notificationController.getNotification)
router.put("/update/:id", authentication.adminFacultyAuth,notificationController.updateNotification)
router.delete("/delete/:id", notificationController.deleteById)

module.exports = router
