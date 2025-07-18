const express = require("express")
const router = express.Router()
const authentication = require("../Authentication/auth")
const historyController = require("../Controllers/history")

router.post("/add",historyController.addHistory)
router.get("/get-history", historyController.getHistoryByDate)
router.get("/get", historyController.getStudentHistory)

module.exports = router