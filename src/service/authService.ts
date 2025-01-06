import { Repository } from "typeorm";
import { User } from "../entity/User";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import "dotenv/config";
export class AuthService {
  constructor(private readonly authRepository: Repository<User>) {}

  async signUpUser(newuser: User) {
    const hashPassword = await bcrypt.hash(newuser.password, 10);
    const user = this.authRepository.create(newuser);
    user.password = hashPassword;

    const accessToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "15m",
      }
    );

    const refreshToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      {
        expiresIn: 24 * 60 * 60 * 1000,
      }
    );

    await this.authRepository.save(user);
    const { password, ...newUser } = user;
    return {
      refreshToken,
      accessToken,
      statusCode: 201,
      success: true,
      newUser,
    };
  }

  async login(credentials: Partial<User>) {
    const { email, password } = credentials;
    const user = await this.authRepository.findOne({ where: { email } });

    if (!user) {
      return {
        error: "No Record Found",
        statusCode: 400,
        success: false,
      };
    }

    if (password) {
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return {
          error: "Password is Incorrect",
          statusCode: 400,
          success: false,
        };
      }
    }

    const accessToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "15m",
      }
    );

    const refreshToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      {
        expiresIn: 24 * 60 * 60 * 1000,
      }
    );

    user.refreshToken = refreshToken;
    await this.authRepository.save(user);
    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
      statusCode: 200,
      success: true,
    };
  }

  async logout(refreshToken: string) {
    const user = await this.authRepository.findOne({ where: { refreshToken } });

    const foundUser = user?.refreshToken === refreshToken;
    if (!foundUser) {
      return {
        error: "You are not logged in",
        statusCode: 400,
        success: false,
      };
    }

    const clearRefreshToken = { ...user, refreshToken: "" };
    await this.authRepository.save(clearRefreshToken);

    return {
      statusCode: 204,
      success: true,
    };
  }
}
