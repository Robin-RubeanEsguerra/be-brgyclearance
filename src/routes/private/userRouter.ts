import { Router } from "express";
import { UserController } from "../../controller/userController";
import { SignupSchema } from "../../validations/authSchema/signUpSchema";
import { validateRequest } from "../../middleware/validateRequest";

const userRouter = Router();

userRouter.get("/", UserController.all);
userRouter.post("/", SignupSchema, validateRequest, UserController.create);
userRouter.put("/:id", UserController.updateUser);
userRouter.delete("/:id", UserController.deleteUser);
export default userRouter;
