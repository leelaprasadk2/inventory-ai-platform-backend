import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.BREVO_SMTP_LOGIN,
    pass: process.env.BREVO_SMTP_KEY,
  },
});

const sendEmail = async (email, subject, html) => {
  return transporter.sendMail({
    from: process.env.BREVO_EMAIL,
    to: email,
    subject,
    html,
  });
};

export default sendEmail;