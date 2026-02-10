import type { Request, Response } from 'express';
import Profile from '../models/Profile';
import { createClerkClient, getAuth } from '@clerk/express';

const clerkClient = createClerkClient({ 
  publishableKey: process.env.VITE_CLERK_PUBLISHABLE_KEY,
  secretKey: process.env.CLERK_SECRET_KEY 
});

// GET Profile
export const getProfile = async (req: Request, res: Response ) => {

  try {
    const { userId } = getAuth(req);

    if ( !userId ) {
      return res.status(401).json({ message: "Unauthenticated" }) 
    };

    let profile = await Profile.findOne({ clerkId: userId });

    // Create on first login
    if (!profile) {
      const user = await clerkClient.users.getUser(userId);

      profile = await Profile.create({
        clerkId: userId,
        userId: userId,
        // User ?? to provide fallbacks for required string fields
        firstName: user.firstName ?? "New",
        lastName: user.lastName ?? "User",
        username: user.username ?? user.firstName ?? `user_${userId.slice(-5)}`,
        email: user.emailAddresses[0]?.emailAddress ?? "",

        // Daefault values for other fields
        theme: "light",
        superpowers: [],
        starsGiven: 0,
        carsHelped: 0,
      });
      console.log("New profile created in MongoDB");
    }

    res.json(profile);
  } catch (err: any) {
    console.error("Detailed backend error", err.message);
    res.status(500).json({ message: err.message }); // "Server error"
  }
};

// PUT Profile
export const updateProfile = async ( req: Request, res: Response ) => {
  const stars = ["⭐", "🌟", "✨"];

  try {
    const { userId } = getAuth(req); // identify user from Clerk token
    if ( !userId ) return res.status(401).json({ message: "Unauthenticated" });
  
    // Filter out undefined values to prevent overwriting with null
    const updateData = Object.fromEntries(
      Object.entries(req.body).filter(([_, v]) => v !== undefined)
    );

    const updatedProfile = await Profile.findOneAndUpdate(
      { clerkId: userId },
      { $set: updateData },
      { new: true, runValidators: true }, // Return the NEW docs and check Schema
    );

    res.json(updatedProfile);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET Leaderboard (Top 10)
export const getLeaderboard = async ( _req: Request, res: Response ) => {
  try {
    // Find users, sort by totalStars (descending), limit to 10
    const leaderboard = await Profile.find({})
      .sort({ totalStars: -1 })
      .limit(10)
      .select('username totalStars carsHelped'); // Only send what we need

    res.json(leaderboard);
  } catch (err: any) {
    console.error("Backend error", err.message);
    res.status(501).json({ message: "Failed to fetch leaderboard" });
  }
};