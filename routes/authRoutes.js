import express from "express";

import {

  register,
  login,
  verifyEmail,
  forgotPassword,
  resetPassword,
  googleLogin

} from "../controllers/authController.js";

import sendEmail from "../utils/sendEmail.js";

const router = express.Router();


// =========================
// REGISTER
// =========================

router.post(

  "/register",

  register

);


// =========================
// LOGIN
// =========================

router.post(

  "/login",

  login

);


// =========================
// VERIFY EMAIL
// =========================

router.get(

  "/verify-email/:token",

  verifyEmail

);


// =========================
// FORGOT PASSWORD
// =========================

router.post(

  "/forgot-password",

  forgotPassword

);


// =========================
// RESET PASSWORD
// =========================

router.post(

  "/reset-password/:token",

  resetPassword

);


// =========================
// GOOGLE LOGIN
// =========================

router.post(

  "/google",

  googleLogin

);

// =========================
// TEST EMAIL
// =========================

router.get(

  "/test-email",

  async (req, res) => {

    try {

      await sendEmail(

        "YOUR_PERSONAL_EMAIL@gmail.com",

        "Brevo Test",

        "<h1>Email Working Successfully</h1>"

      );

      res.status(200).json({

        success: true,

        message: "Email sent"

      });

    }

    catch (error) {

      console.log("TEST EMAIL ERROR");

      console.log(error);

      res.status(500).json({

        success: false,

        message: error.message

      });

    }

  }

);


export default router;