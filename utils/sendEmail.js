import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (email, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject,
      html,
    });

    console.log("Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Email Error:", error);
    throw error;
  }
};

export default sendEmail;