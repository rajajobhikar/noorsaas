"use server";
import nodemailer from "nodemailer";

const domain = process.env.NEXT_PUBLIC_APP_URL;

const SMTP_SERVER_HOST = process.env.EMAIL_SERVER_HOST;
const SMTP_SERVER_USERNAME = process.env.EMAIL_SERVER_USER;
const SMTP_SERVER_PASSWORD = process.env.EMAIL_SERVER_PASSWORD;
const SITE_MAIL_RECIEVER = process.env.EMAIL_MAIL_RECIEVER;

export async function sendVerificationEmail(email: string, token: string) {
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
  // build verify link from the provided token
  const verifyLink = `${domain}/api/auth/verify-email?token=${token}`;

    const info = await transporter.sendMail({
      from: "Wkt3 Account Verification",
      to: email || SITE_MAIL_RECIEVER,
      subject: "Verify your WKT3 account",
      html: `<p>Click the link to verify your email:</p><a href="${verifyLink}">${verifyLink}</a>`,
    });
  console.log("Message Sent", info.messageId);
  console.log("Mail sent to", email);
  return info;
}
