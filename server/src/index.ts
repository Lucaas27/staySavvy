import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
// import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import cookieParser from "cookie-parser";
import { unknownEndpoint } from "./middleware/unknownEndpoint";
import { reqLogger } from "./middleware/logger";
import path from "path";
import { rateLimit } from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window`
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
});

const app = express();

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => {
    console.info(`Connected to MongoDB`);
  })
  .catch((e) => {
    console.error("Error connecting to MongoDB:", e.message);
  });

app.use(express.static(path.join(__dirname, "../../client/dist")));
// Apply the rate limiting middleware to all requests.
app.use(limiter);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
    credentials: true, // <= Accept credentials (cookies) sent by the client
  })
);

app.use(reqLogger());
// app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use(unknownEndpoint);

app.listen(process.env.SERVER_PORT, () => console.info(`Server is running on port ${process.env.SERVER_PORT}`));
