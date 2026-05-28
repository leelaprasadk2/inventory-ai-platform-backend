import express from "express";

import protect from "../middleware/authMiddleware.js";

import {

  adminOnly

} from "../middleware/role.js";

import {

  getAllUsers,
  deleteUser,
  downloadUserProducts

} from "../controllers/adminUserController.js";

const router =
  express.Router();

// =========================
// GET ALL USERS
// =========================

router.get(

  "/users",

  protect,

  adminOnly,

  getAllUsers
);

// =========================
// DOWNLOAD USER PRODUCTS
// =========================

router.get(

  "/users/:id/products",

  protect,

  adminOnly,

  downloadUserProducts
);

// =========================
// DELETE USER
// =========================

router.delete(

  "/users/:id",

  protect,

  adminOnly,

  deleteUser
);

export default router;