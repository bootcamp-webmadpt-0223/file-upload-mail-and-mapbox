require("dotenv/config");
const nodemailer = require("nodemailer");

// create reusable transporter object using the default SMTP transport
// Invalid login error when using email/password: https://stackoverflow.com/a/73365201
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

// verify connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Email Server is ready to take our messages");
  }
});

module.exports = transporter;
