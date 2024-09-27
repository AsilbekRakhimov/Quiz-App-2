import { Router } from "express";
import { checkAuthGuard } from "../../guards/check-auth.guard.js";
import { CheckRolesGuard } from "../../guards/check-role.guard.js";
import { ValidationMiddleware } from "../../middlewares/validation.middleware.js";
import { createCommentSchema } from "./dtos/create-comment.dto.js";
import commentController from "./comment.controller.js";
import { updateCommentSchema } from "./dtos/update-comment.dto.js";

const router = Router();

// creatre comment
router.post(
  "/",
  [
    checkAuthGuard(true),
    CheckRolesGuard("admin", "super_admin"),
    ValidationMiddleware(createCommentSchema),
  ],
  commentController.createComment
);

// get all comments
router.get("/", [checkAuthGuard(false)], commentController.getComments);

// get one comment
router.get("/:id", [checkAuthGuard(false)], commentController.getComment);

// update comment
router.put(
  "/:id",
  [
    checkAuthGuard(true),
    CheckRolesGuard("admin", "super_admin"),
    ValidationMiddleware(updateCommentSchema),
  ],
  commentController.updateComment
);

// delete comment
router.delete(
  "/:id",
  [checkAuthGuard(true), CheckRolesGuard("admin", "super_admin")],
  commentController.deleteComment
);

export default router;
