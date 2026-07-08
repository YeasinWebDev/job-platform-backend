import { userService } from "./user.service.js";
import sendResponse from "../../shared/sendResponse.js";
export const getMe = async (req, res, next) => {
    try {
        const result = await userService.getMe(req.user.email);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "User fetched successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
export const getMyApplications = async (req, res, next) => {
    try {
        const result = await userService.getMyApplications(req.user.email, Number(req.query.limit), Number(req.query.page), req.query.search, req.query.status);
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
export const deleteUser = async (req, res, next) => {
    try {
        const result = await userService.deleteUser(req.user.id);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "User deleted successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
export const updateProfileInfo = async (req, res, next) => {
    try {
        const result = await userService.updateProfileInfo(req.user.email, req.body);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Profile updated successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
export const userOverView = async (req, res, next) => {
    try {
        const result = await userService.userOverView(req.user.email);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "User overview fetched successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
export const recruiterOverView = async (req, res, next) => {
    try {
        const result = await userService.recruiterOverView(req.user.email);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Recruiter overview fetched successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
export const allUsers = async (req, res, next) => {
    try {
        const result = await userService.allUsers(Number(req.query.limit), Number(req.query.page));
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Users fetched successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
export const changeUserRole = async (req, res, next) => {
    try {
        const result = await userService.changeUserRole(req.body.email, req.body.role);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "User role changed successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
export const changeUserStatus = async (req, res, next) => {
    try {
        const result = await userService.changeUserStatus(req.body.email, req.body.status);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "User status changed successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=user.controller.js.map