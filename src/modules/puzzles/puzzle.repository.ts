import { prisma } from "../../lib/prisma.js";
import { AppError } from "../../lib/shared/errors/AppError.js";

export const getPuzzleByUser = async (userId: string) => {
  const progress = await prisma.progress.findUnique({ where: { userId } });
  const level = progress?.currentLevel ?? 1;

  const puzzle = await prisma.puzzle.findFirst({
    where: { level },
  });

  if (!puzzle) {
    throw new AppError("Nivel no encontrado", 404, "PUZZLE_NOT_FOUND");
  }
  return { progress, puzzle, level };
};

export const updateProgress = async (userId: string, level: number) => {
  const progress = await prisma.progress
    .update({
      where: { userId },
      data: { currentLevel: level },
    })
    .catch(() => {
      throw new AppError(
        "Error al actualizar el progreso ",
        500,
        "PROGRESS_UPDATE_FAILED",
      );
    });
  return progress;
};
