import express from "express";
import userRouter from "./user.router";

export const private_api = express.Router();

private_api.use("/users", userRouter);