import type { NextFunction, Request, Response } from "express";
import { verifyToken } from "../helper/jwtToken.js";
import prisma from "../config/prisma.js";
import AppError from "../helper/appError.js";

export const checkAuth =
  (...authRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.headers.authorization;
    try {
      const decoded = verifyToken(accessToken!);

      const isUserExist = await prisma.user.findUnique({
        where: {
          email: decoded.email,
        },
      });

      if (!isUserExist) {
        throw new AppError("User not found!", 400);
      }

      if(!authRoles.includes(isUserExist.role)) {
        throw new AppError("You are not authorized to access this route", 403);
      }

      req.user = decoded;

    } catch (error) {
      next(error);
    }
  };
