"use server";
import nodemailer from "nodemailer";

const domain = process.env.NEXT_PUBLIC_APP_URL;

const SMTP_SERVER_HOST = process.env.EMAIL_SERVER_HOST;
const SMTP_SERVER_USERNAME = process.env.EMAIL_SERVER_USER;
const SMTP_SERVER_PASSWORD = process.env.EMAIL_SERVER_PASSWORD;
const SITE_MAIL_RECIEVER = process.env.EMAIL_MAIL_RECIEVER;

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

export async function sendMail({
  email,
  sendTo,
  subject,
  text,
  html,
}: {
  email: string;
  sendTo?: string;
  subject: string;
  text: string;
  html?: string;
}) {
  try {
    const isVerified = await transporter.verify();
    console.log(isVerified);
  } catch (error) {
    console.error(
      "Something Went Wrong",
      SMTP_SERVER_USERNAME,
      SMTP_SERVER_PASSWORD,
      error
    );
    return;
  }
  const info = await transporter.sendMail({
    from: email,
    to: sendTo || SITE_MAIL_RECIEVER,
    subject: subject,
    text: text,
    html: html ? html : "",
  });
  console.log("Message Sent", info.messageId);
  console.log("Mail sent to", sendTo);
  return info;
}

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  const twoFactor = await transporter.sendMail({
    from: email,
    to: email || SITE_MAIL_RECIEVER,
    subject: "Your Security 2FA Code is",
    html: `<p>Your 2FA Code is ${token}</p>`,
  });
  console.log("Message Sent", twoFactor.messageId);
  console.log("Mail sent to", email);
  return twoFactor;
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/newPassword?token=${token}`;

  const resetPass = await transporter.sendMail({
    from: email,
    to: email || SITE_MAIL_RECIEVER,
    subject: "Reset your Account Password",
    html: `<p> Click <a href=" ${resetLink} "> 👆🎬📽🎥 HERE </a> to Reset your Account Password!🔁/p>`,
  });
  console.log("Message Sent", resetPass.messageId);
  console.log("Mail sent to", email);
  return resetPass;
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/newVerification?token=${token}`;

  const veriEmail = await transporter.sendMail({
    from: email,
    to: email || SITE_MAIL_RECIEVER,
    subject: "Confirm your Account Verification",
    // html: `<p> Click <a href=" ${confirmLink} "> 👆 HERE </a> to Confirm your Account Verification ⏲⏳</p>`,
    html: `
     <html>
    <body style="font-family: Arial, sans-serif; background: #f9f9f9; padding: 20px;">
      <table align="center" style="max-width: 600px; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <tr>
          <td style="background: #0d47a1; padding: 20px;">
            <h1 style="color: white; text-align: center; margin: 0;">WKT3</h1>
          </td>
        </tr>
        <tr>
          <td style="padding: 20px;">
            <p>Hi <strong>${email}</strong>,</p>
            <p>Thank you for registering with <strong>WKT3</strong>.</p>
            <p>Please verify your email to activate your account:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${confirmLink}" style="background: #0d47a1; color: white; text-decoration: none; padding: 12px 20px; border-radius: 4px; font-weight: bold;">Verify Email</a>
            </div>
            <p>If you did not create an account, please ignore this email.</p>
            <p>Regards,<br/>The WKT3 Team</p>
          </td>
        </tr>
        <tr>
          <td style="background: #eee; text-align: center; padding: 10px; font-size: 12px; color: #777;">
            © ${new Date().getFullYear()} WKT3. All rights reserved.
          </td>
        </tr>
      </table>
    </body>
    </html>
    
    `,
  });
  console.log("Message Sent", veriEmail.messageId);
  console.log("Mail sent to", email);
  return veriEmail;
};
