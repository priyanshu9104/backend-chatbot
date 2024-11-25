const User = require("../models/User");
const { generateRandomPassword } = require("../utils/passwordUtils");
const { sendMail } = require("../utils/emailUtils");

// Register User
exports.register = async (req, res) => {
  const { email, phone, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered." });
    }

    const user = new User({ email, phone, password });
    await user.save();
    res.status(201).json({ message: "User registered successfully." });
  } catch (err) {
    res.status(500).json({ message: "Server error.", error: err.message });
  }
};

// Login User
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    res.status(200).json({ message: "Login successful." });
  } catch (err) {
    res.status(500).json({ message: "Server error.", error: err.message });
  }
};

// Forgot Password
exports.forgotPassword = async (req, res) => {
  const { emailOrPhone } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ email: emailOrPhone }, { phone: emailOrPhone }],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const oneDay = 24 * 60 * 60 * 1000;
    if (user.lastReset && Date.now() - user.lastReset.getTime() < oneDay) {
      return res.status(400).json({
        message: "You can only request a password reset once per day.",
      });
    }

    const newPassword = generateRandomPassword();
    user.password = newPassword;
    user.lastReset = new Date();
    await user.save();

    // Send email or simulate SMS
    if (user.email === emailOrPhone) {
      await sendMail(user.email, "Password Reset", `Your new password: ${newPassword}`);
      res.status(200).json({ message: `New password sent to your email:  ${user.email}.` });
    } else {
      console.log(`SMS to ${user.phone}: Your new password: ${newPassword}`);
      res.status(200).json({ message: "New password sent to your phone." });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error.", error: err.message });
  }
};
