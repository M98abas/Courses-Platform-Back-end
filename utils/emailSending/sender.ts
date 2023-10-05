import nodemailer from "nodemailer";
import dotenv from "dotenv";
import otpMessage from "./templates/otpMessage";
import CongMessage from "./templates/congratulationMessage";
import alertMessage from "./templates/alertMessage";
import dataShow from "../emailSending/reportsTemplates/dataShow";
dotenv.config();

const sendEmail = async (message: string, to: string, subject: string) => {
  const htmlTemplate: any = otpMessage(message, to);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USERNAME,
      pass: process.env.PASSWORD,
    },
  });
  //Vjrvlu
  const mailOptions = {
    from: process.env.EMAILFROM,
    to,
    subject,
    html: htmlTemplate,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const congratulationEmail = async (
  message: string,
  to: string,
  subject: string
) => {
  const htmlTemplate: any = CongMessage(message);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USERNAME,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAILFROM,
    to,
    subject,
    html: htmlTemplate,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const alertEmail = async (message: string, to: string, subject: string) => {
  const htmlTemplate: any = alertMessage(message, to);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USERNAME,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAILFROM,
    to,
    subject,
    html: htmlTemplate,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const reportEmail = async (message: string, to: string, subject: string) => {
  const htmlTemplate: any = dataShow(message);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USERNAME,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAILFROM,
    to,
    subject,
    html: htmlTemplate,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export { sendEmail, congratulationEmail, alertEmail, reportEmail };
