const nodemailer = require("nodemailer");

const sendForgotPasswordOtpEmail = (email, otp, userType) => {
  return new Promise((resolve, reject) => {
    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      service: "gmail",
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // afjgoacwipxnpula     app password for agri plus

    let mailOptions = {
      from: `NO-REPLY ${process.env.EMAIL_AUTH_USER}`,
      to: email,
      subject: "Password Reset OTP for CareMate Account",
      html: `<h1>${otp}</h1>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("Email sending error: ", error);
        reject(error);
      } else {
        console.log("Email sent: ", info.response);
        resolve(info);
      }
    });
  });
};

module.exports = {
  sendForgotPasswordOtpEmail,
};
