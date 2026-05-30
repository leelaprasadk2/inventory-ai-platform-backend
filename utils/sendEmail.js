import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },

  family: 4 // Force IPv4
});


// SMTP VERIFY

transporter.verify()

.then(() => {

  console.log("✅ SMTP Connected Successfully v2");

})

.catch((error) => {

  console.log("❌ SMTP ERROR");

  console.log(error);

});


const sendEmail = async (

  email,
  subject,
  html

) => {

  try {

    const info =

    await transporter.sendMail({

      from: {

        name: "Inventory AI",

        address: process.env.EMAIL_USER

      },

      to: email,

      subject,

      html

    });

    console.log("📧 Email Sent");

    console.log(info.messageId);

    return info;

  }

  catch (error) {

    console.log("❌ EMAIL ERROR");

    console.log(error);

    throw error;

  }

};

export default sendEmail;