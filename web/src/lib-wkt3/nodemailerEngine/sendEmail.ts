"use server";
import nodemailer from 'nodemailer';
import { otpTemplate } from '../emailTemplates/otpTemplate';


const SMTP_SERVER_HOST = process.env.EMAIL_SERVER_HOST;
const SMTP_SERVER_USERNAME = process.env.EMAIL_SERVER_USER;
const SMTP_SERVER_PASSWORD = process.env.EMAIL_SERVER_PASSWORD;
const SITE_MAIL_RECIEVER = process.env.EMAIL_MAIL_RECIEVER;


export async function sendOtpEmail(email: string, code: string) {
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
    from: email,
    to: SITE_MAIL_RECIEVER,
    subject: "Your OTP Code",
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
            <p>${otpTemplate(code)} is here</p>
            <p>Thank you for registering with <strong>WKT3</strong>.</p>
            <p>Please verify your email to activate your account:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${otpTemplate(code)}" style="background: #0d47a1; color: white; text-decoration: none; padding: 12px 20px; border-radius: 4px; font-weight: bold;">Verify Email</a>
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
  console.log("Message Sent", info.messageId);
  return info;
}

