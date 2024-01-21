import { Request, Response } from "express";

export const logout = async (req: Request, res: Response) => {
  res.cookie("auth_token", "", { expires: new Date(0) });
  return res.json({ message: "success" });
};
