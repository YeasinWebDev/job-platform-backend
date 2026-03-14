import type { NextFunction, Request, Response } from "express";
import categoryService from "./category.service.js";
import sendResponse from "../../shared/sendResponse.js";

const createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await categoryService.createCategory(req.body.name);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Category created successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const getCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await categoryService.getCategories();
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Categories fetched successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await categoryService.updateCategory(req.params.id as string, req.body.name);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Category updated successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await categoryService.deleteCategory(req.params.id as string);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Category deleted successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

export default { createCategory, getCategories, updateCategory, deleteCategory };