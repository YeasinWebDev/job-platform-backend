import { Router } from "express";
import { jobController } from "./job.controller.js";
import { checkAuth } from "../../middlewares/checkAuth.js";
import { Role } from "@prisma/client";

export const jobRoutes = Router()

jobRoutes.post("/create-job",checkAuth(Role.RECRUITER, Role.ADMIN), jobController.createJob);

jobRoutes.post("/apply-for-job", checkAuth(Role.USER, Role.ADMIN), jobController.applyForJob);

jobRoutes.get("/my-applications", checkAuth(Role.USER, Role.ADMIN), jobController.myApplications);

jobRoutes.get("/my-created-jobs", checkAuth(Role.RECRUITER, Role.ADMIN), jobController.myCreatedJobs);

jobRoutes.put("/update-job/:id", checkAuth(Role.RECRUITER, Role.ADMIN), jobController.updateJob);

jobRoutes.put("/update-job-status/:id", checkAuth(Role.RECRUITER, Role.ADMIN), jobController.updateJobStatus);

jobRoutes.get("/jobs", jobController.getJobs);

jobRoutes.get("/job/:id", jobController.getJob);

jobRoutes.delete("/job/:id", checkAuth(Role.RECRUITER, Role.ADMIN), jobController.deleteJob);