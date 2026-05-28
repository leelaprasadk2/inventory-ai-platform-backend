import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {

  getNotifications,
  markAsRead,
  deleteNotification

} from "../controllers/notificationController.js";

const router = express.Router();


// GET ALL

router.get(

  "/",

  authMiddleware,

  getNotifications
);


// MARK AS READ

router.put(

  "/:id/read",

  authMiddleware,

  markAsRead
);


// DELETE

router.delete(

  "/:id",

  authMiddleware,

  deleteNotification
);

export default router;