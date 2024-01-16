import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const checkToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies["auth_token"];

  if (!token) {
    return res.status(401).json({ message: "unauthorised" });
  }

  try {
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    );
    req.userId = (decodedToken as JwtPayload).userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "unauthorised" });
  }
};

export { checkToken };
