const notificationModel = require("../Model/notification");

exports.addNotification = async (req, res) => {
  try {
    const { title } = req.body;
    const notif = new notificationModel({ title});
    await notif.save();
    res.status(200).json({ message: "notification added successfully", notif });
  } catch (error) {
    res
      .status(500)
      .json({ error: "something went wrong", issue: error.message });
  }
};

exports.getNotification = async (req, res) => {
  try {
    const notif = await notificationModel.find().populate("addedBy", "name");

    res
      .status(200)
      .json({ message: "notification fetched successfully", notif });
  } catch (error) {
    res
      .status(500)
      .json({ error: "something went wrong", issue: error.message });
  }
};
exports.updateNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const notif = await notificationModel
      .findByIdAndUpdate(id, { title, addedBy: req.user._id })
      .populate("addedBy", "name");

    if (!notif) res.status(400).json({ error: "No Such Notification found" });

    res
      .status(200)
      .json({ message: "notification updated successfully", notif });
  } catch (error) {
    res
      .status(500)
      .json({ error: "something went wrong", issue: error.message });
  }
};

exports.deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const notif = await notificationModel.findByIdAndDelete(id);

    if (!notif) res.status(400).json({ error: "No Such Notification found" });

    res.status(200).json({ message: "notification deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "something went wrong", issue: error.message });
  }
};
