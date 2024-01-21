import express from "express";
import { loginValidationRules, registerValidationRules, validate } from "../middleware/validator";
import { login } from "../controllers/auth/login";
import { logout } from "../controllers/auth/logout";
import { authorize } from "../controllers/auth/authorize";
import { validateToken } from "../middleware/validateToken";
import { register } from "../controllers/auth/register";
const router = express.Router();

/*
/api/auth
*/
router.post("/register", registerValidationRules(), validate, register);
router.post("/login", loginValidationRules(), validate, login);
router.get("/authorize", validateToken, authorize);
router.post("/logout", logout);

export default router;
