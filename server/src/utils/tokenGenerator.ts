import jwt from "jsonwebtoken";
import { Response } from "express";
import { IUser } from "../interfaces/IUser";
import { Document } from "mongoose";

export const tokenGenerator = (
  res: Response,
  user: Document<unknown, {}, IUser>
) => {
  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET_KEY as string,
    { expiresIn: "1d" }
  );

  res.cookie("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 86400000,
  });
};
