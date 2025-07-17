const historyModel = require("../Model/history");
const medicinesModel = require("../Model/medicine");

exports.addHistory = async (req, res) => {
  try {
    const { student, roll, medicines } = req.body;
    const medicinesData = medicines.map((item) => {
      const { _id, name, requiredQuantity } = item;
      return { _id, name, requiredQuantity };
    });
    medicinesData.map(async (item) => {
      let medicines = await medicinesModel.findById(item._id);
      let leftMedicine =
        parseInt(medicines.quantity) - parseInt(item.requiredQuantity);
      medicines.quantity = leftMedicine.toString();
      await medicines.save();
    });

    const addData = new historyModel({ student, roll, medicines });
    await addData.save();
    res.status(200).json({ message: "medicine added successfully", addData });
  } catch (error) {
    res
      .status(500)
      .json({ error: "something went wrong", issue: error.message });
  }
};

exports.getHistoryByDate = async (req, res) => {
  try {
    const { month, year } = req.query;
    if (!month && !year)
      res.status(400).json({ message: "Month and Year are required" });
    const m = parseInt(month) - 1;
    const y = parseInt(year);

    const sDate = new Date(y, m, 1);
    const eDate = new Date(y, m + 1, 1);

    const histories = await historyModel
      .find({ createdAt: { $gte: sDate, $lt: eDate } })
      .populate("student")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Histories fetched successfully",
      histories,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "something went wrong", issue: error.message });
  }
};
exports.getStudentHistory = async (req, res) => {
  try {
    const { roll } = req.query;

    const sHistory = await historyModel
      .find({ roll })
      .populate("student")
      .sort({ createdAt: -1 });
    if (sHistory.length == 0)
      return res.status(200).json({ message: "no data found" });

    return res
      .status(200)
      .json({ message: "Student data fetched successfully", sHistory });
  } catch (error) {
    res
      .status(500)
      .json({ error: "something went wrong", issue: error.message });
  }
};
