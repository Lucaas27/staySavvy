import express from "express";
import { registerValidationRules, validate } from "../utils/validator";
import { register } from "../controllers/users/register";
const router = express.Router();

/*
/api/users/register
*/
router.post("/register", registerValidationRules(), validate, register);

export default router;
