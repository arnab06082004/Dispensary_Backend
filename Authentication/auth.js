const userModel = require("../Model/user");
const jwt = require("jsonwebtoken");


exports.studentAuth = async (req, res, next) => {
  try {
    const token = res.cookies.token;
    if (token) {
      decode = jwt.verify(token, "Its_My_Secret_Key");
      req.user = await userModel.findById(decode.userId).select("-password");
      next();
    } else {
      return res.status(401).json({ error: "No token authentication denied" });
    }
  } catch (error) {
    res.status(400).json({ error: "Something went wrong in Authentication" });
  }
};

exports.adminFacultyAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (token) {
      const decode = jwt.verify(token, "Its_My_Secret_Key");
      req.user = await userModel.findById(decode.userId).select("-password");

      if (req.user.role === "student")
        return res.status(403).json({ error: "Access denied: Students are not allowed." });
      
      next();
    } else {
      return res.status(401).json({ error: "No token authentication denied" });
    }
  } catch (error) {
    res.status(400).json({ error: "Something went wrong in Authentication" });
  }
};

