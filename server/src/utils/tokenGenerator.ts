import jwt from "jsonwebtoken";
import { Response } from "express";
import { IUser } from "../interfaces/IUser";
import { Document } from "mongoose";

export const tokenGenerator = (res: Response, user: Document<unknown, {}, IUser>) => {
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY as string, { expiresIn: process.env.NODE_ENV === "production" ? "1h" : "1d" });

  res.cookie("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: process.env.NODE_ENV === "production" ? 3600000 /* 1h */ : 86400000 /* 1 day */,
  });
};
