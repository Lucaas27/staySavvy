import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import cookieParser from "cookie-parser";

const app = express();

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => {
    console.info("Connected to MongoDB");
  })
  .catch((e) => {
    console.error("Error connecting to MongoDB:", e.message);
  });

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true, // <= Accept credentials (cookies) sent by the client
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.listen(process.env.SERVER_PORT, () =>
  console.info(`Server is running on port ${process.env.SERVER_PORT}`)
);
