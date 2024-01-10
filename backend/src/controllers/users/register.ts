import { Request, Response } from "express";
import User from "../../models/user";
import { tokenGenerator } from "../../utils/tokenGenerator";

export const register = async (req: Request, res: Response) => {
  try {
    let user = await User.findOne({
      email: req.body.email,
    });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    user = new User(req.body);
    await user.save();

    tokenGenerator(res, user);

    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
