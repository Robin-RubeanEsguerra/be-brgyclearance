import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { AuthService } from "../service/auth.service";
import { UserService } from "../service/user.service";

export const userRepository = new UserService(
  AppDataSource.getRepository(User)
);

export const authRepository = new AuthService(
  AppDataSource.getRepository(User)
);
