import { Router } from "express";
import { checkAuthGuard } from "../../guards/check-auth.guard.js";
import { CheckRolesGuard } from "../../guards/check-role.guard.js";
import { ValidationMiddleware } from "../../middlewares/validation.middleware.js";
import quizController from "./quiz.controller.js";
import { createQuizSchema } from "./dtos/create.quiz.dto.js";
import { updateQuizSchema } from "./dtos/update.quiz.dto.js";

const router = Router();

// create quiz
router.post(
  "/",
  [
    checkAuthGuard(true),
    CheckRolesGuard("admin", "super_admin"),
    ValidationMiddleware(createQuizSchema),
  ],
  quizController.createQuiz
);

// get quiz
router.get("/", [checkAuthGuard(false)], quizController.getQuizes);

// get one quiz
router.get("/:id", [checkAuthGuard(false)], quizController.getQuiz);

// update one quiz
router.put(
  "/:id",
  [
    checkAuthGuard(true),
    CheckRolesGuard("admin", "super_admin"),
    ValidationMiddleware(updateQuizSchema),
  ],
  quizController.updateQuiz
);

// delete quiz
router.delete(
  "/:id",
  [checkAuthGuard(true), CheckRolesGuard("admin", "super_admin")],
  quizController.deleteQuiz
);

export default router;
