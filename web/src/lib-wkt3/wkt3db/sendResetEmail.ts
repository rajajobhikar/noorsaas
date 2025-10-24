"use server";
import nodemailer from "nodemailer";

const domain = process.env.NEXT_PUBLIC_APP_URL;

const SMTP_SERVER_HOST = process.env.EMAIL_SERVER_HOST;
const SMTP_SERVER_USERNAME = process.env.EMAIL_SERVER_USER;
const SMTP_SERVER_PASSWORD = process.env.EMAIL_SERVER_PASSWORD;
const SITE_MAIL_RECIEVER = process.env.EMAIL_MAIL_RECIEVER;

export async function sendResetEmail(email: string, token: string) {
  const link = `${domain}/reset-password?token=${token}`;
  console.log("📧 Reset link:", link);

  const transporter = nodemailer.createTransport({
    service: "smtp.hostinger.com",
    host: SMTP_SERVER_HOST,
    port: 465,
    secure: true,
    requireTLS: true,
    tls: {
      ciphers: "SSLv3",
    },
    auth: {
      user: SMTP_SERVER_USERNAME,
      pass: SMTP_SERVER_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: "WKT3 Support",
    to: email || SITE_MAIL_RECIEVER,
    subject: "Reset your WKT3 password",
    html: `<p>Click to reset your password:</p><a href="${link}">${link}</a>`,
  });
  console.log("Message Sent", info.messageId);
  console.log("Mail sent to", email);
  return info;
}
