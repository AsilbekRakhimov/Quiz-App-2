import { Router } from "express";
import { checkAuthGuard } from "../../guards/check-auth.guard.js";
import { CheckRolesGuard } from "../../guards/check-role.guard.js";
import resultController from "./result.controller.js";
import { ValidationMiddleware } from "../../middlewares/validation.middleware.js";
import { createResultSchema } from "./dtos/create.result.dto.js";
import { updateResultSchema } from "./dtos/update.result.dto.js";

const router = Router();

// create result
router.post(
  "/",
  [
    checkAuthGuard(true),
    CheckRolesGuard("admin", "super_admin"),
    ValidationMiddleware(createResultSchema),
  ],
  resultController.createResult
);

// get all results
router.get("/", [checkAuthGuard(false)], resultController.getResults);

// get one result
router.get("/:id", [checkAuthGuard(false)], resultController.getResult);

// update result
router.put(
  "/:id",
  [
    checkAuthGuard(true),
    CheckRolesGuard("admin", "super_admin"),
    ValidationMiddleware(updateResultSchema),
  ],
  resultController.updateResult
);

// delete result
router.delete(
  "/:id",
  [checkAuthGuard(true), CheckRolesGuard("admin", "super_admin")],
  resultController.deleteResult
);

export default router;
