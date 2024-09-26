import { Router } from "express";
import authRouter from "../modules/auth/user.routes.js";
import categoryRouter from "../modules/category/category.routes.js";
import subCategoryRouter from "../modules/sub_category/sub_category.routes.js";
import quizRouter from "../modules/quiz/quiz.routes.js";
import questionRouter from "../modules/questions/question.routes.js";
import resultRouter from "../modules/results/result.routes.js";

const router = Router();

router.use("/user", authRouter);
router.use("/category", categoryRouter);
router.use("/sub-category", subCategoryRouter);
router.use("/quiz", quizRouter);
router.use("/question", questionRouter);
router.use("/result", resultRouter);

export default router;
