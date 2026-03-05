import type { Request, Response, NextFunction } from "express";
import { jobService } from "./job.service.js";
import AppError from "../../helper/appError.js";
import sendResponse from "../../shared/sendResponse.js";
import type { JobContractType, JobType } from "@prisma/client";

const createJob = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) throw new AppError("User not found", 400);
  try {
    const result = await jobService.createJob(req.user.id, req.body);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Job created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const applyForJob = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) throw new AppError("User not found", 400);
  try {
    const result = await jobService.applyForJob(req.user.id, req.body.jobId);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Job applied successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};


const myApplications = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) throw new AppError("User not found", 400);
  try {
    const { limit, page, search, orderBy, contractType } = req.query;
    const result = await jobService.myApplications(req.user.id, parseInt(limit as string), parseInt(page as string), search as string, orderBy as JobType, contractType as JobContractType);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Applications fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const myCreatedJobs = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) throw new AppError("User not found", 400);
  try {
    const { limit, page, search, orderBy, contractType } = req.query;
    const result = await jobService.myCreatedJobs(req.user.id, parseInt(limit as string), parseInt(page as string), search as string, orderBy as JobType, contractType as JobContractType);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Jobs fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};


const updateJob = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) throw new AppError("User not found", 400);
  try {
    const result = await jobService.updateJob(String(req.params.id), req.body);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Job updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateJobStatus = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) throw new AppError("User not found", 400);
  try {
    const result = await jobService.updateJobStatus(String(req.params.id), req.body.status);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Job status updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};


const getJobs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { limit, page, search, orderBy, contractType } = req.query;
    const result = await jobService.getJobs(parseInt(limit as string), parseInt(page as string), search as string, orderBy as JobType, contractType as JobContractType);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Jobs fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getJob = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await jobService.getJob(String(req.params.id));
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Job fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteJob = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await jobService.deleteJob(String(req.params.id));
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Job deleted successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const jobController = {
  createJob,
  applyForJob,
  myApplications,
  myCreatedJobs,
  updateJob,
  updateJobStatus,
  getJobs,
  getJob,
  deleteJob,
};