import { Request, Response } from "express";
import User from "../../models/user";
import bcrypt from "bcryptjs";
import { tokenGenerator } from "../../utils/tokenGenerator";

export const login = async (req: Request, res: Response) => {
  try {
    const { password, email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    tokenGenerator(res, user);

    return res.status(200).json({ userId: user._id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
