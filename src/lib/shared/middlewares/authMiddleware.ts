import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/AppError.js";

const JWT_SECRET = process.env.JWT_SECRET!;

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AppError("Token requerido", 401, "TOKEN_REQUIRED");
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    throw new AppError("Token requerido", 401, "TOKEN_REQUIRED");
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as unknown as {
      userId: string;
      email: string;
    };
    req.user = payload;
    next();
  } catch {
    throw new AppError("Token inválido", 401, "INVALID_TOKEN");
  }
};
