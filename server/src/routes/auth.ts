import { Router } from "express";
import { UserLogin } from "../controllers/authController";

const router = Router();

router.post("/login", UserLogin)

export default router;