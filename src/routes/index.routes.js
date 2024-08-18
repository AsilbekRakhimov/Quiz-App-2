import { Router } from "express";
import authRouter from "../modules/auth/user.routes.js";
import categoryRouter from "../modules/category/category.routes.js";

const router = Router();

router.use("/user", authRouter);
router.use("/category", categoryRouter);

export default router

