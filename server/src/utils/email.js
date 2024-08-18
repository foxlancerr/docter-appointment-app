// utils/email.js

import nodemailer from "nodemailer";

export const sendEmailToVerifyUser = async (options) => {
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
      success: true,
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

export const sendEmailToKnowUserQuery = async (options) => {
  let transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "08341519c2909a",
      pass: "e4ed1e3e08eab1",
    },
  });

  const mailOptions = {
    from: options.email,
    to: "muhammadasim.code@gmail.com",
    subject: options.subject,
    html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px; background-color: #f9f9f9;">
      <h2 style="text-align: center; color: #023e7d;">New Message from ${
        options.email
      }</h2>
      <hr style="border: 0; height: 1px; background-color: #eaeaea; margin: 20px 0;">
     
      
      <div style="margin-bottom: 20px;">
        <h3 style="color: #023e7d; margin-bottom: 5px;">Message:</h3>
        <p style="margin: 0; padding: 20px; background-color: #fff; border: 1px solid #eaeaea; border-radius: 4px;">${
          options.message
        }</p>
      </div>
      <hr style="border: 0; height: 1px; background-color: #eaeaea; margin: 20px 0;">
      <footer style="text-align: center; font-size: 14px; color: #777;">
        <p style="margin: 0;">&copy; ${new Date().getFullYear()} Doctorz</p>
      </footer>
    </div>
  `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return {
      message:
        "Email is sended successfully, and you will be responded as soon as possible",
      success: true,
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
