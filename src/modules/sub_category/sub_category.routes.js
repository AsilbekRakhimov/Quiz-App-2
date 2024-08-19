import { Router } from "express";
import { checkAuthGuard } from "../../guards/check-auth.guard.js";
import { CheckRolesGuard } from "../../guards/check-role.guard.js";
import { ValidationMiddleware } from "../../middlewares/validation.middleware.js";
import { createSubCategorySchema } from "./dtos/create-sub-category.dto.js";
import sub_categoryController from "./sub_category.controller.js";

const router = Router();

// create one sub-category
router.post(
  "/",
  [
    checkAuthGuard(true),
    CheckRolesGuard("admin", "super-admin"),
    ValidationMiddleware(createSubCategorySchema),
  ],
  sub_categoryController.createSubCategory
);
// create one sub-category

// get all sub categories
router.get("/", checkAuthGuard(false), sub_categoryController.getSubCategories);
// get all sub categories

// get one sub category
router.get("/:id", checkAuthGuard(false), sub_categoryController.getSubCategory);
// get one sub category

// update sub category
router.put("/:id", [checkAuthGuard(true), CheckRolesGuard("admin", "super admin")], )
// update sub category


export default router;