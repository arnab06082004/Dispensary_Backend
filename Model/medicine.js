const mongoose = require("mongoose")

const MedicineSchema = new mongoose.Schema({
    name : String,
    quantity : String,
    usage : String,
    addedBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true
    }
}, {
    timestamps : true
})
const medicineModel = mongoose.model("medicine", MedicineSchema);

module.exports = medicineModel