import express from "express";

import {
  translateCampaign
}
from "../controllers/translateController.js";

const router =
  express.Router();

router.post(
  "/",
  translateCampaign
);

export default router;