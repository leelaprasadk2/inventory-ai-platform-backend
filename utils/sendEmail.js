import nodemailer from "nodemailer";
import dns from "dns";

dns.setDefaultResultOrder("ipv4first");

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },

  family: 4
});

const sendEmail = async (email, subject, html) => {
  try {

    const info = await transporter.sendMail({
      from: {
        name: "Inventory AI",
        address: process.env.EMAIL_USER
      },
      to: email,
      subject,
      html
    });

    console.log("📧 Email Sent");
    return info;

  } catch (error) {

    console.error("❌ EMAIL ERROR");
    console.error(error);

    throw error;
  }
};

export default sendEmail;