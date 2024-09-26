const express = require("express");
const router = express.Router();

const {
  checkUserEmail,
  sendForgotPasswordOtp,
   verifyForgotPasswordOtp,
  resetPassword,
} = require("../controllers/ForgotPasswordController");
router.post("/check-user-email", checkUserEmail);

router.post("/send-otp-email", sendForgotPasswordOtp);

router.post("/verify-otp", verifyForgotPasswordOtp);

router.post("/reset-password", resetPassword);

module.exports = router;
