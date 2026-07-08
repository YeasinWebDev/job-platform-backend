import { Router } from "express";
import { interviewController } from "./interview.controller.js";
import { checkAuth } from "../../middlewares/checkAuth.js";
import { Role } from "@prisma/client";
const router = Router();
// Generate interview preparation for a job
router.post("/generate/:jobId", checkAuth(Role.RECRUITER, Role.ADMIN, Role.USER), interviewController.generateInterviewPrep);
// Get interview preparation for a specific job
router.get("/:jobId", checkAuth(Role.RECRUITER, Role.ADMIN, Role.USER), interviewController.getInterviewPrep);
// Get all interview preparations for the user
router.get("/", checkAuth(Role.RECRUITER, Role.ADMIN, Role.USER), interviewController.getAllInterviewPreps);
// Delete interview preparation
router.delete("/:jobId", checkAuth(Role.RECRUITER, Role.ADMIN, Role.USER), interviewController.deleteInterviewPrep);
export default router;
//# sourceMappingURL=interview.route.js.map