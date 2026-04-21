import type { NextFunction, Request, Response } from "express";
import type { LoginInput, RegisterInput } from "./auth.types.js";
import { login, register } from "./authService.js";

export const registerController = async (
  req: Request<{}, {}, RegisterInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await register(req.body);
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const loginController = async (
  req: Request<{}, {}, LoginInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await login(req.body);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
