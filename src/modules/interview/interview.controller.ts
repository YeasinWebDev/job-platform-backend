import type { Request, Response, NextFunction } from "express";
import { interviewService } from "./interview.service.js";
import AppError from "../../helper/appError.js";
import sendResponse from "../../shared/sendResponse.js";
import prisma from "../../config/prisma.js";

const generateInterviewPrep = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) throw new AppError("User not found", 400);
  try {
    const jobId = req.params.jobId as string;
    const user= await prisma.user.findUnique({
      where: {
        email:req.user.email
      },
    });
    if(!user){
      throw new AppError("User not found", 400);
    }
    const result = await interviewService.generateInterviewPreparation({
      jobId,
      userId: user.id,
    });
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Interview preparation generated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getInterviewPrep = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) throw new AppError("User not found", 400);
  try {
    const jobId = req.params.jobId as string;
     const user= await prisma.user.findUnique({
      where: {
        email:req.user.email
      },
    });
    if(!user){
      throw new AppError("User not found", 400);
    }
    const result = await interviewService.getInterviewPreparation(jobId, user.id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Interview preparation fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllInterviewPreps = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) throw new AppError("User not found", 400);
  try {
     const user= await prisma.user.findUnique({
      where: {
        email:req.user.email
      },
    });
    if(!user){
      throw new AppError("User not found", 400);
    }
    const result = await interviewService.getUserInterviewPreparations(user.id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Interview preparations fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteInterviewPrep = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) throw new AppError("User not found", 400);
  try {
    const jobId = req.params.jobId as string;
     const user= await prisma.user.findUnique({
      where: {
        email:req.user.email
      },
    });
    if(!user){
      throw new AppError("User not found", 400);
    }
    const result = await interviewService.deleteInterviewPreparation(jobId, user.id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Interview preparation deleted successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const interviewController = {
  generateInterviewPrep,
  getInterviewPrep,
  getAllInterviewPreps,
  deleteInterviewPrep,
};