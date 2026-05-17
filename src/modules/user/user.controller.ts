import type { NextFunction, Request, Response } from "express";
import { userService } from "./user.service.js";
import sendResponse from "../../shared/sendResponse.js";

export const getMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userService.getMe(req.user!.email);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User fetched successfully",
      data: result,
    }); 
  } catch (error) {
    next(error);
  }
};
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userService.deleteUser(req.user!.id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User deleted successfully",
      data: result,
    });
  } catch (error) {
    next(error); 
  }
};
export const updateProfileInfo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userService.updateProfileInfo(req.user!.email, req.body);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Profile updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
