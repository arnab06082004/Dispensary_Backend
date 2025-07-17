const mongoose = require("mongoose");

const FacilitySchema = mongoose.Schema(
  {
    title: String,
    description: String,
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

const facilityModel = mongoose.model("facility", FacilitySchema);

module.exports = facilityModel;
