const express = require("express")
const router = express.Router();
const UserController = require("../Controllers/user")
const authentication = require("../Authentication/auth")

router.post("/register",UserController.register)
router.post("/login", UserController.login)
router.post("/send-otp", UserController.sendOtp)
router.post("/verify-otp", UserController.verifyOtp)
router.post('/reset-password',UserController.resetPassword)

router.put("/update-student/:id",UserController.updateStudentById)
router.get("/get-student-by-roll/:roll",UserController.getStudentByRoll)
router.post("/registerStudentByStaff",UserController.registerStudentByStaff)

router.post("/add-staff",UserController.addStaffByAdmin)
router.get("/get-staff",UserController.getAllStaff)
router.put("/update-staff/:id",UserController.updateStaffById)
router.delete("/delete-staff/:id", UserController.deleteStaff)

router.post("/logout",UserController.logout)

module.exports = router
