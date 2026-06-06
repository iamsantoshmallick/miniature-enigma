// routes/auth.routes.ts
import { Router } from "express";
import { signUp } from "../controllers/auth.controller";

const router = Router();

// POST /api/auth/signup - User registration
router.post("/signup", signUp);

// POST /api/auth/login - User login
// router.post("/login", login);

export default router;