const mongoose = require("mongoose");

const NearByHospitalSchema = mongoose.Schema(
  {
    name: String,
    address: String,
    contact: String,
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

const nearByHospitalModel = mongoose.model(
  "nearByHospital",
  NearByHospitalSchema
);

module.exports = nearByHospitalModel;
