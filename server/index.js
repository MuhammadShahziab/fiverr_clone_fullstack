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
import path from "path";
const app = express();
dotenv.config();
const _dirname = path.resolve();
const connect = async () => {
  mongoose.set("strictQuery", true);
  try {
    await mongoose.connect(process.env.MONGO);

    console.log("Connected to MongoDB!");
  } catch (error) {
    console.log(error);
  }
};
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use("/api/users", userRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/orders", orderRoute);
app.use("/api/conversation", conversationRoute);
app.use("/api/message", messageRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/notifications", notificationRoute);
app.use("/api/auth", authRoute);
app.use("/api/favList", favListRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";

  return res.status(errorStatus).send(errorMessage);
});

app.use(express.static(path.join(_dirname, "/client/dist")));
app.get("*", (_, res) => {
  res.sendFile(path.resolve(_dirname, "client", "dist", "index.html"));
});
app.listen(8800, () => {
  connect();
  console.log("Backend Server is running");
});
