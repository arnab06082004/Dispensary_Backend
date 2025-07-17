const mongoose = require("mongoose");

const GallerySchema = mongoose.Schema(
  {
    link: String,
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

const galleryModel = mongoose.model("gallery", GallerySchema);

module.exports = galleryModel;
