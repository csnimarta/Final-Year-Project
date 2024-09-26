const User = require("../models/User");
const otpGenerator = require("otp-generator");
const nodemailer = require("nodemailer");
const EmailOTP = require("../models/Otp");
const dotenv = require("dotenv");
dotenv.config();

// GenerateOtp
const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

const send_otp_registration = async (req, res) => {
  try {
    const { email_address } = req.body;
   
    const existingOTP = await EmailOTP.findOne({ email_address });

    if (existingOTP) {
      const currentTimestamp = new Date().getTime();
      if (currentTimestamp < existingOTP.registration_expireIn) {
        return res
          .status(400)
          .json({ message: "OTP already exists for this email", status: 400 });
      }
    }

    // Generate OTP
    const registration_code = generateOTP();
    console.log(`${email_address}: ${registration_code}`);

    const registration_expireIn = new Date(Date.now() + 1 * 60 * 1000);

    if (existingOTP) {
      existingOTP.registration_code = registration_code;
      existingOTP.registration_expireIn = registration_expireIn;
      existingOTP.isRegistered = false;
      await existingOTP.save();
    } else {
      const newOTPData = new EmailOTP({
        email_address,
        registration_code,
        registration_expireIn,
        isRegistered: false,
      });
      await newOTPData.save();
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_MAIL,
      to: email_address,
      subject: "Email Verification OTP",
      text: `Your OTP code for email verification is: ${registration_code}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Error sending email" });
      } else {
        console.log("Email sent:", info.response);

        // Prompt user to enter OTP
        return res.json({
          message: "OTP sent, please verify and complete registration",
          email: email_address,
        });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const verify_otp_registration = async (req, res) => {
  try {
    const { email_address, enteredOTP } = req.body;

    const otpData = await EmailOTP.findOne({ email_address });

    if (!otpData) {
      return res
        .status(404)
        .json({ message: "OTP data not found", status: 404 });
    }

    const currentTimestamp = new Date().getTime();

    if (
      otpData.registration_code === enteredOTP &&
      currentTimestamp < otpData.registration_expireIn
    ) {
      return res
        .status(200)
        .json({ message: "OTP matched successfully. Email verified." });
    } else if (currentTimestamp >= otpData.registration_expireIn) {
      await User.deleteOne({ email_address });
      return res.status(400).json({ message: "Expired OTP. " });
    } else {
      return res.status(400).json({ message: "Invalid OTP. " });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const check_email_otp = async (req, res) => {
  try {
    const { email_address, enteredOTP } = req.body;

    // Find the user's OTP record by email
    const existingOTP = await EmailOTP.findOne({ email_address });

    if (!existingOTP) {
      return res
        .status(400)
        .json({ message: "Invalid email or OTP", status: 400 });
    }
    if (
      existingOTP.registration_code !== enteredOTP ||
      new Date() > existingOTP.registration_expireIn
    ) {
      return res
        .status(400)
        .json({ message: "Invalid or expired OTP", status: 400 });
    }

    existingOTP.isRegistered = true;
    await existingOTP.save();

    

    return res.json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



const forgot_password_otp = async (req, res) => {
  try {
    const { email_address } = req.body;

    const userData = await User.findOne({ email_address });

    if (!userData) {
      return res.status(404).json({ message: "User not found", status: 404 });
    }

    const existingOTP = await EmailOTP.findOne({ email_address });

    if (existingOTP) {
      const currentTimestamp = new Date().getTime();
      if (currentTimestamp < existingOTP.forgot_password_expireIn) {
        return res
          .status(400)
          .json({ message: "OTP already exists for this email", status: 400 });
      }
    }

    // Generate OTP
    const forgot_password_code = generateOTP();
    console.log(`${email_address}: ${forgot_password_code}`);

    const forgot_password_expireIn = new Date(Date.now() + 1 * 60 * 1000);

    if (existingOTP) {
      existingOTP.forgot_password_code = forgot_password_code;
      existingOTP.forgot_password_expireIn = forgot_password_expireIn;
      existingOTP.isRegistered = false;
      await existingOTP.save();
    } else {
      const newOTPData = new EmailOTP({
        email_address,
        forgot_password_code,
        forgot_password_expireIn,
        isRegistered: false,
      });
      await newOTPData.save();
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_MAIL,
      to: email_address,
      subject: "Forgot Password OTP",
      text: `Your OTP for resetting the password is: ${forgot_password_code}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res
          .status(500)
          .json({ success: false, message: "Failed to send OTP email" });
      } else {
        console.log("Email sent: " + info.response);
        res.status(200).json({ success: true, message: "OTP sent to email" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};



const verify_forgot_password_otp = async (req, res) => {
  try {
    const { email_address, enteredOTP } = req.body;

    const otpData = await EmailOTP.findOne({
      email_address: email_address,
      forgot_password_code: enteredOTP,
    });

    if (!otpData) {
      return res
        .status(404)
        .json({ message: "OTP data not found", status: 404 });
    }

    const currentTimestamp = new Date().getTime();

    if (
      otpData.forgot_password_code === enteredOTP &&
      currentTimestamp < otpData.forgot_password_expireIn
    ) {
      return res
        .status(200)
        .json({ message: "OTP matched successfully. Email verified." });
    } else if (currentTimestamp >= otpData.forgot_password_expireIn) {
      await User.deleteOne({ email_address });
      return res.status(400).json({
        message: "Expired OTP. Please request a new OTP for registration.",
      });
    } else {
      return res
        .status(400)
        .json({ message: "Invalid OTP . Please try again." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const update_password = async (req, res) => {
  try {
    const { email_address, new_password } = req.body;

    const user = await User.findOne({ email_address });

    if (!user) {
      return res.status(404).json({ message: "User not found", status: 404 });
    }
    let hashedPassword = await bcrypt.hash(new_password, salt);
    user.password = hashedPassword;

    await user.save();

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



const reset_password_otp = async (req, res) => {
  try {
    const { email_address, current_password } = req.body;

    const user = await User.findOne({ email_address });

    if (!user) {
      return res.status(404).json({ message: "User not found", status: 404 });
    }

    const passwordMatch = await bcrypt.compare(current_password, user.password);

    if (!passwordMatch) {
      return res
        .status(401)
        .json({ message: "Invalid current password", status: 401 });
    }

    const otpCode = Math.floor(1000 + Math.random() * 9000);

    // Send OTP to the user's email
    const otpSent = await send_reset_password_otp(email_address, otpCode);

    if (!otpSent) {
      return res
        .status(500)
        .json({ message: "Failed to send OTP email", status: 500 });
    }

    return res
      .status(200)
      .json({ message: "OTP sent to the user for password reset" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



const send_reset_password_otp = async (req, res) => {
  try {
    const { email_address } = req.body;

    const userData = await User.findOne({ email_address });

    if (!userData) {
      return res.status(404).json({ message: "Email not found", status: 404 });
    }

    const existingOTP = await EmailOTP.findOne({ email_address });

    if (existingOTP) {
      const currentTimestamp = new Date().getTime();
      if (currentTimestamp < existingOTP.forgot_password_expireIn) {
        return res
          .status(400)
          .json({ message: "OTP already exists for this email", status: 400 });
      }
    }

    // Generate OTP
    const reset_password_code = generateOTP();
    console.log(`${email_address}: ${reset_password_code}`);

    // Set OTP expiry (5 minutes from now)
    const reset_password_expireIn = new Date(Date.now() + 5 * 60 * 1000);

    if (existingOTP) {
      existingOTP.reset_password_code = reset_password_code;
      existingOTP.reset_password_expireIn = reset_password_expireIn;
      existingOTP.isRegistered = false;
      await existingOTP.save();
    } else {
      const newOTPData = new EmailOTP({
        email_address,
        reset_password_code,
        reset_password_expireIn,
        isRegistered: false,
      });
      await newOTPData.save();
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_MAIL,
      to: email_address,
      subject: "Reset Password OTP",
      text: `Your OTP for resetting the password is: ${reset_password_code}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res
          .status(500)
          .json({ success: false, message: "Failed to send OTP email" });
      } else {
        console.log("Email sent: " + info.response);
        res.status(200).json({ success: true, message: "OTP sent to email" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};



const verify_reset_password_otp = async (req, res) => {
  try {
    const { email_address, enteredOTP } = req.body;

    const otpData = await EmailOTP.findOne({
      email_address: email_address,
      reset_password_code: enteredOTP,
    });

    if (!otpData) {
      return res
        .status(404)
        .json({ message: "OTP data not found", status: 404 });
    }

    const currentTimestamp = new Date().getTime();

    if (
      otpData.reset_password_code === enteredOTP &&
      currentTimestamp < otpData.reset_password_expireIn
    ) {
      return res.status(200).json({
        message: "OTP matched successfully. Proceed to reset password.",
      });
    } else if (currentTimestamp >= otpData.reset_password_expireIn) {
      return res
        .status(400)
        .json({ message: "Expired OTP. Please request a new OTP." });
    } else {
      return res
        .status(400)
        .json({ message: "Invalid OTP. Please try again." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  send_otp_registration,
  verify_otp_registration,
  forgot_password_otp,
  verify_forgot_password_otp,
  update_password,
  send_reset_password_otp,
  verify_reset_password_otp,
  reset_password_otp,
  check_email_otp,
};
