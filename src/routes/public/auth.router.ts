import { Router } from "express";
import { SignupSchema } from "../../validations/authSchema/signUpSchema";
import { validateRequest } from "../../middleware/validateRequest";
import { AuthController } from "../../controller/auth.controller";

const authRouter = Router();

authRouter.post("/", SignupSchema, validateRequest, AuthController.signUp);

export default authRouter;
