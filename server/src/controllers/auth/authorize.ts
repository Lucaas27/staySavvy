import { Request, Response } from "express";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}
export const authorize = async (req: Request, res: Response) => {
  return res
    .status(200)
    .json({ message: "authorized", userId: req.userId, isLoggedIn: true });
};
