import { Resend } from "resend";

const resend = new Resend(
  process.env.RESEND_API_KEY
);

const sendEmail = async (
  email,
  subject,
  html
) => {
  try {

    const data = await resend.emails.send({

      from: process.env.EMAIL_FROM,

      to: email,

      subject,

      html

    });

    console.log("✅ Email Sent");
    console.log(data);

    return data;

  } catch (error) {

    console.log("❌ EMAIL ERROR");
    console.log(error);

    throw error;

  }
};

export default sendEmail;