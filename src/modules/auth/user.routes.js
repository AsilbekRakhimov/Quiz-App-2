import { Router } from "express";
import userController from "./user.controller.js";
import { upload } from "../../helper/multer.helper.js";
import { ValidationMiddleware } from "../../middlewares/validation.middleware.js";
import { signUpUserSchema } from "./dtos/signUp-user.dto.js";
import { signInUserSchema } from "./dtos/signIn-user.dto.js";
import { refreshTokenSchema } from "./dtos/refresh-token.dto.js";

const router = Router();

router.post(
  "/sign-up",
  [upload.single("photo"), ValidationMiddleware(signUpUserSchema)],
  userController.signUp
);
router.post(
  "/sign-in",
  ValidationMiddleware(signInUserSchema),
  userController.signIn
);
router.post(
  "/sign-new-token",
  ValidationMiddleware(refreshTokenSchema),
  userController.signRefreshToken
);

export default router;
