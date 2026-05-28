import nodemailer from "nodemailer";


// =========================
// CREATE TRANSPORTER
// =========================

const transporter =
nodemailer.createTransport({

host:"smtp.gmail.com",

port:587,

secure:false,

pool:true,

maxConnections:5,

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


// =========================
// VERIFY SMTP ON STARTUP
// =========================

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

console.log(
error.message
);

});



// =========================
// SEND EMAIL
// =========================

const sendEmail = async(

email,
subject,
html

)=>{

try{


// =========================
// SEND MAIL
// =========================

const info=

await transporter.sendMail({

from:{

name:
"Inventory AI",

address:
process.env.EMAIL_USER

},

to:email,

subject,

html,

text:
"Please open this email in HTML supported mode."

});


// =========================
// SUCCESS LOGS
// =========================

console.log(

"📧 Email sent:",

info.messageId

);

console.log(

"📩 Receiver:",

email

);

console.log(

"✅ Accepted:",

info.accepted

);

console.log(

"❌ Rejected:",

info.rejected

);

console.log(

"━━━━━━━━━━━━━━━━━━"

);


return info;

}

catch(error){

console.log(

"❌ EMAIL ERROR"

);

console.log(

error.message

);

console.log(

"━━━━━━━━━━━━━━━━━━"

);

throw error;

}

};

export default sendEmail;