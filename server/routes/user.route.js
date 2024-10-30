import express from "express";
import {
  deleteUser,
  getUser,
  updateUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.delete("/:id", verifyToken, deleteUser);
router.get("/:id", getUser);
router.post("/update", verifyToken, updateUser);

export default router;
