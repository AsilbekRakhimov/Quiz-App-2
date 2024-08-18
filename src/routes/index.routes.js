import { Router } from "express";
import authRouter from "../modules/auth/user.routes.js";

const router = Router();

router.use("/user", authRouter);

export default router

