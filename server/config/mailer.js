const nodemailer = require("nodemailer");

const createTransporter = () => {
  // Only create transporter if SMTP credentials are configured
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER) {
    console.warn("⚠️  Email not configured — SMTP credentials missing in .env");
    return null;
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT, 10) || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

module.exports = createTransporter;
