import { Request, Response } from "express";
import User from "../../models/user";
import { tokenGenerator } from "../../utils/tokenGenerator";

export const register = async (req: Request, res: Response) => {
  /*
    Given user sends a request with an email and password in the body
    When a user does not have an account already
    Then save the email into mongodb
    Then save the password which is encrypted using bcrypt in the user model
    Then sign a jwt auth_token and return to the user as a cookie
    Then return a successful message to the client
  */
  try {
    // Given user sends a request with an email and password in the body
    // When a user does not have an account already
    let user = await User.findOne({
      email: req.body.email,
    });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Then save the email into mongodb
    // Then save the password which is encrypted using bcrypt in the user model
    user = new User(req.body);
    await user.save();

    // Then sign a jwt auth_token and return to the user as a cookie
    tokenGenerator(res, user);

    // Then return a successful message to the client
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
