const express = require("express")
const router = express.Router()
const authentication = require("../Authentication/auth")
const historyController = require("../Controllers/history")

router.post("/add",authentication.adminFacultyAuth,historyController.addHistory)
router.get("/get-history", authentication.adminFacultyAuth, historyController.getHistoryByDate)
router.get("/get", historyController.getStudentHistory)

module.exports = router