import { Router } from "express";
import { upload } from "../../helper/multer.helper.js";
import { checkAuthGuard } from "../../guards/check-auth.guard.js";
import { CheckRolesGuard } from "../../guards/check-role.guard.js";
import questionController from "./question.controller.js";

const router = Router();

// create question
router.post(
  "/",
  [
    upload.single("image"),
    checkAuthGuard(true),
    CheckRolesGuard("admin", "super_admin"),
  ],
  questionController.createQuiz
);

// get all questions
router.get("/", [checkAuthGuard(false)], questionController.getQuestions);

// get one question
router.get("/:id", [checkAuthGuard(false)], questionController.getQuestion);

// update one question
router.put(
  "/:id",
  [
    upload.single("image"),
    checkAuthGuard(true),
    CheckRolesGuard("admin", "super_admin"),
  ],
  questionController.updateQuestion
);

// delete one question
router.delete(
  "/:id",
  [checkAuthGuard(true), CheckRolesGuard("admin", "super_admin")],
  questionController.deleteQuestion
);

export default router;
