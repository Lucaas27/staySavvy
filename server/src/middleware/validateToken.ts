import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.auth_token;

  if (!token) {
    return res.json({ message: "no token provided", isLoggedIn: false });
  }

  try {
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    );
    req.userId = (decodedToken as JwtPayload).userId;
    next();
  } catch (error) {
    res.clearCookie("auth_token");
    return res.status(401).json({ message: "unauthorized", isLoggedIn: false });
  }
};

export { validateToken };
