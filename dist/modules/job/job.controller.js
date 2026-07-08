import { jobService } from "./job.service.js";
import AppError from "../../helper/appError.js";
import sendResponse from "../../shared/sendResponse.js";
import prisma from "../../config/prisma.js";
const createJob = async (req, res, next) => {
    if (!req.user)
        throw new AppError("User not found", 400);
    try {
        const result = await jobService.createJob(req.user.email, req.body);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Job created successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
const applyForJob = async (req, res, next) => {
    if (!req.user)
        throw new AppError("User not found", 400);
    const userInfo = await prisma.user.findUnique({ where: { email: req.user.email } });
    if (!userInfo)
        throw new AppError("User not found", 404);
    try {
        const result = await jobService.applyForJob(userInfo.id, req.body.jobId);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Job applied successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
const myApplications = async (req, res, next) => {
    if (!req.user)
        throw new AppError("User not found", 400);
    try {
        const { limit = "10", page = "1", search = "", orderBy, contractType } = req.query;
        const result = await jobService.myApplications(req.user.id, parseInt(limit) || 10, parseInt(page) || 1, search, orderBy, contractType);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Applications fetched successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
const myCreatedJobs = async (req, res, next) => {
    if (!req.user)
        throw new AppError("User not found", 400);
    try {
        const { limit = "10", page = "1", search = "", orderBy, contractType } = req.query;
        const result = await jobService.myCreatedJobs(req.user.email, parseInt(limit) || 10, parseInt(page) || 1, search, orderBy, contractType);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Jobs fetched successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
const updateJob = async (req, res, next) => {
    if (!req.user)
        throw new AppError("User not found", 400);
    try {
        const result = await jobService.updateJob(req.user.id, String(req.params.id), req.body);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Job updated successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
const updateJobStatus = async (req, res, next) => {
    if (!req.user)
        throw new AppError("User not found", 400);
    try {
        const result = await jobService.updateJobStatus(String(req.params.id), req.body.status);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Job status updated successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
const getJobs = async (req, res, next) => {
    try {
        const { limit = "6", page = "1", search = "", location = "", category = "", experience = "", jobType = "", contact, salaryMin = "", salaryMax = "", datePosted } = req.query;
        const result = await jobService.getJobs(parseInt(limit) || 10, parseInt(page) || 1, search, location, jobType.toUpperCase(), category, experience, contact, salaryMin, salaryMax, datePosted);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Jobs fetched successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
const getJob = async (req, res, next) => {
    try {
        console.log(req.params.id);
        const result = await jobService.getJob(String(req.params.id));
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Job fetched successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
const getJobStatusBreakdown = async (req, res, next) => {
    try {
        const result = await jobService.getJobStatusBreakdown();
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Job status breakdown fetched successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
const allApplications = async (req, res, next) => {
    try {
        const { limit = "10", page = "1" } = req.query;
        const result = await jobService.allApplications(parseInt(limit) || 10, parseInt(page) || 1);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "All applications fetched successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
const getTopRecruiters = async (req, res, next) => {
    try {
        const { limit = "5" } = req.query;
        const result = await jobService.getTopRecruiters(parseInt(limit) || 5);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Top recruiters fetched successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
const allJobs = async (req, res, next) => {
    try {
        const { limit = "10", page = "1" } = req.query;
        const result = await jobService.allJobs(parseInt(limit) || 10, parseInt(page) || 1);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "All jobs fetched successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
const deleteJob = async (req, res, next) => {
    try {
        const result = await jobService.deleteJob(String(req.params.id));
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Job deleted successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
const bookmarkJob = async (req, res, next) => {
    if (!req.user)
        throw new AppError("User not found", 400);
    try {
        const result = await jobService.bookmarkJob(req.user.email, String(req.params.id));
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Job bookmarked successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
const getMyBookmarkedJobs = async (req, res, next) => {
    if (!req.user)
        throw new AppError("User not found", 400);
    try {
        const result = await jobService.getMyBookmarkedJobs(req.user.email);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Jobs fetched successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
const removeMyBookmarkedJob = async (req, res, next) => {
    if (!req.user)
        throw new AppError("User not found", 400);
    try {
        const result = await jobService.removeMyBookmarkedJob(req.user.email, String(req.params.id));
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Job removed from bookmarks successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
const updateApplicationStatus = async (req, res, next) => {
    if (!req.user)
        throw new AppError("User not found", 400);
    try {
        const result = await jobService.updateApplicationStatus(String(req.params.id), req.body.status);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Application status updated successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
const getRecruiterApplications = async (req, res, next) => {
    if (!req.user)
        throw new AppError("User not found", 400);
    try {
        const { limit = "10", page = "1", search = "", orderBy, contractType } = req.query;
        const result = await jobService.recruiterApplications(req.user.email, parseInt(limit) || 10, parseInt(page) || 1, search, orderBy, contractType);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Applications fetched successfully",
            data: result
        });
    }
    catch (error) {
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
//# sourceMappingURL=job.controller.js.map