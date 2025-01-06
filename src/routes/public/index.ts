import express from "express";
import authRouter from "./authRouter";

export const public_api = express.Router();

public_api.use("", authRouter);
