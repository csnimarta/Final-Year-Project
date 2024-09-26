const express = require("express");
const router = express.Router();

const {
  send_otp_registration,
  verify_otp_registration,
  check_email_otp,
  forgot_password_otp,
  verify_forgot_password_otp,
  update_password,
  reset_password_otp,
  send_reset_password_otp,
  verify_reset_password_otp,
} = require("../controllers/OtpController");

router.post("/send_otp_registration", send_otp_registration);
router.post("/verify_otp_registration", verify_otp_registration);
router.post("/check_email_otp", check_email_otp);
router.post("/forgot_password_otp", forgot_password_otp);
router.post("/verify_forgot_password_otp", verify_forgot_password_otp);
router.post("/update_password", update_password);
router.post("/reset_password_otp", reset_password_otp);
router.post("/send_reset_password_otp", send_reset_password_otp);
router.post("/verify_reset_password_otp", verify_reset_password_otp);




module.exports = router;