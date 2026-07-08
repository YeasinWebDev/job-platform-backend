import { Router } from "express";
import categoryController from "./category.controller.js";
export const categoryRoutes = Router();
categoryRoutes.post("/create", categoryController.createCategory);
categoryRoutes.get("/", categoryController.getCategories);
categoryRoutes.put("/:id", categoryController.updateCategory);
categoryRoutes.delete("/:id", categoryController.deleteCategory);
//# sourceMappingURL=category.route.js.map