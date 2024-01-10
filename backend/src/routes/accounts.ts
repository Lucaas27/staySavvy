import express from "express";
import { authValidationRules, validate } from "../utils/validator";
import { auth } from "../controllers/accounts/auth";
const router = express.Router();

/*
/api/account/auth
*/
router.post("/auth", authValidationRules(), validate, auth);

export default router;
