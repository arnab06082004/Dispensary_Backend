const mongoose = require("mongoose");

const NotificationSchema = mongoose.Schema(
  {
    title: String,
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
     
    },
  },
  { timestamps: true }
);

const notificationModel = mongoose.model("notification", NotificationSchema);

module.exports = notificationModel;
