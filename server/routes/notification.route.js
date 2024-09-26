import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import {
  getNotifications,
  updateNotification,
} from "../controllers/notification.controller.js";

const router = express.Router();

router.get("/", verifyToken, getNotifications);
router.put("/:id", verifyToken, updateNotification);

export default router;
