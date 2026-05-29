/*import nodemailer from "nodemailer";

const transporter =
nodemailer.createTransport({

  service:"gmail",

  auth:{

    user:
    process.env.EMAIL_USER,

    pass:
    process.env.EMAIL_PASS

  },

  tls:{

    rejectUnauthorized:false

  }

});


// VERIFY SMTP

transporter.verify()

.then(()=>{

  console.log(
    "✅ SMTP Connected Successfully"
  );

})

.catch((error)=>{

  console.log(
    "❌ SMTP Error:"
  );

  console.log(error);

});


// SEND EMAIL

const sendEmail = async(

  email,
  subject,
  html

)=>{

  try{

    const info =
    await transporter.sendMail({

      from:{

        name:"Inventory AI",

        address:
        process.env.EMAIL_USER

      },

      to:email,

      subject,

      html

    });

    console.log(
      "📧 Email sent:",
      info.messageId
    );

    return info;

  }

  catch(error){

    console.log(
      "❌ EMAIL ERROR"
    );

    console.log(error);

    throw error;

  }

};

export default sendEmail;*/