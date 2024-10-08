import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import {
  createGig,
  deleteGig,
  getGig,
  getSuggestions,
  getGigs,
} from "../controllers/gig.controller.js";
const router = express.Router();

router.post("/", verifyToken, createGig);
router.delete("/:id", verifyToken, deleteGig);
router.get("/single/:id", getGig);
router.get("/", getGigs);
router.get("/suggestions", getSuggestions);

export default router;

// const router = express.Router();

// router.post("/", verifyToken, createGig);
// router.delete("/:id", verifyToken, deleteGig);
// router.get("/single/:id", verifyToken, getGig);
// router.get("/", verifyToken, getGigs);

// export default router;
