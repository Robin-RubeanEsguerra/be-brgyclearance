import { Request, Response } from "express";
import { authRepository } from "../repositories";
import { access } from "fs";
import { cookie } from "express-validator";

export class AuthController {
  static async signUp(req: Request, res: Response) {
    const data = await authRepository.signUpUser(req.body);

    if (!data.success) {
      return res.status(500).json({ error: "Something went wrong" });
    }

    res.cookie("jwt", data.refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(data.statusCode).json({
      refreshToken: data.refreshToken,
      access: data.accessToken,
      message: "User successfully created!",
    });
  }

  static async login(req: Request, res: Response) {
    const data = await authRepository.login(req.body);

    if (!data.success) {
      return res.status(data.statusCode).json({ error: data.error });
    }

    res.cookie("jwt", data.refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(data.statusCode).json({
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    });
  }

  static async logout(req: Request, res: Response) {
    const cookies = req.cookies;

    if (!cookies?.jwt) {
      return res.sendStatus(204);
    }

    const refreshToken = cookies.jwt;
    const result = await authRepository.logout(refreshToken);

    if (!result.success) {
      return res.status(result.statusCode).json({ error: result.error });
    }

    res.clearCookie("jwt", { httpOnly: true });
    return res.status(204);
  }
}
