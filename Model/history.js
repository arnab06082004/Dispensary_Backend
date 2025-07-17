const mongoose = require("mongoose")

const HistorySchema = new mongoose.Schema({
    roll : {
        type : String,
        required : true
    },
    student : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true
    },
    medicines : [{
        name : String,
        requiredQuantity : String
    }],
}, {timestamps : true})
const historyModel = mongoose.model("history", HistorySchema);

module.exports = historyModel