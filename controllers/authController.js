import User from "../models/User.js";
import Notification from "../models/Notification.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import crypto from "crypto";

import sendEmail from "../utils/sendEmail.js";

import { OAuth2Client } from "google-auth-library";

const googleClient =
new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID
);


// =========================
// GENERATE JWT
// =========================

const generateToken = (user) => {

  return jwt.sign(

    {

      id: user._id,
      role: user.role

    },

    process.env.JWT_SECRET,

    {

      expiresIn: "7d"

    }

  );

};


// =========================
// REGISTER
// =========================

export const register =
async (req,res)=>{

try{

const {

name,
email,
password,
role

} = req.body;


// =========================
// CHECK USER
// =========================

const existingUser =
await User.findOne({

email

});

if(existingUser){

  // Existing but not verified

  if(!existingUser.isVerified){

    const verifyToken =

    crypto.randomBytes(32)
    .toString("hex");

    existingUser.verifyToken =
    verifyToken;

    existingUser.verifyTokenExpire =

    Date.now() + 3600000;

    await existingUser.save();

    const verifyUrl =

    `${process.env.CLIENT_URL}/verify-email/${verifyToken}`;

    await sendEmail(

      existingUser.email,

      "Verify Email",

      `
      <h2>Hello ${existingUser.name}</h2>

      <p>
      Click below to verify account
      </p>

      <a href="${verifyUrl}">
      Verify Account
      </a>
      `
    );

    return res.status(200).json({

      success:true,

      message:
      "Verification email resent"

    });

  }

  return res.status(400).json({

    success:false,

    message:
    "User already exists"

  });

}


// =========================
// HASH PASSWORD
// =========================

const hashedPassword =
await bcrypt.hash(

password,
10

);


// =========================
// CREATE VERIFY TOKEN
// =========================

const verifyToken =

crypto.randomBytes(32)
.toString("hex");


// =========================
// CREATE USER
// =========================

const user =
await User.create({

name,

email,

password:
hashedPassword,

role:
role || "user",

verifyToken,

verifyTokenExpire:

Date.now()
+3600000

});


// =========================
// EMAIL LINK
// =========================

const verifyUrl =

`${process.env.CLIENT_URL}/verify-email/${verifyToken}`;

/*await sendEmail(

email,

"Verify Your Inventory AI Account",

`

<div style="
font-family:Arial,sans-serif;
padding:30px;
text-align:center;
background:#f4f7fb;
">

<div style="
max-width:600px;
margin:auto;
background:white;
padding:40px;
border-radius:15px;
box-shadow:0 4px 20px rgba(0,0,0,0.1);
">

<h1 style="
color:#06b6d4;
">
Inventory AI
</h1>

<h2>
Email Verification
</h2>

<p>
Hello ${name}
</p>

<p>
Please verify your account
</p>

<a
href="${verifyUrl}"

style="
display:inline-block;
margin-top:25px;
background:#06b6d4;
padding:14px 30px;
border-radius:10px;
color:white;
text-decoration:none;
"

>

Verify Account

</a>

<p style="
margin-top:20px;
font-size:13px;
color:#999;
">

This link expires in 1 hour

</p>

</div>

</div>

`
);*/

try {

  await sendEmail(
    email,
    "Verify Your Inventory AI Account",
    htmlContent
  );

} catch(err) {

  console.log("EMAIL FAILED:", err.message);

}// =========================
// ADMIN NOTIFICATION
// =========================

const admin =
await User.findOne({

role:"admin"

});

if(admin){

await Notification.create({

userId:
admin._id,

title:
"New User Registered",

message:
`${name} registered successfully`,

type:
"new_user",

read:false

});

}

res.status(201).json({

success:true,

message:
"Registration successful. Verify your email."

});


}

catch(error){

console.log(error);

res.status(500).json({

success:false,

message:error.message

});

}

};


// =========================
// VERIFY EMAIL
// =========================

export const verifyEmail =
async(req,res)=>{

try{

const user =
await User.findOne({

verifyToken:
req.params.token,

verifyTokenExpire:{

$gt:Date.now()

}

});

if(!user){

return res.status(400)
.json({

success:false,

message:
"Invalid or expired token"

});

}

user.isVerified=true;

user.verifyToken=null;

user.verifyTokenExpire=null;

await user.save();

res.status(200).json({

success:true,

message:
"Email verified"

});

}

catch(error){

res.status(500).json({

success:false,

message:error.message

});

}

};


