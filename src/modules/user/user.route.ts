import { Router } from "express";
import { allUsers, changeUserRole, changeUserStatus, deleteUser, getMe, getMyApplications, recruiterOverView, updateProfileInfo, userOverView } from "./user.controller.js";
import { checkAuth } from "../../middlewares/checkAuth.js";

export const userRoutes = Router();

userRoutes.get("/user-overview", checkAuth("USER", "ADMIN", "RECRUITER"), userOverView);
userRoutes.get("/recruiter-overview", checkAuth("USER", "ADMIN", "RECRUITER"), recruiterOverView);
userRoutes.get("/all-users", checkAuth("ADMIN"), allUsers);

userRoutes.get("/me", checkAuth("USER", "ADMIN", "RECRUITER"), getMe);
userRoutes.get("/applications", checkAuth("USER", "ADMIN", "RECRUITER"), getMyApplications);
userRoutes.put("/change-role", checkAuth("ADMIN"), changeUserRole);
userRoutes.put("/change-status", checkAuth("ADMIN"), changeUserStatus);
userRoutes.put("/profile", checkAuth("USER", "ADMIN", "RECRUITER"), updateProfileInfo);
userRoutes.delete("/", checkAuth("ADMIN"), deleteUser);
