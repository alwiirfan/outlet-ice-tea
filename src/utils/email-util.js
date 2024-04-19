import "dotenv/config";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "smtp.mailtrap.io",
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendEmailRegistration = async (email, text, link) => {
  const mailOptions = {
    from: `Ice Tea <icetea@indo.com>`,
    to: email,
    text: `Hello, welcome to Ice Tea App. Mr/Mrs. ${email}, ${text}`,
    html: `<h3> Please click here to activate your account:</h3> <a href="${link}"> Activate Account</a>`,
  };
  return transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
