import nodemailer from "nodemailer";
import config from "../config";
import {logger} from "@helpers/logger";

const emailSender = async (to: string, subject: string, text: string, html: string) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: config.emailSender.email,
        pass: config.emailSender.app_password,
      },
    });

    const info = await transporter.sendMail({
      from: `"QR Code" <${config.emailSender.email}>`,
      to,
      subject,
      text,
      html,
    });

    logger.info(`📧 Email sent to ${to} | Subject: "${subject}" | Message ID: ${info.messageId}`);
  } catch (error: any) {
    logger.error(`❌ Failed to send email to ${to} | Subject: "${subject}" | Error: ${error.message}`);
  }
};

export default emailSender;
