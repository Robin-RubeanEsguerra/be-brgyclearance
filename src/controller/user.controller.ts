import { NextFunction, Request, Response } from "express";
import { userRepository } from "../repositories";
import { validationResult } from "express-validator";
import { User } from "../entity/User";

export class UserController {
  static async all(req: Request, res: Response) {
    const data = await userRepository.findAll();
    return res.status(200).json(data);
  }

  static async create(req: Request, res: Response) {
    const data = await userRepository.createUser(req.body);
    return res.status(201).send(data);
  }

  static async findByEmail(req: Request, res: Response) {
    const data = await userRepository.findByEmail(req.body);
    return res.status(201).send(data);
  }

  static async updateUser(req: Request, res: Response, next: NextFunction) {
    const id = Number(req.params.id);
    const data = await userRepository.updateUser(id, req.body);
    return res.status(201).send(data);
  }

  static async deleteUser(req: Request, res: Response, next: NextFunction) {
    const id = Number(req.params.id);
    const data = await userRepository.deleteUser(id);
    return res.status(200).send(data);
  }
}
