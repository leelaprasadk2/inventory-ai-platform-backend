import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({

  host: "smtp.gmail.com",

  port: 587,

  secure: false,

  requireTLS: true,

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },

  tls: {
    rejectUnauthorized: false
  }

});

const sendEmail = async (email, subject, html) => {

  try {

    const info = await transporter.sendMail({

      from: `"Inventory AI" <${process.env.EMAIL_USER}>`,

      to: email,

      subject,

      html

    });

    console.log("✅ Email Sent:", info.messageId);

    return info;

  } catch (error) {

    console.error("❌ EMAIL ERROR:", error);

    throw error;

  }

};

export default sendEmail;