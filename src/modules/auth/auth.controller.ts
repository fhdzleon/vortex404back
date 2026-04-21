import type { NextFunction, Request, Response } from "express";
import { login, register } from "./authService.js";
import { AppError } from "../../lib/shared/errors/AppError.js";
import { registerSchema, loginSchema } from "./auth.schema.js";

export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const parsed = registerSchema.safeParse(req.body);

    if (!parsed.success) {
      throw new AppError(
        parsed.error.issues[0]!.message,
        400,
        "VALIDATION_ERROR",
      );
    }

    const result = await register(parsed.data);
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const parsed = loginSchema.safeParse(req.body);

    if (!parsed.success) {
      throw new AppError(
        parsed.error.issues[0]!.message,
        400,
        "VALIDATION_ERROR",
      );
    }

    const result = await login(parsed.data);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
