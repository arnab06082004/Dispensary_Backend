const hospitalModel = require("../Model/nearByHospital");

exports.addNearByHospital = async (req, res) => {
  try {
    const hospital = new hospitalModel({ ...req.body, addedBy: req.user._id });
    await hospital.save();
    res.status(200).json({ message: "hospital added successfully", hospital });
  } catch (error) {
    res
      .status(500)
      .json({ error: "something went wrong", issue: error.message });
  }
};

exports.getHospital = async (req, res) => {
  try {
    const hospital = await hospitalModel.find().populate("addedBy", "name");
    res
      .status(200)
      .json({ message: "hospital fetched successfully", hospital });
  } catch (error) {
    res
      .status(500)
      .json({ error: "something went wrong", issue: error.message });
  }
};

exports.updateById = async (req, res) => {
  try {
    const { id } = req.params;

    const hospital = await hospitalModel
      .findByIdAndUpdate(
        id,
        { ...req.body, addedBy: req.user._id },
        { new: true }
      )
      .populate("addedBy", "name");

    if (!hospital) res.status(400).json({ error: "No Such hospital found" });

    res.status(200).json({ message: "hospital update successfully", hospital });
  } catch (error) {
    res
      .status(500)
      .json({ error: "something went wrong", issue: error.message });
  }
};
exports.deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const hospital = await hospitalModel.findByIdAndDelete(id);
    if (!hospital) res.status(400).json({ error: "No Such hospital found" });

    res.status(200).json({ message: "hospital deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "something went wrong", issue: error.message });
  }
};
