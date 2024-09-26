import { Router } from "express";
import { checkAuthGuard } from "../../guards/check-auth.guard.js";
import { CheckRolesGuard } from "../../guards/check-role.guard.js";
import resultController from "./result.controller.js";

const router = Router();

// create result
router.post(
  "/",
  [checkAuthGuard(true), CheckRolesGuard("admin", "super_admin")],
  resultController.createResult
);

export default router
