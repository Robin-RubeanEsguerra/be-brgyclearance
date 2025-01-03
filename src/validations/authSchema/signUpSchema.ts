import { body, validationResult } from "express-validator";
import { userRepository } from "../../repositories";

const schema = [
  body("fullName").not().isEmpty().withMessage("Full Name must not be empty"),

  body("email")
    .not()
    .isEmpty()
    .withMessage("Email must not be empty")
    .isEmail()
    .withMessage("Email is not valid")
    .custom(async (value) => {
      const user = await userRepository.findByEmail(value);
      if (user) {
        throw new Error("Email is already in use");
      }
      return true;
    }),

  body("password").not().isEmpty().withMessage("Password must not be empty"),

  body("confirmPassword")
    .not()
    .isEmpty()
    .withMessage("Confirm Password must not be empty")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
];

export { schema as SignupSchema };
