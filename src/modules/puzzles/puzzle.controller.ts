import type { Request, Response, NextFunction } from "express";
import { getCurrentPuzzle, solvePuzzle } from "./puzzle.service.js";
import { AppError } from "../../lib/shared/errors/AppError.js";
import type { SolvePuzzleBody } from "./puzzle.types.js";

export const getPuzzleController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user!.userId;
    const puzzle = await getCurrentPuzzle(userId);
    res.status(200).json({ success: true, data: puzzle });
  } catch (error) {
    next(error);
  }
};

export const solvePuzzleController = async (
  req: Request<{}, {}, SolvePuzzleBody>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user!.userId;
    const { answer } = req.body;

    if (!answer) {
      throw new AppError(
        "No se recibio ninguna respuesta",
        400,
        "ANSWER_REQUIRED",
      );
    }

    const result = await solvePuzzle(userId, answer);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
