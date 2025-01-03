import { Request, Response } from "express";
import { authRepository } from "../repositories";

export class AuthController {
  static async signUp(req: Request, res: Response) {
    const data = await authRepository.signUpUser(req.body);
    return res.status(201).send(data);
  }
}
