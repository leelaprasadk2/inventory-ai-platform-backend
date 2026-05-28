import express from "express";

import {

  getProfile,
  updateProfile,

} from "../controllers/userController.js";

import protect
from "../middleware/authMiddleware.js";

import upload
from "../middleware/uploadMiddleware.js";

const router =
  express.Router();

// =========================
// GET PROFILE
// =========================

router.get(

  "/profile",

  protect,

  getProfile
);

// =========================
// UPDATE PROFILE
// =========================

router.put(

  "/profile",

  protect,

  upload.single(
    "profilePic"
  ),

  updateProfile
);

export default router;