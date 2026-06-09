import SibApiV3Sdk from "sib-api-v3-sdk";

const client = SibApiV3Sdk.ApiClient.instance;

client.authentications["api-key"].apiKey =
  process.env.BREVO_API_KEY;

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
console.log("VERIFY URL:", verifyUrl);
console.log("RESET URL:", resetUrl);
const sendEmail = async (email, subject, html) => {
  try {
    const result = await apiInstance.sendTransacEmail({
      sender: {
        email: process.env.BREVO_EMAIL,
        name: "Inventory AI",
      },
      to: [
        {
          email,
        },
      ],
      subject,
      htmlContent: html,
    });

    console.log("Email sent:", result);
    return result;
  } catch (error) {
    console.error("Email Error:", error);
    throw error;
  }
};

export default sendEmail;