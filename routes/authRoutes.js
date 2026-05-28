import express from "express";

import {

  register,
  login,
  verifyEmail,
  forgotPassword,
  resetPassword,
  googleLogin

} from "../controllers/authController.js";

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


export default router;