// =========================
// LOGIN
// =========================

export const login =
async(req,res)=>{

try{

const {

email,
password

} = req.body;

const user =
await User.findOne({

email

});

if(!user){

return res.status(404)
.json({

success:false,

message:
"User not found"

});

}


// =========================
// EMAIL CHECK
// =========================

if(!user.isVerified){

return res.status(401)
.json({

success:false,

message:
"Please verify email first"

});

}


// =========================
// PASSWORD CHECK
// =========================

// =========================
// GOOGLE USER CHECK
// =========================

if(user.googleId){

return res.status(400)
.json({

success:false,

message:
"Please login using Google"

});

}


// =========================
// PASSWORD CHECK
// =========================

const isMatch =

await bcrypt.compare(

password,
user.password

);

if(!isMatch){

return res.status(400)
.json({

success:false,

message:
"Invalid credentials"

});

}

const token =
generateToken(user);

const userResponse={

_id:user._id,

name:user.name,

email:user.email,

role:user.role,

profilePic:
user.profilePic

};

res.status(200).json({

success:true,

message:
"Login successful",

token,

user:userResponse

});

}

catch(error){

res.status(500).json({

success:false,

message:error.message

});

}

};


// =========================
// FORGOT PASSWORD
// =========================

export const forgotPassword =
async(req,res)=>{

try{

const {email}=req.body;

const user=
await User.findOne({

email

});

if(!user){

return res.status(404)
.json({

success:false,

message:
"User not found"

});

}

const resetToken=

crypto.randomBytes(32)
.toString("hex");

user.resetPasswordToken=

resetToken;

user.resetPasswordExpire=

Date.now()+3600000;

await user.save();

const resetUrl=

`${process.env.CLIENT_URL}/reset-password/${resetToken}`;

await sendEmail(

email,

"Reset Your Inventory AI Password",

`

<div style="
font-family:Arial;
padding:30px;
text-align:center;
background:#f4f7fb;
">

<div style="
max-width:600px;
margin:auto;
background:white;
padding:40px;
border-radius:15px;
box-shadow:0 4px 20px rgba(0,0,0,0.1);
">

<h1 style="
color:#06b6d4;
">

Inventory AI

</h1>

<h2>

Reset Password

</h2>

<p>

Click below to reset your password

</p>

<a
href="${resetUrl}"

style="
display:inline-block;
margin-top:20px;
padding:14px 30px;
background:#06b6d4;
color:white;
border-radius:10px;
text-decoration:none;
"

>

Reset Password

</a>

<p style="
margin-top:25px;
font-size:13px;
color:#999;
">

This link expires in 1 hour.

</p>

</div>

</div>

`

);

res.status(200).json({

success:true,

message:
"Reset link sent"

});

}

catch(error){

res.status(500).json({

success:false,

message:error.message

});

}

};


// =========================
// RESET PASSWORD
// =========================

export const resetPassword =
async(req,res)=>{

try{

const {password}=req.body;

const user=
await User.findOne({

resetPasswordToken:
req.params.token,

resetPasswordExpire:{

$gt:Date.now()

}

});

if(!user){

return res.status(400)
.json({

success:false,

message:
"Invalid token"

});

}

user.password=

await bcrypt.hash(

password,
10

);

user.resetPasswordToken=
null;

user.resetPasswordExpire=
null;

await user.save();

res.status(200).json({

success:true,

message:
"Password reset successful"

});

}

catch(error){

res.status(500).json({

success:false,

message:error.message

});

}

};


// =========================
// GOOGLE LOGIN
// =========================

export const googleLogin =
async(req,res)=>{

try{

const {token}=req.body;

const ticket=

await googleClient
.verifyIdToken({

idToken:token,

audience:
process.env.GOOGLE_CLIENT_ID

});

const payload=
ticket.getPayload();

let user=

await User.findOne({

email:
payload.email

});

if(!user){

user=

await User.create({

name:
payload.name,

email:
payload.email,

profilePic:
payload.picture,

googleId:
payload.sub,

isVerified:true

});

}

const jwtToken=

generateToken(user);

res.status(200).json({

success:true,

token:jwtToken,

user

});

}

catch(error){

res.status(500).json({

success:false,

message:error.message

});

}

};