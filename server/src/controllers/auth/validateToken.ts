import { Request, Response } from "express";

export const validateToken = async (req: Request, res: Response) =>
  res.status(200).json({ userId: req.userId });
