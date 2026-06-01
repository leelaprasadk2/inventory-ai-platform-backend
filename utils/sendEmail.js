import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({

  host: "smtp-relay.brevo.com",

  port: 587,

  secure: false,

  auth: {

    user: process.env.BREVO_SMTP_LOGIN,

    pass: process.env.BREVO_SMTP_KEY

  }

});

const sendEmail = async (
  email,
  subject,
  html
) => {

  const info = await transporter.sendMail({

    from: `"Inventory AI" <${process.env.BREVO_EMAIL}>`,

    to: email,

    subject,

    html

  });

  console.log("✅ Email Sent:", info.messageId);

  return info;
};

export default sendEmail;