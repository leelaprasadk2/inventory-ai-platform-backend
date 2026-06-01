import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({

  host: "smtp.gmail.com",

  port: 465,

  secure: true,

  auth: {

    user: process.env.EMAIL_USER,

    pass: process.env.EMAIL_PASS

  }

});

// Verify SMTP connection when server starts

transporter.verify((error, success) => {

  if (error) {

    console.log("❌ SMTP VERIFY ERROR");
    console.log(error);

  } else {

    console.log("✅ SMTP SERVER READY");

  }

});

const sendEmail = async (

  email,
  subject,
  html

) => {

  try {

    const info = await transporter.sendMail({

      from: `"Inventory AI" <${process.env.EMAIL_USER}>`,

      to: email,

      subject,

      html

    });

    console.log("✅ Email Sent:", info.messageId);

    return info;

  }

  catch (error) {

    console.log("❌ EMAIL ERROR");
    console.log(error);

    throw error;

  }

};

export default sendEmail;