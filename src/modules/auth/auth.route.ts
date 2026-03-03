import { Router } from "express";
import { authController } from "./auth.controller.js";
import { checkAuth } from "../../middlewares/checkAuth.js";
import { Role } from "@prisma/client";

export const authRoutes = Router();

authRoutes.post("/register", authController.registerUser);
authRoutes.post("/login", authController.loginUser);
authRoutes.post("/send-verification-email", checkAuth(Role.USER, Role.ADMIN), authController.sendVerificationEmail);
authRoutes.post("/verify-email", checkAuth(Role.USER, Role.ADMIN), authController.verifyEmail);
