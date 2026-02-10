import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { connectDB, PORT } from './config';
import regRoutes from './routes/reg';
import profileRoutes from './routes/profile';
import { clerkMiddleware } from "@clerk/express";
import { healthCheck } from "./controllers/health.controller";
import path from "node:path";

const app = express();
// Connect DB
connectDB();
// Middleware
app.use(cors({ 
  origin: process.env.NODE_ENV === 'production'
          ? "https://helpme-car.herokuapp.com"
          : "http://localhost:5173", 
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
app.use(morgan('dev'));


// Clerk Middleware // Pass keys explicitly to the middleware
app.use(clerkMiddleware({
  publishableKey: process.env.VITE_CLERK_PUBLISHABLE_KEY,
  secretKey: process.env.CLERK_SECRET_KEY,
})); //This must be before the routes
// Profile Route
// Reg route
app.use("/api/reg", regRoutes);
// Example test route
app.use("/api/profile", profileRoutes);
app.get('/healthcheck', healthCheck);

if (process.env.NODE_ENV === 'production') {
  // Use process.cwd() to get the absolute root of the Heroku app
  const root = process.cwd();
  
  app.use(express.static(path.join(root, 'dist')));

  app.get('(.*)', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });
}

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Sever running on http://localhost:${PORT}`);
});