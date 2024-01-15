import express from "express";
import { authValidationRules, validate } from "../utils/validator";
import { login } from "../controllers/auth/login";
const router = express.Router();

/*
/api/account/auth
*/
router.post("/login", authValidationRules(), validate, login);

export default router;
