const mailer = require("../config/nodemailer.config");

module.exports = ({ to, subject, text }) =>
  mailer.sendMail({
    from: `${process.env.USER_EMAIL}`,
    to,
    subject,
    text
  });
