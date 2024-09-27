import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import orderRoute from "./routes/order.route.js";
import messageRoute from "./routes/message.route.js";
import gigRoute from "./routes/gig.route.js";
import conversationRoute from "./routes/conversation.route.js";
import reviewRoute from "./routes/review.route.js";
import userRoute from "./routes/user.route.js";
import notificationRoute from "./routes/notification.route.js";
import favListRoute from "./routes/favList.route.js";
import authRoute from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
const app = express();

// MongoDB connection function
const connect = async () => {
  mongoose.set("strictQuery", true);
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
  }
};

// Middleware to parse JSON and cookies
app.use(express.json());
app.use(cookieParser());

// Define allowed origins for CORS (development and production)
app.use(
  cors({
    origin: [process.env.CLIENT_URL || "http://localhost:5173"], // Allow both local and deployed frontends
    credentials: true, // This is important for sending cookies/auth tokens
  })
);
// Routes
app.use("/api/users", userRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/orders", orderRoute);
app.use("/api/conversation", conversationRoute);
app.use("/api/message", messageRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/notifications", notificationRoute);
app.use("/api/auth", authRoute);
app.use("/api/favList", favListRoute);
app.get("/api/health", (req, res) => {
  res.status(200).send("Backend is healthy");
});
// Error handling middleware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  console.error(err); // Log the error for debugging
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
  });
});

// Start backend server
const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
  connect();
  console.log(`Backend server is running on port ${PORT}`);
});
