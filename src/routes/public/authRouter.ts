import { Router } from "express";
import { SignupSchema } from "../../validations/authSchema/signUpSchema";
import { validateRequest } from "../../middleware/validateRequest";
import { AuthController } from "../../controller/authController";

const authRouter = Router();

authRouter.post(
  "/signup",
  SignupSchema,
  validateRequest,
  AuthController.signUp
);

authRouter.post("/login", AuthController.login);
authRouter.post("/logout", AuthController.logout);
export default authRouter;
