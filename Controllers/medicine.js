const medicineModel = require("../Model/medicine");

exports.addMedicine = async (req, res) => {
  try {
    const medicine = new medicineModel({ ...req.body, addedBy: req.user._id });
    await medicine.save();
    res.status(200).json({ message: "Medicine added successfully" });
  } catch (error) {
    res.status(500).json({
      error: "Something went wrong",
      issue: error.message,
    });
  }
};

exports.getMedicine = async (req, res) => {
  try {
    const medicine = await medicineModel.find().populate("addedBy", "name");
    res
      .status(200)
      .json({ message: "Medicine fetched successfully", medicine });
  } catch (error) {
    res.status(500).json({
      error: "Something went wrong",
      issue: error.message,
    });
  }
};
exports.updateById = async (req, res) => {
  try {
    const { id } = req.params;
    const medicine = await medicineModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );

    if (!medicine)
      res.status(400).json({
        error: "Medicine not found",
      });
    res.status(200).json({ message: "Medicine update successfully", medicine });
  } catch (error) {
    res.status(500).json({
      error: "Something went wrong",
      issue: error.message,
    });
  }
};

exports.searchMedicine = async (req, res) => {
  try {
    const { name } = req.query;
    const medicine = await medicineModel
      .find({
        name: { $regex: new RegExp(name, "i") },
      })
      .populate("addedBy", "name");

    return res.status(200).json({
      message: medicine.length === 0 ? "No medicine found" : "Medicine fetched successfully",
      medicine,
    });
  } catch (error) {
    res.status(500).json({
      error: "Something went wrong",
      issue: error.message,
    });
  }
};
exports.deleteMedicineById = async (req, res) => {
  try {
    const { id } = req.params;
    const medicine = await medicineModel.findByIdAndDelete(id);
    if (!medicine)
      return res.status(404).json({
        error: "No such Medicine found",
      });
    res.status(200).json({
      message: "Medicine deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: "Something went wrong",
      issue: error.message,
    });
  }
};
