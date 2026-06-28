import { Router } from "express";
import { deleteUser, getMe, getMyApplications, updateProfileInfo, userOverView } from "./user.controller.js";
import { checkAuth } from "../../middlewares/checkAuth.js";

export const userRoutes = Router();

userRoutes.get("/user-overview", checkAuth("USER", "ADMIN", "RECRUITER"), userOverView);

userRoutes.get("/me", checkAuth("USER", "ADMIN", "RECRUITER"), getMe);
userRoutes.get("/applications", checkAuth("USER", "ADMIN", "RECRUITER"), getMyApplications);
userRoutes.put("/profile", checkAuth("USER", "ADMIN", "RECRUITER"), updateProfileInfo);
userRoutes.delete("/", checkAuth("ADMIN"), deleteUser);


