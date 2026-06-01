import nodemailer from "nodemailer";

console.log("SMTP HOST:", "smtp-relay.brevo.com");
console.log("SMTP USER:", process.env.BREVO_SMTP_LOGIN);
console.log(
  "SMTP KEY EXISTS:",
  !!process.env.BREVO_SMTP_KEY
);

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 465,
  secure: true, // IMPORTANT

  auth: {
    user: process.env.BREVO_SMTP_LOGIN,
    pass: process.env.BREVO_SMTP_KEY
  }
});

const sendEmail = async (email, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Inventory AI" <${process.env.BREVO_EMAIL}>`,
      to: email,
      subject,
      html
    });

    console.log("✅ Email Sent:", info.messageId);
    return info;

  } catch (error) {
    console.log("❌ EMAIL ERROR");
    console.log(error);
    throw error;
  }
};

export default sendEmail;