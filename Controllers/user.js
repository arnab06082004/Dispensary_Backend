const userModel = require("../Model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const cookieOptions = {
  httpOnly: true,
  secure: true, //set true in production
  sameSite: "Lax",
};

exports.register = async (req, res) => {
  try {
    const { name, roll, email, password } = req.body;
    const ifExist = await userModel.findOne({ email });

    if (ifExist) {
      return res
        .status(400)
        .json({ error: "Already have an account with this email or roll" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new userModel({ name, roll, email, password: hashedPassword });

    await user.save();
    res
      .status(200)
      .json({ message: "User register successfully", success: "yes" });
  } catch (err) {
    res.status(400).json({ error: "something went wrong", issue: err.message });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const isExist = await userModel.findOne({ email });

    if (isExist && (await bcrypt.compare(password, isExist.password))) {
      const token = jwt.sign({ userId: isExist._id }, "Its_My_Secret_Key");
      res.cookie("token", token, cookieOptions);
      return res
        .status(200)
        .json({ message: "logged in successfully", user: isExist, token });
    } else {
      return res.status(400).json({ message: "invalid Credential" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "something went wrong", issue: error.message });
  }
};
exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    
    const user = await userModel.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.resetPasswordToken = otp;
   
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Your OTP Code",
      text: `Hi ${user.name},\nYour One-Time Password (OTP) for resetting your account password is: ${otp}\n\nThis OTP is valid for the next 1 hour. Please do not share it with anyone.\n\nIf you did not request a password reset, please ignore this email.\n\nThank you, \n Dispensary Management System`
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "OTP sent to your email" });
  } catch (error) {
    res.status(500).json({
      error: "Something went wrong in Send OTP",
      issue: error.message,
    });
  }
};
exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await userModel.findOne({
      email,
      resetPasswordToken: otp,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user)
      return res.status(400).json({
        error: "OTP is invalid or has expired, Please Try Again!",
      });
    res.status(200).json({
      message: "OTP is verified Successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: "Something went wrong",
      issue: error.message,
    });
  }
};
exports.resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const user = await userModel.findOne({ email });

    const updatedPassword = await bcrypt.hash(newPassword, 10);
    user.password = updatedPassword;
    user.resetPasswordToken = undefined;
    (user.resetPasswordExpires = undefined), await user.save();
    res.status(200).json({ message: "Password reset Successfully" });
  } catch (error) {
    res.status(500).json({
      error: "Something went wrong",
      issue: error.message,
    });
  }
};

exports.updateStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findByIdAndUpdate(id, req.body, { new: true });

    if (!user) return res.status(400).json({ error: "No Such student is there" });

    res.status(200).json({ message: "Student updated successfully" });
  } catch (error) {
    res.status(500).json({
      error: "Something went wrong",
      issue: error.message,
    });
  }
};
exports.getStudentByRoll = async (req, res) => {
  try {
    const { roll } = req.params;
    const student = await userModel.findOne({ roll });
    if (!student)
      return res.status(400).json({
        error: "No student found",
      });

    res.status(200).json({
      message: "Student Fetched successfully",
      student,
    });
  } catch (error) {
    res.status(500).json({
      error: "Something went wrong",
      issue: error.message,
    });
  }
};

exports.registerStudentByStaff = async (req, res) => {
  try {
    // Only accept expected fields
    const {
      name,
      email,
      roll,
      mobileNo,
      fatherName,
      fatherMobile,
      address,
      previous_health,
      bloodGroup,
      age
    } = req.body;

    // Validate required
    if (!name || !email || !roll || !mobileNo) {
      return res.status(400).json({ error: "Name, email, roll, and mobile number are required" });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if user exists
    const ifExist = await userModel.findOne({ email: normalizedEmail });
    if (ifExist) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedPassword = await bcrypt.hash(otp, 10);

    // Create user
    const user = new userModel({
      name,
      email: normalizedEmail,
      roll,
      mobileNo,
      fatherName,
      fatherMobile,
      address,
      previous_health,
      bloodGroup,
      age,
      password: hashedPassword
    });

    await user.save();

    // Send mail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: normalizedEmail,
      subject: "Password for Dispensary System",
      text: `Hi ${name},\n\n${otp} is your password for the dispensary system.\n\nThank you!`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      message: "User registered and password sent by email."
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Something went wrong. Please try again.",
      issue: error.message
    });
  }
};

exports.addStaffByAdmin = async (req, res) => {
  try {
    const { name, email, password, designation, mobileNo } = req.body;
    const ifExist = await userModel.findOne({ email });
    if (ifExist) return res.status(400).json({ error: "User already exist" });
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new userModel({
      name,
      email,
      designation,
      mobileNo,
      password: hashedPassword,
      role: "staff",
    });
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Password for dispensary System",
      text: `Hello ${name},\nWelcome to the Dispensary Management System.\nYour login password for the staff portal is: ${password}\nPlease keep this password secure. You can change it after logging in.\n\nThank you,\nDispensary Management Team`,
    };

    await transporter.sendMail(mailOptions);
    res
      .status(200)
      .json({ message: "Staff registered and password sent by email." });
  } catch (error) {
    res.status(500).json({
      error: "Something went wrong",
      issue: error.message,
    });
  }
};
exports.getAllStaff = async(req, res) => {
  try {
    const staff = await userModel.find({role : "staff"})

    res.status(200).json({staff})
  } catch (error) {
    res.status(500).json({
      error: "Something went wrong",
      issue: error.message,
    });
  }
}

exports.updateStaffById = async(req, res) => {
  try {
    const {id} = req.params;
    const {name,designation, mobileNo} = req.body;

    const staff = await userModel.findById(id)

    if(!staff)
      return res.status(400).json({error : "Staff does not exist"})

    staff.name = name
    staff.designation = designation
    staff.mobileNo = mobileNo
    await staff.save()

    res.status(200).json({message : "Staff details update successfully"})
    
  } catch (error) {
    res.status(500).json({
      error: "Something went wrong",
      issue: error.message,
    });
  }
}

exports.deleteStaff = async(req, res) => {
  try {
    const {id} = req.params;
    const user = await userModel.findByIdAndDelete(id)

    if(!user)
      return res.status(400).json({error : "No Such user exist"})

    res.status(200).json({message : "User deleted successfully"})
  } catch (error) {
    res.status(500).json({
      error: "Something went wrong",
      issue: error.message,
    });
  }
}

exports.logout = async(req, res) =>{
  try {
    res.clearCookie("token",cookieOptions).json({message: "Logged out successfully"})
  } catch (error) {
    res.status(500).json({
      error: "Something went wrong",
      issue: error.message,
    });
  }
}