import { Router } from "express";
import { checkAuthGuard } from "../../guards/check-auth.guard.js";
import { CheckRolesGuard } from "../../guards/check-role.guard.js";
import { ValidationMiddleware } from "../../middlewares/validation.middleware.js";
import { createOptionSchema } from "./dtos/create.option.dto.js";
import optionController from "./option.controller.js";
import { updateOptionSchema } from "./dtos/update.option.dto.js";

const router = Router();

// create option
router.post(
  "/",
  [
    checkAuthGuard(true),
    CheckRolesGuard("admin", "super_admin"),
    ValidationMiddleware(createOptionSchema),
  ],
  optionController.createOption
);

// get all options
router.get("/", [checkAuthGuard(false)], optionController.getOptions);

// get one opton
router.get("/:id", [checkAuthGuard(false)], optionController.getOption);

// update option
router.put(
  "/:id",
  [
    checkAuthGuard(true),
    CheckRolesGuard("admin", "super_admin"),
    ValidationMiddleware(updateOptionSchema),
  ],
  optionController.updateOption
);

// delete option
router.delete(
  "/:id",
  [checkAuthGuard(true), CheckRolesGuard("admin", "super_admin")],
  optionController.deleteOption
);

export default router;
