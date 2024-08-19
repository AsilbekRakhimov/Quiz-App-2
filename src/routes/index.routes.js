import { Router } from "express";
import authRouter from "../modules/auth/user.routes.js";
import categoryRouter from "../modules/category/category.routes.js";
import subCategoryRouter from "../modules/sub_category/sub_category.routes.js";

const router = Router();

router.use("/user", authRouter);
router.use("/category", categoryRouter);
router.use("/sub-category", subCategoryRouter);

export default router

