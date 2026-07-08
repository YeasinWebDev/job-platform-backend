import { verifyToken } from "../helper/jwtToken.js";
import prisma from "../config/prisma.js";
import AppError from "../helper/appError.js";
export const checkAuth = (...authRoles) => async (req, res, next) => {
    const accessToken = req.headers.authorization?.split(" ")[1] || req.headers.cookie;
    try {
        const decoded = verifyToken(accessToken);
        const isUserExist = await prisma.user.findUnique({
            where: {
                email: decoded.email,
            },
        });
        if (!isUserExist) {
            throw new AppError("User not found!", 400);
        }
        if (!authRoles.includes(isUserExist.role)) {
            throw new AppError("You are not authorized to access this route", 403);
        }
        req.user = decoded;
        next();
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=checkAuth.js.map