import { Router } from "express";
import { getProfile, updateProfile, getLeaderboard } from "../controllers/profile.controller";
// import { requireAuth } from "@clerk/express";

const router = Router();

// @desc get profile
router.get("/", getProfile); // did have requireAuth(), as middle ware, hold off for now

// @desc upate profile
router.put("/", updateProfile); // did have requireAuth(), as middle ware, hold off for now

// @desc get leaderboard
router.get("/leaderboard", getLeaderboard); // PUBLIC route so guests can see how cool the users are

export default router;