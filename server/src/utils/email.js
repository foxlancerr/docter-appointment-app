// utils/email.js

import nodemailer from "nodemailer";

export const sendEmail = async (options) => {
  let transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "08341519c2909a",
      pass: "e4ed1e3e08eab1",
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: options.email,
    subject: options.subject,
    html: options.message,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return {
      message: "successfully sended pl verify it",
      success: false,
      data: info,
    };
  } catch (error) {
    console.error("Error sending email: ", error.message);
    return {
      message: "Node mailer server side error issues",
      success: false,
    };
  }
};
