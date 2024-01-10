import { check, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { IValidation } from "../interfaces/IValidation";

export const registerValidationRules = () => {
  return [
    check("email", "Email is required").isEmail(),
    check(
      "password",
      "Password with 6 or more characters is required"
    ).isLength({
      min: 6,
    }),
    check("firstName", "First Name is required").isString().notEmpty(),
    check("lastName", "Last Name is required").isString(),
  ];
};

export const authValidationRules = () => {
  return [
    check("email", "Email is required").isEmail(),
    check(
      "password",
      "Password with 6 or more characters is required"
    ).isLength({
      min: 6,
    }),
  ];
};

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const validationErrors = validationResult(req);

  if (validationErrors.isEmpty()) {
    return next();
  }

  const extractedErrors: IValidation[] = [];

  validationErrors
    .array()
    .map((err) => extractedErrors.push({ [(err as any).path]: err.msg }));

  return res.status(400).json({ message: extractedErrors });
};
