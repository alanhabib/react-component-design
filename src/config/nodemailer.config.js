require("dotenv").config();
const nodemailer = require("nodemailer");

const user = process.env.USER;
const pass = process.env.PASS;

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: user,
    pass: pass,
  },
});

module.exports.sendConfirmationEmail = async (
  name,
  email,
  confirmationCode
) => {
  await transport
    .sendMail({
      from: user,
      to: email,
      subject: "Please confirm your account",
      html: `<h1>Email Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
        <a href=http://localhost:9000/api/confirm/${confirmationCode}> Click here</a>
        </div>`,
    })
    .catch((err) => console.log(`Error when confirmation with: ${err}`));
};
