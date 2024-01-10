import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/users";
import accountRoutes from "./routes/accounts";

const app = express();

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => {
    console.info("Connected to MongoDB");
  })
  .catch((e) => {
    console.error("Error connecting to MongoDB:", e.message);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/accounts", accountRoutes);

app.listen(3000, () => console.info("Server is running on port 3000"));
