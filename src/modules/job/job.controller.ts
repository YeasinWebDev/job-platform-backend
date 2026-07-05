import type { Request, Response, NextFunction } from "express";
import { jobService } from "./job.service.js";
import AppError from "../../helper/appError.js";
import sendResponse from "../../shared/sendResponse.js";
import type { ExperienceLevel, JobContractType, JobType } from "@prisma/client";
import prisma from "../../config/prisma.js";

const createJob = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) throw new AppError("User not found", 400);
  try {
    const result = await jobService.createJob(req.user.email, req.body);
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
  const userInfo = await prisma.user.findUnique({ where: { email: req.user.email } });
  if (!userInfo) throw new AppError("User not found", 404);

  try {
    const result = await jobService.applyForJob(userInfo.id, req.body.jobId);
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
    const { limit = "10", page = "1", search = "", orderBy, contractType } = req.query;
    const result = await jobService.myApplications(
      req.user.id,
      parseInt(limit as string) || 10,
      parseInt(page as string) || 1,
      search as string,
      orderBy as JobType,
      contractType as JobContractType,
    );
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
    const { limit = "10", page = "1", search = "", orderBy, contractType } = req.query;
    const result = await jobService.myCreatedJobs(
      req.user.email,
      parseInt(limit as string) || 10,
      parseInt(page as string) || 1,
      search as string,
      orderBy as JobType,
      contractType as JobContractType,
    );
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
    const result = await jobService.updateJob(req.user.id, String(req.params.id), req.body);
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
    const { limit = "6", page = "1", search = "", location = "", category = "", experience = "", jobType = "", contact, salaryMin = "", salaryMax = "", datePosted } = req.query;

    const result = await jobService.getJobs(
      parseInt(limit as string) || 10,
      parseInt(page as string) || 1,
      search as string,
      location as string,
      (jobType as string).toUpperCase() as JobType,
      category as string,
      experience as ExperienceLevel,
      contact as string,
      salaryMin as string,
      salaryMax as string,
      datePosted as string,
    );
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
    console.log(req.params.id)
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

const getJobStatusBreakdown = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await jobService.getJobStatusBreakdown();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Job status breakdown fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const allApplications = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { limit = "10", page = "1" } = req.query;
    const result = await jobService.allApplications(parseInt(limit as string) || 10, parseInt(page as string) || 1);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "All applications fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getTopRecruiters = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { limit = "5" } = req.query;
    const result = await jobService.getTopRecruiters(parseInt(limit as string) || 5);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Top recruiters fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const allJobs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { limit = "10", page = "1" } = req.query;
    const result = await jobService.allJobs(parseInt(limit as string) || 10, parseInt(page as string) || 1);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "All jobs fetched successfully",
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

const bookmarkJob = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) throw new AppError("User not found", 400);
  try {
    const result = await jobService.bookmarkJob(req.user.email, String(req.params.id));
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Job bookmarked successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getMyBookmarkedJobs = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) throw new AppError("User not found", 400);
  try {
    const result = await jobService.getMyBookmarkedJobs(req.user.email);
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

const removeMyBookmarkedJob = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) throw new AppError("User not found", 400);
  try {
    const result = await jobService.removeMyBookmarkedJob(req.user.email, String(req.params.id));
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Job removed from bookmarks successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateApplicationStatus = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) throw new AppError("User not found", 400);
  try {
    const result = await jobService.updateApplicationStatus(String(req.params.id), req.body.status);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Application status updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getRecruiterApplications = async (req:Request, res:Response, next:NextFunction) => {
  if(!req.user) throw new AppError("User not found",400)
  try {
    const { limit = "10", page = "1", search = "", orderBy, contractType } = req.query;
    const result = await jobService.recruiterApplications(
      req.user.email,
      parseInt(limit as string) || 10,
      parseInt(page as string) || 1,
      search as string,
      orderBy as string,
      contractType as JobContractType,
    )
    sendResponse(res,{
      statusCode:200,
      success:true,
      message:"Applications fetched successfully",
      data:result
    })
  } catch (error) {
    next(error)
  }
}

export const jobController = {
  createJob,
  applyForJob,
  myApplications,
  myCreatedJobs,
  updateJob,
  updateJobStatus,
  getJobs,
  getJob,
  allJobs,
  allApplications,
  getJobStatusBreakdown,
  getTopRecruiters,
  deleteJob,
  bookmarkJob,
  getMyBookmarkedJobs,
  removeMyBookmarkedJob,
  getRecruiterApplications,
  updateApplicationStatus,
};
