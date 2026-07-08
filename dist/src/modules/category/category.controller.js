import categoryService from "./category.service.js";
import sendResponse from "../../shared/sendResponse.js";
const createCategory = async (req, res, next) => {
    try {
        const result = await categoryService.createCategory(req.body.name);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Category created successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
const getCategories = async (req, res, next) => {
    try {
        const result = await categoryService.getCategories();
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Categories fetched successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
const updateCategory = async (req, res, next) => {
    try {
        const result = await categoryService.updateCategory(req.params.id, req.body.name);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Category updated successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
const deleteCategory = async (req, res, next) => {
    try {
        const result = await categoryService.deleteCategory(req.params.id);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Category deleted successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
export default { createCategory, getCategories, updateCategory, deleteCategory };
//# sourceMappingURL=category.controller.js.map