import express, { RequestHandler } from "express";
import { authValidationRules, validate } from "../middleware/validator";
import { login } from "../controllers/auth/login";
import { validateToken } from "../controllers/auth/validateToken";
import { checkToken } from "../middleware/auth";
const router = express.Router();

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

/*
/api/account/auth
*/
router.post("/login", authValidationRules(), validate, login);
router.post("/validate-token", checkToken, validateToken);

export default router;
