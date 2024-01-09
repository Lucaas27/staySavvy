import express, { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";

const router = express.Router();

/*

/api/users/register

*/
router.post(
  "/register",
  [
    check("email", "Email is required").isEmail(),
    check(
      "password",
      "Password with 6 or more characters is required"
    ).isLength({ min: 6 }),
    check("firstName", "First Name is required").isString().notEmpty(),
    check("lastName", "Last Name is required").isString(),
  ],
  async (req: Request, res: Response) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      const errorMessages = validationErrors.array().map((error) => ({
        field: (error as any).path,
        error: error.msg,
      }));

      return res.status(400).json({ message: errorMessages });
    }

    try {
      let user = await User.findOne({
        email: req.body.email,
      });

      if (user) return res.status(400).json({ message: "User already exists" });

      user = new User(req.body);
      await user.save();

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

      return res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

export default router;
