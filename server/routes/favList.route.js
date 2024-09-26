import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import {
  addToFavList,
  createFavList,
  getFavGigs,
  removeToFavList,
  getCreatedList,
  deleteFavList,
  updateFavList,
} from "../controllers/favList.controller.js";

const router = express.Router();

router.get("/", verifyToken, getCreatedList);
router.get("/:listName", verifyToken, getFavGigs);
router.post("/create", verifyToken, createFavList);
router.post("/:listId", verifyToken, addToFavList);
router.put("/:listId", verifyToken, updateFavList);

router.post("/remove/:listId", verifyToken, removeToFavList);
router.delete("/deleteList/:listId", verifyToken, deleteFavList);

export default router;
