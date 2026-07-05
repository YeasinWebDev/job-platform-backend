import { Router } from "express";
import { jobController } from "./job.controller.js";
import { checkAuth } from "../../middlewares/checkAuth.js";
import { Role } from "@prisma/client";

export const jobRoutes = Router();

jobRoutes.post("/create-job", checkAuth(Role.RECRUITER, Role.ADMIN), jobController.createJob);

jobRoutes.post("/apply-for-job", checkAuth(Role.USER, Role.ADMIN), jobController.applyForJob);

jobRoutes.post("/bookMarkJob/:id", checkAuth(Role.USER, Role.ADMIN), jobController.bookmarkJob);

jobRoutes.get("/recruiter-applications", checkAuth(Role.RECRUITER, Role.ADMIN), jobController.getRecruiterApplications);

jobRoutes.put("/update-application-status/:id", checkAuth(Role.RECRUITER, Role.ADMIN), jobController.updateApplicationStatus);

jobRoutes.get("/my-applications", checkAuth(Role.USER, Role.ADMIN), jobController.myApplications);

jobRoutes.get("/my-created-jobs", checkAuth(Role.RECRUITER, Role.ADMIN), jobController.myCreatedJobs);

jobRoutes.put("/update-job/:id", checkAuth(Role.RECRUITER, Role.ADMIN), jobController.updateJob);

jobRoutes.put("/update-job-status/:id", checkAuth(Role.RECRUITER, Role.ADMIN), jobController.updateJobStatus);

jobRoutes.get("/all-applications", checkAuth(Role.ADMIN), jobController.allApplications);

jobRoutes.get("/top-recruiters", checkAuth(Role.ADMIN), jobController.getTopRecruiters);

jobRoutes.get("/status-breakdown", checkAuth(Role.ADMIN), jobController.getJobStatusBreakdown);

jobRoutes.get("/all", checkAuth(Role.ADMIN), jobController.allJobs);

jobRoutes.get("/", jobController.getJobs);

jobRoutes.get("/myBookmarkJobs", checkAuth(Role.USER, Role.ADMIN), jobController.getMyBookmarkedJobs);

jobRoutes.get("/:id", jobController.getJob);

jobRoutes.delete("/removeMyBookmarkJob/:id", checkAuth(Role.USER, Role.ADMIN), jobController.removeMyBookmarkedJob);

jobRoutes.delete("/:id", checkAuth(Role.RECRUITER, Role.ADMIN), jobController.deleteJob);
