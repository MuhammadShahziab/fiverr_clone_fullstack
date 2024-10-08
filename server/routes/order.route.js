import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import {
  getOrders,
  intent,
  confirm,
  upudateOrder,
} from "../controllers/order.controller.js";

const router = express.Router();

router.get("/", verifyToken, getOrders);
router.post("/create-payment-intent/:gigId", verifyToken, intent);
router.post("/", verifyToken, confirm);
router.put("/:id", verifyToken, upudateOrder);

export default router;
