import { Router } from "express";
import authRouter from "../modules/auth/user.routes.js";
import categoryRouter from "../modules/category/category.routes.js";
import subCategoryRouter from "../modules/sub_category/sub_category.routes.js";
import quizRouter from "../modules/quiz/quiz.routes.js";
import questionRouter from "../modules/questions/question.routes.js";
import resultRouter from "../modules/results/result.routes.js";
import optionRouter from "../modules/options/option.routes.js";
import commentRouter from "../modules/comments/comment.routes.js";

const router = Router();


router.use("/user", authRouter);
router.use("/category", categoryRouter);
router.use("/sub-category", subCategoryRouter);
router.use("/quiz", quizRouter);
router.use("/question", questionRouter);
router.use("/result", resultRouter);
router.use("/option", optionRouter);
router.use("/comment", commentRouter);

export default router;
