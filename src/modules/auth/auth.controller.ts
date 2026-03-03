import type { NextFunction, Request, Response } from "express";
import { authService } from "./auth.service.js";
import sendResponse from "../../shared/sendResponse.js";
import type { JwtPayload } from "jsonwebtoken";
import AppError from "../../helper/appError.js";

const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await authService.registerUser(req, res);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User registered successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await authService.loginUser(req, res);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User logged in successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const sendVerificationEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) throw new AppError("User not found", 400);

    const result = await authService.sendVerificationEmail(req.user.email as string);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Verification email sent successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, code } = req.body;
    const result = await authService.verifyEmail(email, code);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Email verified successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const authController = {
  registerUser,
  loginUser,
  sendVerificationEmail,
  verifyEmail,
};
