import { Router } from "express";
import categoryController from "./category.controller.js";
import { upload } from "../../helper/multer.helper.js";
import { ValidationMiddleware } from "../../middlewares/validation.middleware.js";
import { createCategorySchema } from "./dtos/create-category.dto.js";
import { checkAuthGuard } from "../../guards/check-auth.guard.js";
import { CheckRolesGuard } from "../../guards/check-role.guard.js";

const router = Router();

// create category
router.post(
  "/",
  [
    upload.single("image"),
    checkAuthGuard(true),
    CheckRolesGuard("admin", "super_admin"),
    ValidationMiddleware(createCategorySchema),
  ],
  categoryController.createCategory
);
// create category

// get all categories
router.get("/", checkAuthGuard(false), categoryController.getCategories);
// get all categories

export default router;
