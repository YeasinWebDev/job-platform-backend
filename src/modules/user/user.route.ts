import { Router } from "express";
import { deleteUser, getMe, updateProfileInfo } from "./user.controller.js";
import { checkAuth } from "../../middlewares/checkAuth.js";

export const userRoutes = Router();

userRoutes.get("/me", checkAuth("USER", "ADMIN", "RECRUITER"), getMe);
userRoutes.delete("/", checkAuth("ADMIN"), deleteUser);
userRoutes.put("/profile", checkAuth("USER", "ADMIN", "RECRUITER"), updateProfileInfo);
