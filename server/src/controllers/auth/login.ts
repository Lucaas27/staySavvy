import { Request, Response } from "express";
import User from "../../models/user";
import bcrypt from "bcryptjs";
import { tokenGenerator } from "../../utils/tokenGenerator";

export const login = async (req: Request, res: Response) => {
  /*
    Given a user sends a request with password and email
    And the user email exists in mongodb
    When bcrypt compares the password in the request and it matches the password in mongodb
    Then return a signed jwt auth_token to the user as a cookie
    Then return a successful message to the client
  */
  try {
    // Given a user sends a request with password and email
    // And the user email exists in mongodb
    const { password, email } = req.body;

    const user = await User.findOne({ email: { $eq: email } });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // When bcrypt compares the password in the request and it matches the password in mongodb
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Then return a signed jwt auth_token to the user as a cookie
    tokenGenerator(res, user);

    // Then a successful message is returned to the client
    return res.status(200).json({ userId: user._id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
