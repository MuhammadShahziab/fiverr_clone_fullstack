import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import {
  createMessage,
  getMessage,
} from "../controllers/message.controller.js";

const router = express.Router();

router.get("/:id", verifyToken, getMessage);
router.post("/", verifyToken, createMessage);

export default router;
